# Weather Reporter Website

A simple, responsive weather reporting web application built with React (Vite) and FastAPI. It fetches live weather data from [WeatherAPI.com](https://www.weatherapi.com) and displays key metrics like temperature, humidity, wind speed, and UV index for selected cities in Sri Lanka.

---

## Features

- City search with autocomplete functionality  
- Real-time weather data fetched from WeatherAPI.com  
- Auto-update based on `last_updated` timestamp (no unnecessary refreshes)  
- Loading spinner while fetching data  
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

## Future Improvements

- Add Redis caching to avoid hitting the API multiple times within the same 15-minute window  
- Make UI more responsive  
- Add country-based filtering or full city search

---

## Author

**Nisanthan Sivarasa**  
Final Year Undergraduate, University of Moratuwa  
Computer Science and Engineering 
