import React from 'react';
import './Humidity.css';

function Humidity({ value }) {
  // Handle cases where value might be undefined or null from API
  const humidityValue = value || 0;
  // Determine humidity level and corresponding class
  const getHumidityLevel = (humidity) => {
    if (humidity < 30) return { level: 'Low', className: 'humidity-level-low' };
    if (humidity < 60) return { level: 'Comfortable', className: 'humidity-level-comfortable' };
    if (humidity < 80) return { level: 'High', className: 'humidity-level-high' };
    return { level: 'Very High', className: 'humidity-level-very-high' };
  };

  // Generate droplets based on humidity level
  const getDropletCount = (humidity) => {
    if (humidity < 30) return 2;
    if (humidity < 60) return 3;
    if (humidity < 80) return 4;
    return 5;
  };

  const humidityInfo = getHumidityLevel(humidityValue);
  const dropletCount = getDropletCount(humidityValue);

  // Generate random heights for droplets
  const generateDropletHeights = () => {
    return Array.from({ length: dropletCount }, () => 
      Math.floor(Math.random() * 16) + 8
    );
  };

  const dropletHeights = generateDropletHeights();

  return (
    <div className="humidity-card">
      {/* Floating decoration elements */}
      <div className="humidity-float-1"></div>
      <div className="humidity-float-2"></div>

      {/* Header section */}
      <div className="humidity-header">
        <div className="humidity-title-section">
          <div className="humidity-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
          </div>
          <h3 className="humidity-title">Humidity</h3>
        </div>
        
        <span className={`humidity-level-badge ${humidityInfo.className}`}>
          {humidityInfo.level}
        </span>
      </div>

      {/* Main value section */}
      <div className="humidity-value-section">
        <p className="humidity-value">
          {humidityValue}
          <span className="humidity-percentage">%</span>
        </p>
        
        {/* Progress bar */}
        <div className="humidity-progress-container">
          <div className="humidity-progress-bar">
            <div 
              className="humidity-progress-fill"
              style={{ width: `${humidityValue}%` }}
            ></div>
          </div>
          <div className="humidity-progress-labels">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Animated droplets */}
      <div className="humidity-droplets">
        {dropletHeights.map((height, index) => (
          <div
            key={index}
            className="humidity-droplet"
            style={{ height: `${height}px` }}
          ></div>
        ))}
      </div>

      {/* Additional info */}
      <div className="humidity-info">
        <span>Comfort Range</span>
        <span className="humidity-info-value">30-60%</span>
      </div>
    </div>
  );
}

export default Humidity;