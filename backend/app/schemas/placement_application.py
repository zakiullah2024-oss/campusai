import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class PlacementApplicationCreate(BaseModel):
    drive_id: uuid.UUID
    resume_id: uuid.UUID


class PlacementApplicationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    drive_id: uuid.UUID
    student_id: uuid.UUID
    resume_id: uuid.UUID
    college_id: uuid.UUID
    status: str
    applied_at: datetime
    updated_at: datetime


class StatusHistoryItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    status: str
    changed_by: uuid.UUID
    notes: Optional[str] = None
    changed_at: datetime


class PlacementApplicationDetail(PlacementApplicationOut):
    history: List[StatusHistoryItem]