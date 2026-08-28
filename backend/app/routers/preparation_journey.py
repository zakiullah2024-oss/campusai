from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.placement_profile import PlacementProfile
from app.models.preparation_journey import PreparationJourney, PreparationEntry
from app.schemas.preparation_journey import PreparationEntryCreate, PreparationEntryOut
from app.routers.placement_drive import FAKE_COLLEGE_ID, FAKE_STUDENT_ID

router = APIRouter(prefix="/placements/preparation", tags=["Preparation Journey"])


@router.post("", response_model=PreparationEntryOut)
def create_preparation_entry(
    payload: PreparationEntryCreate,
    db: Session = Depends(get_db),
):
    profile = db.query(PlacementProfile).filter(
        PlacementProfile.student_id == FAKE_STUDENT_ID
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Placement profile not found")

    journey = db.query(PreparationJourney).filter(
        PreparationJourney.profile_id == profile.id
    ).first()
    if not journey:
        journey = PreparationJourney(
            profile_id=profile.id,
            college_id=FAKE_COLLEGE_ID,
        )
        db.add(journey)
        db.commit()
        db.refresh(journey)

    entry = PreparationEntry(
        journey_id=journey.id,
        **payload.model_dump(),
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


@router.get("", response_model=list[PreparationEntryOut])
def list_preparation_entries(db: Session = Depends(get_db)):
    profile = db.query(PlacementProfile).filter(
        PlacementProfile.student_id == FAKE_STUDENT_ID
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Placement profile not found")

    journey = db.query(PreparationJourney).filter(
        PreparationJourney.profile_id == profile.id
    ).first()
    if not journey:
        raise HTTPException(status_code=404, detail="Preparation journey not found")

    return db.query(PreparationEntry).filter(
        PreparationEntry.journey_id == journey.id
    ).order_by(PreparationEntry.entry_date).all()
