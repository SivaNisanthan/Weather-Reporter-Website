from fastapi import APIRouter, Query
from app.services.weatherService import get_current_weather
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/weather")
async def get_weather(city: str = Query(default="Colombo")):
    logger.info(f"GET /weather?city={city} called")
    try:
        data = await get_current_weather(city)
        if "error" in data:
            logger.warning(f"Weather API returned error for city: {city} — {data['details']}")
        else:
            logger.info(f"Successfully fetched weather for {city}")
        return data
    except Exception as e:
        logger.error(f"Unexpected error in get_weather: {str(e)}")
        return {
            "error": "Internal server error",
            "details": str(e)
        }
