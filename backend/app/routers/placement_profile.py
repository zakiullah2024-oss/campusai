import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.placement_profile import PlacementProfile
from app.schemas.placement_profile import PlacementProfileCreate, PlacementProfileOut

router = APIRouter(prefix="/placements/profile", tags=["Placement Profile"])

# TEMPORARY: hardcoded until real JWT auth is wired in (Phase 30)
FAKE_STUDENT_ID = uuid.UUID("11111111-1111-1111-1111-111111111111")
FAKE_COLLEGE_ID = uuid.UUID("22222222-2222-2222-2222-222222222222")


@router.post("", response_model=PlacementProfileOut)
def create_profile(payload: PlacementProfileCreate, db: Session = Depends(get_db)):
    existing = db.query(PlacementProfile).filter(
        PlacementProfile.student_id == FAKE_STUDENT_ID
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Profile already exists for this student")

    profile = PlacementProfile(
        student_id=FAKE_STUDENT_ID,
        college_id=FAKE_COLLEGE_ID,
        **payload.model_dump(),
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile


@router.get("", response_model=PlacementProfileOut)
def get_my_profile(db: Session = Depends(get_db)):
    profile = db.query(PlacementProfile).filter(
        PlacementProfile.student_id == FAKE_STUDENT_ID
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.put("", response_model=PlacementProfileOut)
def update_my_profile(payload: PlacementProfileCreate, db: Session = Depends(get_db)):
    profile = db.query(PlacementProfile).filter(
        PlacementProfile.student_id == FAKE_STUDENT_ID
    ).first()
    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found. Please create your profile before updating.",
        )

    for key, value in payload.model_dump().items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)
    return profile