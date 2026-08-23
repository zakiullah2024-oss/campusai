import uuid
from sqlalchemy import (
    Column, String, Text, Date, DateTime, Numeric, Boolean, ForeignKey
)
from sqlalchemy.dialects.postgresql import UUID, ARRAY, INTEGER
from sqlalchemy.sql import func

from app.database import Base


class PlacementDrive(Base):
    __tablename__ = "placement_drives"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    college_id = Column(UUID(as_uuid=True), nullable=False)
    company_id = Column(UUID(as_uuid=True), ForeignKey("placement_companies.id"), nullable=False)

    # Job details
    role = Column(String, nullable=False)
    job_description = Column(Text, nullable=False)
    responsibilities = Column(Text, nullable=True)
    required_skills = Column(ARRAY(String), nullable=True)
    preferred_skills = Column(ARRAY(String), nullable=True)
    salary = Column(String, nullable=True)
    location = Column(String, nullable=True)
    job_type = Column(String, nullable=True)

    # Eligibility
    eligible_departments = Column(ARRAY(String), nullable=True)
    eligible_graduation_years = Column(ARRAY(INTEGER), nullable=True)
    min_cgpa = Column(Numeric(4, 2), nullable=True)
    allow_active_backlogs = Column(Boolean, nullable=False, default=False)

    # Selection process
    selection_process = Column(Text, nullable=True)

    # Timeline
    announcement_date = Column(Date, nullable=True)
    application_start_date = Column(Date, nullable=True)
    application_deadline = Column(Date, nullable=True)
    drive_date = Column(Date, nullable=True)

    # Status
    status = Column(String, nullable=False, default="upcoming")

    created_by = Column(UUID(as_uuid=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())