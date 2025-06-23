import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [weather, setWeather] = useState(null);
  const [searchInput, setSearchInput] = useState('');        // Text in the search box
  const [suggestions, setSuggestions] = useState([]);        // Filtered city list
  const [city, setCity] = useState('Colombo');               // Selected city

  const cities = ['Colombo','Gampaha',
    'Kalutara',
    'Kandy',
    'Nuwara Eliya',
    'Galle',
    'Hambantota',
    'Jaffna',
    'Kilinochchi',
    'Vavuniya',
    'Batticaloa',
    'Trincomalee',
    'Kurunegala',
    'Puttalam',
    'Anuradhapura',
    'Polonnaruwa',
    'Badulla',
    'Monaragala',
    'Ratnapura',
    'Kegalle'
  ];

  useEffect(() => {
    fetch(`http://localhost:8000/api/weather?city=${city}`)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Failed to load weather data", error));
  }, [city]); // ✅ Re-run whenever `city` changes

    // 🔵 Handle input change (filter cities)
    const handleInputChange = (e) => {
      const value = e.target.value;
      setSearchInput(value);
      const filtered = cities.filter(c =>
        c.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    };
  
    // 🟢 When user clicks a suggestion
    const handleSearch = (selectedCity) => {
      setCity(selectedCity);
      setSearchInput('');
      setSuggestions([]);
    };
  

    return (
      <div className="App">
        <h1>Weather Report</h1>
  
        {/* 🔍 Search Input */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search a city..."
            value={searchInput}
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((c, i) => (
                <li key={i} onClick={() => handleSearch(c)}>
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
  
        {/* ✅ Weather Display */}
        {weather ? (
          <WeatherCard weather={weather} />
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    );
  
}

export default App;