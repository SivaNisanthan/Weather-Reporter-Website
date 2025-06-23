// src/components/Header.jsx
import React from 'react';
import './Header.css';

function Header({ searchInput, suggestions, handleInputChange, handleSearch }) {
  return (
    <div className="header-container">
      <h1>Weather Report</h1>

      {/*Search Input */}
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
    </div>
  );
}

export default Header;
