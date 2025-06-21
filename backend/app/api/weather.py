from fastapi import APIRouter
from app.services.weather_api import get_current_weather

router = APIRouter()

@router.get("/weather")
async def get_weather():
    """
    Fetch weather data and return a customized response.
    """
    weather_data = await get_current_weather()
    return weather_data

