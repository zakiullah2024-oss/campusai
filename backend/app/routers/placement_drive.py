import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.placement_company import PlacementCompany
from app.models.placement_drive import PlacementDrive
from app.schemas.placement_company import PlacementCompanyCreate, PlacementCompanyOut
from app.schemas.placement_drive import PlacementDriveCreate, PlacementDriveOut

router = APIRouter(prefix="/placements", tags=["Placement Drives"])

# TEMPORARY: hardcoded until real JWT auth is wired in (Phase 30)
FAKE_COLLEGE_ID = uuid.UUID("22222222-2222-2222-2222-222222222222")
FAKE_OFFICER_ID = uuid.UUID("33333333-3333-3333-3333-333333333333")


# --- Companies ---

@router.post("/companies", response_model=PlacementCompanyOut)
def create_company(payload: PlacementCompanyCreate, db: Session = Depends(get_db)):
    company = PlacementCompany(college_id=FAKE_COLLEGE_ID, **payload.model_dump())
    db.add(company)
    db.commit()
    db.refresh(company)
    return company


@router.get("/companies", response_model=list[PlacementCompanyOut])
def list_companies(db: Session = Depends(get_db)):
    return db.query(PlacementCompany).filter(
        PlacementCompany.college_id == FAKE_COLLEGE_ID
    ).all()


# --- Drives ---

@router.post("/drives", response_model=PlacementDriveOut)
def create_drive(payload: PlacementDriveCreate, db: Session = Depends(get_db)):
    company = db.query(PlacementCompany).filter(
        PlacementCompany.id == payload.company_id,
        PlacementCompany.college_id == FAKE_COLLEGE_ID,
    ).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    drive = PlacementDrive(
        college_id=FAKE_COLLEGE_ID,
        created_by=FAKE_OFFICER_ID,
        **payload.model_dump(),
    )
    db.add(drive)
    db.commit()
    db.refresh(drive)
    return drive


@router.get("/drives", response_model=list[PlacementDriveOut])
def list_drives(db: Session = Depends(get_db)):
    return db.query(PlacementDrive).filter(
        PlacementDrive.college_id == FAKE_COLLEGE_ID
    ).all()


@router.get("/drives/{drive_id}", response_model=PlacementDriveOut)
def get_drive(drive_id: uuid.UUID, db: Session = Depends(get_db)):
    drive = db.query(PlacementDrive).filter(
        PlacementDrive.id == drive_id,
        PlacementDrive.college_id == FAKE_COLLEGE_ID,
    ).first()
    if not drive:
        raise HTTPException(status_code=404, detail="Drive not found")
    return drive