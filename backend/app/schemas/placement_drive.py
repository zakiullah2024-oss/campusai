import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class PlacementDriveBase(BaseModel):
    company_id: uuid.UUID
    role: str
    job_description: str
    responsibilities: Optional[str] = None
    required_skills: Optional[List[str]] = None
    preferred_skills: Optional[List[str]] = None
    salary: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None

    eligible_departments: Optional[List[str]] = None
    eligible_graduation_years: Optional[List[int]] = None
    min_cgpa: Optional[Decimal] = None
    allow_active_backlogs: bool = False

    selection_process: Optional[str] = None

    announcement_date: Optional[date] = None
    application_start_date: Optional[date] = None
    application_deadline: Optional[date] = None
    drive_date: Optional[date] = None


class PlacementDriveCreate(PlacementDriveBase):
    pass


class PlacementDriveOut(PlacementDriveBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    college_id: uuid.UUID
    status: str
    created_by: Optional[uuid.UUID] = None
    created_at: datetime
    updated_at: datetime


class EligibilityCheckItem(BaseModel):
    criterion: str
    required: str
    actual: str
    passed: bool


class EligibilityResult(BaseModel):
    eligible: bool
    checks: List[EligibilityCheckItem]