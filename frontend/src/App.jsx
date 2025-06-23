import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';
import Loading from './components/Loading';
import Header from './components/Header';


function App() {
  const [count, setCount] = useState(0);
  const [weather, setWeather] = useState(null);
  const [searchInput, setSearchInput] = useState('');        // Text in the search box
  const [suggestions, setSuggestions] = useState([]);        // Filtered city list
  const [city, setCity] = useState('Colombo');               // Selected city
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // console.log("ENV var" + import.meta.env.VITE_API_BASE_URL);

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
    fetch(`${baseUrl}/api/weather?city=${city}`)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Failed to load weather data", error));
  }, [city]); // Re-run whenever `city` changes

    //Handle input change (filter cities)
    const handleInputChange = (e) => {
      const value = e.target.value;
      setSearchInput(value);
      const filtered = cities.filter(c =>
        c.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    };
  
    //When user clicks a suggestion
    const handleSearch = (selectedCity) => {
      setCity(selectedCity);
      setSearchInput('');
      setSuggestions([]);
    };
  

    return (
      <div className="App">
        {weather ? (
          <>
            <Header
              searchInput={searchInput}
              suggestions={suggestions}
              handleInputChange={handleInputChange}
              handleSearch={handleSearch}
            />
            <WeatherCard weather={weather} />
          </>
        ) : (
          <Loading />
        )}
      </div>
    );
    
  
}

export default App;