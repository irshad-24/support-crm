from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app import models
from app.routers import tickets

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Support CRM API"
)

# CORS
origins = [
    "http://localhost:5173",
    "https://support-crm-phi.vercel.app",   # <-- your Vercel URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tickets.router)


@app.get("/")
def home():
    return {
        "message": "Support CRM API is Running"
    }