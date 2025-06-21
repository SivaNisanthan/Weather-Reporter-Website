from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.weather import router as hello_router
import os

app = FastAPI()

# 🌍 Dynamically allow origins depending on environment
ENV = os.getenv("ENV", "development")

if ENV == "development":
    origins = [
        "http://localhost:5173",  # Vite frontend dev
        "http://127.0.0.1:5173",
    ]
else:  # production
    origins = [
        "https://your-production-frontend.com"  # Replace with your frontend domain
    ]

# 🚪 Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(hello_router, prefix="/api")

