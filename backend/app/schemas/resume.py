import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ResumeCreate(BaseModel):
    title: str
    template: str = "ats_minimal"
    career_summary: Optional[str] = None


class ResumeOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    profile_id: uuid.UUID
    college_id: uuid.UUID
    title: str
    template: str
    is_default: bool
    career_summary: Optional[str] = None
    created_at: datetime
    updated_at: datetime