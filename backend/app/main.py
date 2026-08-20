from fastapi import FastAPI

app = FastAPI(
    title="CampusAI Placement Portal API",
    description="Backend API for the Placement & Career Portal module of CampusAI",
    version="0.1.0",
)


@app.get("/")
def read_root():
    return {"message": "Placement Portal API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}