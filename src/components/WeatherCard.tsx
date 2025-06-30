import React, { useEffect, useState } from "react";
import { useGeoLocation } from "../hooks/useGeolocation";
import { fetchWeather } from "../api/weather";
import {
  FiWind,
  FiDroplet,
  FiArrowDown,
  FiArrowUp,
  FiBarChart2,
} from "react-icons/fi";

const WeatherCard = () => {
  const { location, error } = useGeoLocation();
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    if (location) {
      fetchWeather(location.lat, location.lon)
        .then(setWeather)
        .catch(console.error);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-sky-600 text-white p-4">
      {error && <p>{error}</p>}
      {!location && !error && <p>Getting location...</p>}
      {weather ? (
        <div className="bg-white text-gray-800 rounded-xl p-6 shadow-xl w-full max-w-md">
          <h1 className="text-xl font-bold">{weather.name}</h1>
          <p className="text-5xl font-semibold my-4">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="capitalize mb-4">{weather.weather[0].description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mt-4">
            <div className="flex items-center gap-2">
              <FiDroplet className="text-blue-500" />
              <span>Humidity:</span>
              <span className="ml-auto">{weather.main.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <FiWind className="text-blue-500" />
              <span>Wind:</span>
              <span className="ml-auto">
                {weather.wind.speed * (18 / 5)} km/hr
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiBarChart2 className="text-blue-500" />
              <span>Pressure:</span>
              <span className="ml-auto">{weather.main.pressure} hPa</span>
            </div>
            <div className="flex items-center gap-2">
              <FiArrowDown className="text-blue-500" />
              <span>Min:</span>
              <span className="ml-auto">
                {Math.round(weather.main.temp_min)}°C
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiArrowUp className="text-red-500" />
              <span>Max:</span>
              <span className="ml-auto">
                {Math.round(weather.main.temp_max)}°C
              </span>
            </div>
          </div>
        </div>
      ) : (
        !error && <p>Loading weather...</p>
      )}
    </div>
  );
};

export default WeatherCard;
