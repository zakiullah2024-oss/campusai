import uuid
from datetime import date, datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class PreparationEntryCreate(BaseModel):
    entry_date: date
    topic: str
    description: Optional[str] = None
    resources: Optional[List[str]] = None
    problems_solved: Optional[int] = None


class PreparationEntryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    entry_date: date
    topic: str
    description: Optional[str] = None
    resources: Optional[List[str]] = None
    problems_solved: Optional[int] = None
    created_at: datetime