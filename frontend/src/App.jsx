import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/weather')
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Failed to load weather data", error));
  }, []);
  

  return (
    <>
      <h1>Weather Report</h1>
      {weather ? (
        <div className="card">
          <h2>{weather.city}, {weather.country}</h2>
          <p>🌤️ Condition: {weather.condition}</p>
          <p>🌡️ Temperature: {weather.temperature_c}°C</p>
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>🌬️ Wind Speed: {weather.wind_speed_kph} km/h</p>
          <p>☀️ UV Index: {weather.uv_index}</p>
          <img src={weather.icon} alt={weather.condition} />
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
  
}

export default App;