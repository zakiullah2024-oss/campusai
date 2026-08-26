from fastapi import FastAPI
from app.routers import placement_profile
from app.routers import placement_drive
from app.routers import placement_application

app = FastAPI(
    title="CampusAI Placement Portal API",
    description="Backend API for the Placement & Career Portal module of CampusAI",
    version="0.1.0",
)

app.include_router(placement_profile.router)
app.include_router(placement_drive.router)
app.include_router(placement_application.router)

@app.get("/")
def read_root():
    return {"message": "Placement Portal API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}