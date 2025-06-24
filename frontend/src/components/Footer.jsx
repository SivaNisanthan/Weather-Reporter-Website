// src/components/Footer.jsx
import './Footer.css';

function Footer({ lastUpdated }) {
  return (
    <footer className="footer">
      
      <p>
      Last Updated: {lastUpdated} from <a href="https://www.weatherapi.com" target="_blank" rel="noreferrer">WeatherAPI.com</a>
      </p>
    </footer>
  );
}

export default Footer;
