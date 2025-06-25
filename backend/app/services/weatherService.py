import os
import httpx
import logging
from typing import Dict

logger = logging.getLogger(__name__)

# Read API configuration from environment
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API_URL = os.getenv("WEATHER_API_URL")

async def get_current_weather(city: str) -> Dict:
    if not WEATHER_API_KEY:
        logger.critical("WEATHER_API_KEY is missing in environment")
        raise ValueError("Missing WEATHER_API_KEY in environment")

    params = {
        "key": WEATHER_API_KEY,
        "q": city,
        "aqi": "no"
    }

    try:
        logger.debug(f"Sending request to weather API for city: {city}")
        async with httpx.AsyncClient() as client:
            response = await client.get(WEATHER_API_URL, params=params)
            response.raise_for_status()
            data = response.json()

            current = data.get("current", {})
            logger.debug(f"Weather data received for {city}")
            return {
                "date_current": data.get("location", {}).get("localtime"),
                "date_last_updated": current.get("last_updated"),
                "city": data['location'].get("name"),
                "country": data['location'].get("country"),
                "temperature_c": current.get("temp_c"),
                "humidity": current.get("humidity"),
                "wind_speed_kph": current.get("wind_kph"),
                "wind_direction": current.get("wind_dir"),
                "uv_index": current.get("uv"),
                "condition": current.get("condition", {}).get("text"),
                "icon": current.get("condition", {}).get("icon")
            }

    except httpx.HTTPError as e:
        logger.error(f"HTTP error fetching weather for {city}: {str(e)}")
        return {
            "error": "Failed to fetch weather data",
            "details": str(e)
        }

    except Exception as e:
        logger.error(f"Unexpected error in weatherService: {str(e)}")
        return {
            "error": "Unexpected failure",
            "details": str(e)
        }
