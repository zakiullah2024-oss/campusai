import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("placement_profiles.id"), nullable=False)
    college_id = Column(UUID(as_uuid=True), nullable=False)
    title = Column(String, nullable=False)
    template = Column(String, nullable=False, default="ats_minimal")
    is_default = Column(Boolean, nullable=False, default=False)
    career_summary = Column(String, nullable=True)
    file_path = Column(String, nullable=True)
    original_filename = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())