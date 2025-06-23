import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner-wrapper">
        <div className="spinner-ring"></div>
        <img src="/weathericon.svg" alt="Weather Icon" className="center-icon" />
      </div>
      <p>Loading weather data...</p>
    </div>
  );
}

export default Loading;
