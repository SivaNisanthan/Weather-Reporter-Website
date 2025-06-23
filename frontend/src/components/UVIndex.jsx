// components/UVIndex.jsx
import './UVIndex.css';

function UVIndex({ value }) {
  const getRiskLevel = (uv) => {
    if (uv < 3) return 'Low';
    if (uv < 6) return 'Moderate';
    if (uv < 8) return 'High';
    if (uv < 11) return 'Very High';
    return 'Extreme';
  };

  return (
    <div className="uv-card">
      <h3>UV Index</h3>
      <p className="uv-value">{value}</p>
      <p className="uv-risk">Risk Level: {getRiskLevel(value)}</p>
    </div>
  );
}

export default UVIndex;
