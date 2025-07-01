import os
import httpx
import logging
from fastapi import HTTPException
from app.schemas.weather_schema import WeatherResponse
from app.core.redis_client import redis_client
from datetime import datetime

logger = logging.getLogger(__name__)

# Read API configuration from environment
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API_URL = os.getenv("WEATHER_API_URL")

# CACHE_TTL = 900

async def get_current_weather(city: str) -> WeatherResponse:
    """
    Fetches current weather data for the given city using weatherapi.com.
    Returns a structured WeatherResponse.
    """

    city = city.lower().strip()  # Normalize
    cache_key = f"weather:{city}"

    cached = redis_client.get(cache_key)

    if cached:
        logger.info(f"Returning cached weather data for {city}")
        return WeatherResponse.model_validate_json(cached)  #Convert JSON string to object

    if not WEATHER_API_KEY:
        logger.critical("Missing WEATHER_API_KEY in environment")
        raise HTTPException(status_code=500, detail="Weather API key not configured")

    if not WEATHER_API_URL:
        logger.critical("Missing WEATHER_API_URL in environment")
        raise HTTPException(status_code=500, detail="Weather API URL not configured")

    params = {
        "key": WEATHER_API_KEY,
        "q": city,
        "aqi": "no"
    }

    try:
        logger.info(f"Fetching weather for city: {city}")
        async with httpx.AsyncClient() as client:
            response = await client.get(WEATHER_API_URL, params=params)
            response.raise_for_status()
            data = response.json()

        current = data.get("current", {})
        location = data.get("location", {})

        # Parse timestamps from the API response
        try:
            dt_current = datetime.strptime(location.get("localtime"), "%Y-%m-%d %H:%M")
            dt_updated = datetime.strptime(current.get("last_updated"), "%Y-%m-%d %H:%M")
            age_seconds = int((dt_current - dt_updated).total_seconds())
            CACHE_TTL = max(0, 900 - age_seconds)  # Ensure it's not negative
        except Exception as e:
            logger.warning(f"Failed to parse timestamps: {e}")
            CACHE_TTL = 900  # Fallback to full cache duration

        # Return validated schema
        weather_data  = WeatherResponse(
            date_current=location.get("localtime"),
            date_last_updated=current.get("last_updated"),
            city=location.get("name"),
            country=location.get("country"),
            temperature_c=current.get("temp_c"),
            humidity=current.get("humidity"),
            wind_speed_kph=current.get("wind_kph"),
            wind_direction=current.get("wind_dir"),
            uv_index=current.get("uv"),
            condition=current.get("condition", {}).get("text"),
            icon=current.get("condition", {}).get("icon"),
        )
        redis_client.setex(cache_key, CACHE_TTL, weather_data.model_dump_json())
        return weather_data

    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP status error from Weather API: {e.response.status_code}")
        raise HTTPException(status_code=502, detail="Weather service returned an error")

    except httpx.RequestError as e:
        logger.error(f"Request error connecting to Weather API: {str(e)}")
        raise HTTPException(status_code=503, detail="Unable to connect to weather service")

    except Exception as e:
        logger.exception("Unexpected error in get_current_weather")
        raise HTTPException(status_code=500, detail="Internal server error")
