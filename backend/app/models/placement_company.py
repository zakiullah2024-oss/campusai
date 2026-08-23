import uuid
from sqlalchemy import Column, String, DateTime, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.database import Base


class PlacementCompany(Base):
    __tablename__ = "placement_companies"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    college_id = Column(UUID(as_uuid=True), nullable=False)

    name = Column(String, nullable=False)
    logo_url = Column(String, nullable=True)
    website = Column(String, nullable=True)
    industry = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint("name", "college_id", name="uq_company_name_college"),
    )