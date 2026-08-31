import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.resume import Resume
from app.models.placement_profile import PlacementProfile
from app.schemas.resume import ResumeCreate, ResumeOut
from app.routers.placement_drive import FAKE_COLLEGE_ID, FAKE_STUDENT_ID

router = APIRouter(prefix="/placements/resumes", tags=["Resumes"])

UPLOAD_DIR = os.path.join("uploads", "resumes")
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB


@router.post("", response_model=ResumeOut)
def create_resume(payload: ResumeCreate, db: Session = Depends(get_db)):
    profile = db.query(PlacementProfile).filter(
        PlacementProfile.student_id == FAKE_STUDENT_ID
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Placement profile not found")

    existing_count = db.query(Resume).filter(Resume.profile_id == profile.id).count()

    resume = Resume(
        profile_id=profile.id,
        college_id=FAKE_COLLEGE_ID,
        is_default=(existing_count == 0),
        **payload.model_dump(),
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)
    return resume


@router.get("", response_model=list[ResumeOut])
def list_my_resumes(db: Session = Depends(get_db)):
    profile = db.query(PlacementProfile).filter(
        PlacementProfile.student_id == FAKE_STUDENT_ID
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Placement profile not found")

    return db.query(Resume).filter(Resume.profile_id == profile.id).all()


@router.post("/{resume_id}/upload", response_model=ResumeOut)
async def upload_resume_pdf(
    resume_id: uuid.UUID,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # 1. Validate PDF format
    is_pdf = (file.content_type == "application/pdf") or (
        file.filename and file.filename.lower().endswith(".pdf")
    )
    if not is_pdf:
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # 2. Validate file size (< 5MB)
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds the 5MB limit")

    # 3. Lookup resume
    resume = db.query(Resume).filter(Resume.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    # 4. Save file to disk
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    saved_filename = f"{resume_id}.pdf"
    file_path = os.path.join(UPLOAD_DIR, saved_filename)

    with open(file_path, "wb") as f:
        f.write(content)

    # 5. Update database record
    resume.file_path = f"uploads/resumes/{saved_filename}"
    resume.original_filename = file.filename
    db.commit()
    db.refresh(resume)

    return resume


@router.get("/{resume_id}/download")
def download_resume_pdf(resume_id: uuid.UUID, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()
    if not resume or not resume.file_path:
        raise HTTPException(status_code=404, detail="Resume file not found")

    if not os.path.exists(resume.file_path):
        raise HTTPException(status_code=404, detail="Stored PDF file not found on disk")

    return FileResponse(
        path=resume.file_path,
        filename=resume.original_filename or f"{resume.title}.pdf",
        media_type="application/pdf",
    )

