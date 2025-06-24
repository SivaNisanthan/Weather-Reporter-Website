import './WeatherCard.css';
import Temperature from './Temperature';
import Humidity from './Humidity';
import Wind from './Wind';
import UVIndex from './UVIndex';

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>{weather.city}, {weather.country}</h2>
      <p>Condition: {weather.condition}</p>
      <img src={weather.icon} alt={weather.condition} />

      {/* Group metrics in a flex container */}
      <div className="metrics-container">
        <Temperature value={weather.temperature_c} />
        <Wind speed={weather.wind_speed_kph} direction={weather.wind_direction} />
        <Humidity value={weather.humidity} />
        <UVIndex value={weather.uv_index} />
      </div>
    </div>
  );
}

export default WeatherCard;


