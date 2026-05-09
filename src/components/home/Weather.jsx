import { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Weather.css";
function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);      // loading state
  const [error, setError] = useState(null);          // error state

    const API_KEY = "a2df51abe7cb2579d99971a4cf2d4462";

  useEffect(() => {
   axios
  .get(
    `https://api.openweathermap.org/data/2.5/weather?q=Amman&units=metric&appid=${API_KEY}`
  )
      .then((response) => {
        setWeather(response.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch Weather data.");
        setLoading(false);
      });
  }, []);

  // 🧠 Conditional rendering logic
  if (loading) return <p>🔄 Loading Weather...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    return (
    <div className="weather-card">
      <div>
        <h2>Weather in {weather.name}</h2>
        <p>{weather.weather[0].description}</p>
      </div>

      <div className="weather-info">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather"
        />

        <h1>{Math.round(weather.main.temp)}°C</h1>
      </div>
    </div>
  );
}

export default Weather;