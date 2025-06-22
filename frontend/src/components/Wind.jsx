// components/Wind.jsx
import './Wind.css';

function Wind({ speed, direction }) {
  return (
    <div className="wind-card">
      <h3>🌬️ Wind</h3>
      <p className="wind-speed">Speed: {speed} km/h</p>
      <p className="wind-direction">Direction: {direction}</p>
    </div>
  );
}

export default Wind;
