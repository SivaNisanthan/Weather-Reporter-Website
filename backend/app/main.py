from fastapi import FastAPI
from dotenv import load_dotenv
import os

# logging 
import logging
LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)  # Ensure logs folder exists

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(f"{LOG_DIR}/app.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

from fastapi.middleware.cors import CORSMiddleware
from app.routers.weather import router as hello_router
import os

app = FastAPI()
logger.info("FastAPI application instance created")

#Dynamically allow origins depending on environment
ENV = os.getenv("ENV", "development")

if ENV == "development":
    origins = [
        os.getenv("DEVELOPMENT_FRONT_END_URL"),  # Vite frontend dev
        os.getenv("DEVELOPMENT_FRONT_END_IP"),
    ]
else:  # production
    origins = ["https://weather-reporter-website-lffj.vercel.app/"] 

logger.info(f"CORS enabled for environment: {ENV}")
logger.info(f"Allowed origins: {origins}")

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



