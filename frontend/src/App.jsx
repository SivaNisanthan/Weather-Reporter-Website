import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [weather, setWeather] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [city, setCity] = useState('Colombo');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const cities = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Nuwara Eliya',
    'Galle', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Vavuniya',
    'Batticaloa', 'Trincomalee', 'Kurunegala', 'Puttalam',
    'Anuradhapura', 'Polonnaruwa', 'Badulla', 'Monaragala',
    'Ratnapura', 'Kegalle'
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
      setError("Weather data could not be loaded. Please try again later.");
      setLoading(false);
    }, 10000); // 10 seconds timeout

    fetch(`${baseUrl}/api/weather?city=${city}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeoutId);
        if (data.error) {
          setError(data.details || "Weather API error.");
          setWeather(null);
        } else {
          setWeather(data);
          setError(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Network error. Please try again later.");
          setWeather(null);
          setLoading(false);
        }
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [city]);

  // Auto-refresh every 15 minutes (only if weather is loaded)
  useEffect(() => {
    if (!weather) return;

    const fetchWeather = () => {
      fetch(`${baseUrl}/api/weather?city=${city}`)
        .then(res => res.json())
        .then(data => setWeather(data))
        .catch(err => console.error("Auto-refresh fetch failed", err));
    };

    const lastUpdated = new Date(weather.date_last_updated);
    const currentTime = new Date(weather.date_current);
    const nextUpdate = new Date(lastUpdated.getTime() + 15 * 60 * 1000);
    const delayMs = nextUpdate - currentTime + 30 * 1000;

    if (delayMs > 0) {
      const timeoutId = setTimeout(fetchWeather, delayMs);
      return () => clearTimeout(timeoutId);
    }
  }, [weather, city]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    const filtered = cities.filter(c =>
      c.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSearch = (selectedCity) => {
    setCity(selectedCity);
    setSearchInput('');
    setSuggestions([]);
  };

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <Header
            searchInput={searchInput}
            suggestions={suggestions}
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
          />
          <WeatherCard weather={weather} />
          <Footer lastUpdated={weather.date_last_updated} />
        </>
      )}
    </div>
  );
}

export default App;
