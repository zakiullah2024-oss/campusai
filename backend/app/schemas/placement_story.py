import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class PlacementStoryCreate(BaseModel):
    company_name: str
    role: str
    package: Optional[str] = None
    preparation_duration: Optional[str] = None
    topics_prepared: Optional[List[str]] = None
    resources_used: Optional[List[str]] = None
    interview_experience_text: Optional[str] = None
    advice_for_juniors: Optional[str] = None
    visibility: str = "department_only"


class PlacementStoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    profile_id: uuid.UUID
    college_id: uuid.UUID
    company_name: str
    role: str
    package: Optional[str] = None
    preparation_duration: Optional[str] = None
    topics_prepared: Optional[List[str]] = None
    resources_used: Optional[List[str]] = None
    interview_experience_text: Optional[str] = None
    advice_for_juniors: Optional[str] = None
    visibility: str
    created_at: datetime