# Weather Reporter Website

A simple, responsive weather reporting web application built with React (Vite) and FastAPI. It fetches live weather data from [WeatherAPI.com](https://www.weatherapi.com) and displays key metrics like temperature, humidity, wind speed, and UV index for selected cities in Sri Lanka.

---

## Features

- City search with autocomplete functionality  
- Real-time weather data fetched from WeatherAPI.com  
- Smart auto-update using `last_updated` timestamp 
- Loading spinner while fetching data
- Redis caching (via Upstash) prevents repeated API calls within a 15-minute window  
- Last updated time shown to the user  
- Timeout and error handling for API failures  
- Proper backend logging (request, success, error)  
- Modular frontend with reusable React components  

---

## Project Structure

```bash
Weather-Reporter-Website/
├── backend/
│   └── app/
│       ├── main.py                 # FastAPI app setup with logging & CORS
│       ├── routers/
│       │   └── weather.py          # API endpoint /api/weather
│       ├── services/
│       │   └── weatherService.py   # Weather API fetch logic with error handling
│       └── Schemas/                   # Logs folder
│           └──weather_schema.py
├── frontend/
│   ├── public/
│   │   └── weathericon.svg         # Static assets
│   ├── src/
│   │   ├── components/             # React components (WeatherCard, Header, Loading, etc.)
│   │   ├── App.jsx
│   │   └── App.css
├── .env                            # Environment variables (both frontend & backend)
```

---

## How It Works

- On page load, the app fetches weather data for the default city (**Colombo**).  
- Users can search and select other cities from the search box.  
- Data auto-refreshes only if newer data is available (based on `last_updated` time).
- Redis is used to cache weather responses per city with a dynamic TTL based on the freshness of the `last_updated` value from the API.
- WeatherAPI.com limits updates to every 15 minutes.  
- Backend logs requests, errors, and external API issues for easy monitoring.  

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/weather-reporter-website.git
cd weather-reporter-website
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/app` with:

```ini
WEATHER_API_KEY=your_weatherapi_key
WEATHER_API_URL=http://api.weatherapi.com/v1/current.json
ENV=development
DEVELOPMENT_FRONT_END_URL=http://localhost:5173
DEVELOPMENT_FRONT_END_IP=http://127.0.0.1:5173
REDIS_URL=rediss://:your_upstash_password@your-upstash-url:port
```

Run backend:

```bash
uvicorn app.main:app --reload
```

### 3. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend` with:

```ini
VITE_API_BASE_URL=http://localhost:8000
```

Run frontend:

```bash
npm run dev
```

---
## Technologies Used

- React (Vite)
- FastAPI
- Redis (via Upstash)
- Pydantic v2
- httpx (for async API calls)

## Future Improvements

- Make UI more responsive  
- Add country-based filtering or full city search

---

## Author

**Nisanthan Sivarasa**  
Final Year Undergraduate, University of Moratuwa  
Computer Science and Engineering 
