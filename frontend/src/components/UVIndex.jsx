// components/UVIndex.jsx
import React from 'react';
import './UVIndex.css';

function UVIndex({ value = 2.7 }) {
  // Simple UV risk level calculation
  const getUVDetails = (uv) => {
    if (uv < 3) return {
      level: 'Low',
      color: '#10b981',
      bgColor: '#d1fae5'
    };
    if (uv < 6) return {
      level: 'Moderate',
      color: '#f59e0b',
      bgColor: '#fef3c7'
    };
    if (uv < 8) return {
      level: 'High',
      color: '#f97316',
      bgColor: '#fed7aa'
    };
    if (uv < 11) return {
      level: 'Very High',
      color: '#ef4444',
      bgColor: '#fee2e2'
    };
    return {
      level: 'Extreme',
      color: '#dc2626',
      bgColor: '#fecaca'
    };
  };

  const uvDetails = getUVDetails(value);

  return (
    <div className="uv-card">
      {/* Header */}
      <div className="uv-header">
        <div className="uv-icon">☀️</div>
        <div className="uv-title-section">
          <h3>UV Index</h3>
          <span className="uv-subtitle">Sun Exposure Risk</span>
        </div>
      </div>

      {/* Main content */}
      <div className="uv-content">
        <div className="uv-top-row">
          <div className="uv-value-section">
            <span className="uv-value" style={{ color: uvDetails.color }}>
              {value}
            </span>
            <span className="uv-scale">out of<br />15</span>
          </div>

          {/* Level badge next to value */}
          <div 
            className="uv-level-badge"
            style={{ 
              backgroundColor: uvDetails.bgColor,
              color: uvDetails.color
            }}
          >
            <span className="level-dot" style={{ backgroundColor: uvDetails.color }}></span>
            {uvDetails.level}
          </div>
        </div>

        {/* Meter below - bigger */}
        <div className="uv-meter-container">
          <div className="uv-meter">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className={`meter-bar ${i < Math.floor(value) ? 'active' : ''}`}
                style={{ 
                  backgroundColor: i < Math.floor(value) ? uvDetails.color : '#e5e7eb'
                }}
              ></div>
            ))}
          </div>
          <div className="meter-labels">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UVIndex;