from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.resume import Resume
from app.models.placement_profile import PlacementProfile
from app.schemas.resume import ResumeCreate, ResumeOut
from app.routers.placement_drive import FAKE_COLLEGE_ID, FAKE_STUDENT_ID

router = APIRouter(prefix="/placements/resumes", tags=["Resumes"])


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
