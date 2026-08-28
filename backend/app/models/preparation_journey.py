import uuid
from sqlalchemy import Column, String, Text, Date, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.sql import func

from app.database import Base


class PreparationJourney(Base):
    __tablename__ = "preparation_journeys"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("placement_profiles.id"), nullable=False, unique=True)
    college_id = Column(UUID(as_uuid=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class PreparationEntry(Base):
    __tablename__ = "preparation_entries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    journey_id = Column(UUID(as_uuid=True), ForeignKey("preparation_journeys.id"), nullable=False)

    entry_date = Column(Date, nullable=False)
    topic = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    resources = Column(ARRAY(String), nullable=True)
    problems_solved = Column(Integer, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())