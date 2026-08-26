import uuid
from app.models.placement_profile import PlacementProfile
from app.schemas.placement_drive import EligibilityResult, EligibilityCheckItem
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
FAKE_STUDENT_ID = uuid.UUID("11111111-1111-1111-1111-111111111111")


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


from typing import Optional

@router.get("/drives", response_model=list[PlacementDriveOut])
def list_drives(status: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(PlacementDrive).filter(
        PlacementDrive.college_id == FAKE_COLLEGE_ID
    )
    if status:
        query = query.filter(PlacementDrive.status == status)
    return query.all()

@router.get("/drives/{drive_id}", response_model=PlacementDriveOut)
def get_drive(drive_id: uuid.UUID, db: Session = Depends(get_db)):
    drive = db.query(PlacementDrive).filter(
        PlacementDrive.id == drive_id,
        PlacementDrive.college_id == FAKE_COLLEGE_ID,
    ).first()
    if not drive:
        raise HTTPException(status_code=404, detail="Drive not found")
    return drive
@router.get("/drives/{drive_id}/eligibility", response_model=EligibilityResult)
def check_eligibility(drive_id: uuid.UUID, db: Session = Depends(get_db)):
    drive = db.query(PlacementDrive).filter(
        PlacementDrive.id == drive_id,
        PlacementDrive.college_id == FAKE_COLLEGE_ID,
    ).first()
    if not drive:
        raise HTTPException(status_code=404, detail="Drive not found")

    profile = db.query(PlacementProfile).filter(
        PlacementProfile.student_id == FAKE_STUDENT_ID
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Placement profile not found")

    checks = []

    # CGPA check
    if drive.min_cgpa is not None:
        student_cgpa = profile.cgpa if profile.cgpa is not None else 0
        passed = student_cgpa >= drive.min_cgpa
        checks.append(EligibilityCheckItem(
            criterion="CGPA",
            required=f">= {drive.min_cgpa}",
            actual=str(student_cgpa),
            passed=passed,
        ))

    # Backlog check
    if not drive.allow_active_backlogs:
        student_has_backlog = bool(profile.has_active_backlog)
        passed = not student_has_backlog
        checks.append(EligibilityCheckItem(
            criterion="Active Backlogs",
            required="None",
            actual="Has backlog" if student_has_backlog else "None",
            passed=passed,
        ))

    # Department check
    if drive.eligible_departments:
        student_dept = profile.department or "Not set"
        passed = profile.department in drive.eligible_departments
        checks.append(EligibilityCheckItem(
            criterion="Department",
            required=", ".join(drive.eligible_departments),
            actual=student_dept,
            passed=passed,
        ))

    # Graduation year check
    if drive.eligible_graduation_years:
        student_year = profile.graduation_year
        passed = student_year in drive.eligible_graduation_years
        checks.append(EligibilityCheckItem(
            criterion="Graduation Year",
            required=", ".join(str(y) for y in drive.eligible_graduation_years),
            actual=str(student_year) if student_year is not None else "Not set",
            passed=passed,
        ))

    overall_eligible = all(check.passed for check in checks)

    return EligibilityResult(eligible=overall_eligible, checks=checks)