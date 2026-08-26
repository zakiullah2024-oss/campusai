from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.placement_story import PlacementStory
from app.models.placement_profile import PlacementProfile
from app.schemas.placement_story import PlacementStoryCreate, PlacementStoryOut
from app.routers.placement_drive import FAKE_COLLEGE_ID, FAKE_STUDENT_ID

router = APIRouter(prefix="/placements/stories", tags=["Placement Stories"])


@router.post("", response_model=PlacementStoryOut)
def create_story(payload: PlacementStoryCreate, db: Session = Depends(get_db)):
    profile = db.query(PlacementProfile).filter(
        PlacementProfile.student_id == FAKE_STUDENT_ID
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Placement profile not found")

    story = PlacementStory(
        profile_id=profile.id,
        college_id=FAKE_COLLEGE_ID,
        **payload.model_dump(),
    )
    db.add(story)
    db.commit()
    db.refresh(story)
    return story


@router.get("", response_model=list[PlacementStoryOut])
def list_stories(db: Session = Depends(get_db)):
    return db.query(PlacementStory).filter(
        PlacementStory.college_id == FAKE_COLLEGE_ID,
        PlacementStory.visibility.in_(["public", "department_only"]),
    ).all()