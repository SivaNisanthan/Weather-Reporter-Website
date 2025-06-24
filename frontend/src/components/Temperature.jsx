// components/Temperature.jsx
import React, { useState } from 'react';
import './Temperature.css';

function Temperature({ value = 22 }) {
  const [unit, setUnit] = useState('C');

  // Convert temperature between Celsius and Fahrenheit
  const convertTemp = (temp, fromUnit) => {
    if (fromUnit === 'C') {
      return Math.round((temp * 9/5) + 32);
    } else {
      return Math.round((temp - 32) * 5/9);
    }
  };

  const displayTemp = unit === 'C' ? value : convertTemp(value, 'C');

  // Determine temperature category for visual feedback
  const getTempCategory = (temp) => {
    if (temp <= 0) return { 
      category: 'freezing', 
      color: '#3b82f6', 
      bgColor: '#dbeafe',
      icon: '❄️',
      label: 'Freezing',
      description: 'Very Cold'
    };
    if (temp <= 10) return { 
      category: 'cold', 
      color: '#06b6d4', 
      bgColor: '#cffafe',
      icon: '🥶',
      label: 'Cold',
      description: 'Bundle Up'
    };
    if (temp <= 20) return { 
      category: 'cool', 
      color: '#10b981', 
      bgColor: '#d1fae5',
      icon: '😊',
      label: 'Cool',
      description: 'Pleasant'
    };
    if (temp <= 30) return { 
      category: 'warm', 
      color: '#f59e0b', 
      bgColor: '#fef3c7',
      icon: '☀️',
      label: 'Warm',
      description: 'Comfortable'
    };
    if (temp <= 40) return { 
      category: 'hot', 
      color: '#ef4444', 
      bgColor: '#fee2e2',
      icon: '🔥',
      label: 'Hot',
      description: 'Stay Cool'
    };
    return { 
      category: 'extreme', 
      color: '#dc2626', 
      bgColor: '#fecaca',
      icon: '🌡️',
      label: 'Extreme',
      description: 'Dangerous'
    };
  };

  const tempCategory = getTempCategory(unit === 'C' ? value : convertTemp(value, 'C'));

  // Generate temperature range indicator
  const getTempPercentage = () => {
    const temp = unit === 'C' ? value : convertTemp(value, 'C');
    // Scale from -20°C to 50°C for visualization
    return Math.max(0, Math.min(100, ((temp + 20) / 70) * 100));
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  return (
    <div className="temperature-card">
      {/* Header with icon and title */}
      <div className="temp-header">
        <div className="temp-icon">{tempCategory.icon}</div>
        <div className="temp-title-section">
          <h3>Temperature</h3>
          <span className="temp-description">{tempCategory.description}</span>
        </div>
      </div>

      {/* Main temperature display */}
      <div className="temp-main">
        <div className="temp-display">
          <span 
            className="temp-value" 
            style={{ color: tempCategory.color }}
          >
            {displayTemp}
          </span>
          <div className="temp-unit-section">
            <button 
              className="unit-toggle" 
              onClick={toggleUnit}
              style={{ color: tempCategory.color }}
            >
              °{unit}
            </button>
            <span 
              className="temp-label"
              style={{ color: tempCategory.color }}
            >
              {tempCategory.label}
            </span>
          </div>
        </div>

        {/* Temperature thermometer visualization */}
        <div className="thermometer">
          <div className="thermometer-scale">
            <div className="scale-labels">
              <span className="scale-cold">Cold</span>
              <span className="scale-hot">Hot</span>
            </div>
            <div className="thermometer-tube">
              <div 
                className="thermometer-fill"
                style={{ 
                  height: `${getTempPercentage()}%`,
                  backgroundColor: tempCategory.color 
                }}
              ></div>
            </div>
            <div className="temperature-markers">
              <span className="marker-0">0°</span>
              <span className="marker-20">20°</span>
              <span className="marker-40">40°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Temperature range indicator */}
      <div className="temp-range-bar">
        <div className="range-gradient">
          <div 
            className="temp-indicator"
            style={{ 
              left: `${getTempPercentage()}%`,
              backgroundColor: tempCategory.color 
            }}
          ></div>
        </div>
        <div className="range-labels">
          <span>Freezing</span>
          <span>Cold</span>
          <span>Warm</span>
          <span>Hot</span>
        </div>
      </div>

      {/* Additional temperature info */}
      <div className="temp-info">
        <div className="feels-like">
          <span className="info-label">Feels like</span>
          <span className="info-value">{unit === 'C' ? value + 2 : displayTemp + 4}°{unit}</span>
        </div>
        <div className="temp-category-badge" style={{ backgroundColor: tempCategory.bgColor, color: tempCategory.color }}>
          {tempCategory.category.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default Temperature;
