import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.database import Base


class PlacementApplicationStatusHistory(Base):
    __tablename__ = "placement_application_status_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_id = Column(UUID(as_uuid=True), ForeignKey("placement_applications.id"), nullable=False)
    status = Column(String, nullable=False)
    changed_by = Column(UUID(as_uuid=True), nullable=False)
    notes = Column(String, nullable=True)
    changed_at = Column(DateTime(timezone=True), server_default=func.now())