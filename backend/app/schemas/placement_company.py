import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class PlacementCompanyBase(BaseModel):
    name: str
    logo_url: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None


class PlacementCompanyCreate(PlacementCompanyBase):
    pass


class PlacementCompanyOut(PlacementCompanyBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    college_id: uuid.UUID
    created_at: datetime