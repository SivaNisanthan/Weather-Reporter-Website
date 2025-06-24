// components/Wind.jsx
import React from 'react';
import './Wind.css';

function Wind({ speed = 15, direction = "WSW" }) {
  // Convert wind direction to degrees for rotation
  const directionToDegrees = {
    N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
    E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
    S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
    W: 270, WNW: 292.5, NW: 315, NNW: 337.5,
  };

  const rotation = directionToDegrees[direction] || 0;

  // Determine wind intensity for visual feedback
  const getWindIntensity = (speed) => {
    if (speed < 10) return { level: 'calm', color: '#10b981', label: 'Light' };
    if (speed < 25) return { level: 'moderate', color: '#f59e0b', label: 'Moderate' };
    if (speed < 40) return { level: 'strong', color: '#ef4444', label: 'Strong' };
    return { level: 'severe', color: '#dc2626', label: 'Severe' };
  };

  const windIntensity = getWindIntensity(speed);

  // Get full direction name
  const getFullDirection = (dir) => {
    const directions = {
      N: 'North', NNE: 'North-Northeast', NE: 'Northeast', ENE: 'East-Northeast',
      E: 'East', ESE: 'East-Southeast', SE: 'Southeast', SSE: 'South-Southeast',
      S: 'South', SSW: 'South-Southwest', SW: 'Southwest', WSW: 'West-Southwest',
      W: 'West', WNW: 'West-Northwest', NW: 'Northwest', NNW: 'North-Northwest'
    };
    return directions[dir] || dir;
  };

  return (
    <div className="wind-card">
      {/* Header with icon */}
      <div className="wind-header">
        <div className="wind-icon">🌪️</div>
        <h3>Wind Conditions</h3>
      </div>

      {/* Main wind display */}
      <div className="wind-main">
        {/* Wind speed with large display */}
        <div className="wind-speed-display">
          <span 
            className="speed-number" 
            style={{ color: windIntensity.color }}
          >
            {speed}
          </span>
          <div className="speed-unit">
            <span>km/h</span>
            <span 
              className="intensity-label" 
              style={{ color: windIntensity.color }}
            >
              {windIntensity.label}
            </span>
          </div>
        </div>

        {/* Wind direction compass */}
        <div className="wind-compass">
          <div className="compass-ring">
            <div className="compass-directions">
              <span className="dir-n">N</span>
              <span className="dir-e">E</span>
              <span className="dir-s">S</span>
              <span className="dir-w">W</span>
            </div>
            <div 
              className="wind-arrow" 
              style={{ 
                transform: `rotate(${rotation}deg)`,
                color: windIntensity.color 
              }}
            >
              ↑
            </div>
          </div>
          <div className="direction-info">
            <span className="direction-abbr">{direction}</span>
            <span className="direction-full">{getFullDirection(direction)}</span>
          </div>
        </div>
      </div>

      {/* Wind strength indicator bar */}
      <div className="wind-strength-bar">
        <div className="strength-labels">
          <span>Calm</span>
          <span>Light</span>
          <span>Moderate</span>
          <span>Strong</span>
        </div>
        <div className="strength-indicator">
          <div 
            className="strength-fill"
            style={{ 
              width: `${Math.min((speed / 50) * 100, 100)}%`,
              backgroundColor: windIntensity.color 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Wind;