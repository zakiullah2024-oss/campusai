import uuid
from datetime import datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, ConfigDict


class PlacementProfileBase(BaseModel):
    department: Optional[str] = None
    graduation_year: Optional[int] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None

    preferred_role: Optional[str] = None
    preferred_location: Optional[str] = None
    preferred_industry: Optional[str] = None
    work_preference: Optional[str] = None

    cgpa: Optional[Decimal] = None
    has_active_backlog: Optional[bool] = None

    leetcode_url: Optional[str] = None
    codechef_url: Optional[str] = None
    hackerrank_url: Optional[str] = None


class PlacementProfileCreate(PlacementProfileBase):
    pass


class PlacementProfileOut(PlacementProfileBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    student_id: uuid.UUID
    college_id: uuid.UUID
    cgpa_verified_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime