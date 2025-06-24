from fastapi import APIRouter, Query
from app.services.weatherService import get_current_weather

router = APIRouter()

@router.get("/weather")
# async def get_weather():
#     """
#     Fetch weather data and return a customized response.
#     """
#     weather_data = await get_current_weather()
#     return weather_data

async def get_weather(city: str = Query(default="Colombo")):
    return await get_current_weather(city)