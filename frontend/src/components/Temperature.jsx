// components/Temperature.jsx
import './Temperature.css';

function Temperature({ value }) {
  return (
    <div className="temperature-card">
      <h3>Temperature</h3>
      <p className="temperature-value">{value}°C</p>
    </div>
  );
}

export default Temperature;
