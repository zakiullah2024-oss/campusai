import uuid
from sqlalchemy import Column, String, Numeric, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.database import Base


class PlacementProfile(Base):
    __tablename__ = "placement_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), nullable=False, unique=True)
    college_id = Column(UUID(as_uuid=True), nullable=False)

    linkedin_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    portfolio_url = Column(String, nullable=True)

    preferred_role = Column(String, nullable=True)
    preferred_location = Column(String, nullable=True)
    preferred_industry = Column(String, nullable=True)
    work_preference = Column(String, nullable=True)

    cgpa = Column(Numeric(4, 2), nullable=True)
    has_active_backlog = Column(Boolean, nullable=True)
    cgpa_verified_at = Column(DateTime(timezone=True), nullable=True)

    leetcode_url = Column(String, nullable=True)
    codechef_url = Column(String, nullable=True)
    hackerrank_url = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())