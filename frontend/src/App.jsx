import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
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
    <div className="App">
      <h1>🌦️ Weather Report</h1>

      {/* ✅ Render WeatherCard only when data is loaded */}
      {weather ? (
        <WeatherCard weather={weather} />
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
  
}

export default App;