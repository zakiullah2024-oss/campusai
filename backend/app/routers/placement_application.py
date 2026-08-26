import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.placement_application import PlacementApplication
from app.models.placement_application_status_history import PlacementApplicationStatusHistory
from app.models.placement_drive import PlacementDrive
from app.models.resume import Resume
from app.schemas.placement_application import (
    PlacementApplicationCreate,
    PlacementApplicationOut,
    PlacementApplicationDetail,
)
from app.routers.placement_drive import check_eligibility, FAKE_COLLEGE_ID, FAKE_STUDENT_ID

router = APIRouter(prefix="/placements/applications", tags=["Placement Applications"])


@router.post("", response_model=PlacementApplicationOut)
def apply_to_drive(payload: PlacementApplicationCreate, db: Session = Depends(get_db)):
    drive = db.query(PlacementDrive).filter(
        PlacementDrive.id == payload.drive_id,
        PlacementDrive.college_id == FAKE_COLLEGE_ID,
    ).first()
    if not drive:
        raise HTTPException(status_code=404, detail="Drive not found")

    resume = db.query(Resume).filter(Resume.id == payload.resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    eligibility = check_eligibility(payload.drive_id, db)
    if not eligibility.eligible:
        raise HTTPException(status_code=400, detail="Student is not eligible for this drive")

    existing = db.query(PlacementApplication).filter(
        PlacementApplication.drive_id == payload.drive_id,
        PlacementApplication.student_id == FAKE_STUDENT_ID,
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already applied to this drive")

    application = PlacementApplication(
        drive_id=payload.drive_id,
        student_id=FAKE_STUDENT_ID,
        resume_id=payload.resume_id,
        college_id=FAKE_COLLEGE_ID,
        status="applied",
    )
    db.add(application)
    db.commit()
    db.refresh(application)

    history_entry = PlacementApplicationStatusHistory(
        application_id=application.id,
        status="applied",
        changed_by=FAKE_STUDENT_ID,
        notes="Application submitted",
    )
    db.add(history_entry)
    db.commit()

    return application


@router.get("", response_model=list[PlacementApplicationOut])
def list_my_applications(db: Session = Depends(get_db)):
    return db.query(PlacementApplication).filter(
        PlacementApplication.student_id == FAKE_STUDENT_ID
    ).all()


@router.get("/{application_id}", response_model=PlacementApplicationDetail)
def get_application(application_id: uuid.UUID, db: Session = Depends(get_db)):
    application = db.query(PlacementApplication).filter(
        PlacementApplication.id == application_id,
        PlacementApplication.student_id == FAKE_STUDENT_ID,
    ).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    history = db.query(PlacementApplicationStatusHistory).filter(
        PlacementApplicationStatusHistory.application_id == application_id
    ).order_by(PlacementApplicationStatusHistory.changed_at).all()

    return PlacementApplicationDetail(
        **PlacementApplicationOut.model_validate(application).model_dump(),
        history=history,
    )