import os
import httpx
from dotenv import load_dotenv
from typing import Dict

# Load environment variables from .env
load_dotenv()

# Read the API key from environment variables
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

# Base URL of the weather API
WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json"

# City to fetch weather for
# DEFAULT_CITY = "Colombo"


async def get_current_weather(city: str) -> Dict:
    """
    Fetches current weather data for the given city from weatherapi.com
    and returns a simplified dictionary with selected fields.
    """
    if not WEATHER_API_KEY:
        raise ValueError("Missing WEATHER_API_KEY in environment")

    params = {
        "key": WEATHER_API_KEY,
        "q": city,
        "aqi": "no"
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(WEATHER_API_URL, params=params)
            response.raise_for_status()
            data = response.json()

            current = data.get("current", {})
            return {
                "date": current.get("last_updated"),
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
        return {
            "error": "Failed to fetch weather data",
            "details": str(e)
        }
