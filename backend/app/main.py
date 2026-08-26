from fastapi import FastAPI
from app.routers import placement_profile
from app.routers import placement_drive
from app.routers import placement_application
from fastapi.middleware.cors import CORSMiddleware
from app.routers import placement_story

app = FastAPI(
    title="CampusAI Placement Portal API",
    description="Backend API for the Placement & Career Portal module of CampusAI",
    version="0.1.0",
)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(placement_profile.router)
app.include_router(placement_drive.router)
app.include_router(placement_application.router)
from app.routers import resume

@app.get("/")
def read_root():
    return {"message": "Placement Portal API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
app.include_router(resume.router)
app.include_router(placement_story.router)