import uuid
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.sql import func

from app.database import Base


class PlacementStory(Base):
    __tablename__ = "placement_stories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("placement_profiles.id"), nullable=False)
    college_id = Column(UUID(as_uuid=True), nullable=False)

    company_name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    package = Column(String, nullable=True)
    preparation_duration = Column(String, nullable=True)
    topics_prepared = Column(ARRAY(String), nullable=True)
    resources_used = Column(ARRAY(String), nullable=True)
    interview_experience_text = Column(Text, nullable=True)
    advice_for_juniors = Column(Text, nullable=True)

    visibility = Column(String, nullable=False, default="department_only")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())