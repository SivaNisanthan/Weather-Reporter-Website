// components/Humidity.jsx
import './Humidity.css';

function Humidity({ value }) {
  return (
    <div className="humidity-card">
      <h3>Humidity</h3>
      <p className="humidity-value">{value}%</p>
    </div>
  );
}

export default Humidity;
