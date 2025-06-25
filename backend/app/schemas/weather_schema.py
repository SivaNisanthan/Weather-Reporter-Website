from pydantic import BaseModel

class WeatherResponse(BaseModel):
    date_current: str
    date_last_updated: str
    city: str
    country: str
    temperature_c: float
    humidity: int
    wind_speed_kph: float
    wind_direction: str
    uv_index: float
    condition: str
    icon: str