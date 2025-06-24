from fastapi import FastAPI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from fastapi.middleware.cors import CORSMiddleware
from app.routers.weather import router as hello_router
import os

app = FastAPI()

#Dynamically allow origins depending on environment
ENV = os.getenv("ENV", "development")

if ENV == "development":
    origins = [
        os.getenv("DEVELOPMENT_FRONT_END_URL"),  # Vite frontend dev
        os.getenv("DEVELOPMENT_FRONT_END_IP"),
    ]
else:  # production
    origins = ["https://weather-reporter-website-lffj.vercel.app"] 

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(hello_router, prefix="/api")

