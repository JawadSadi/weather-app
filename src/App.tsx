import { useEffect, useState } from "react";
import { fetchWeather } from "./api/weather";
import { useGeoLocation } from "./hooks/useGeolocation";

export default function App() {
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
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      ) : (
        !error && <p>Loading weather...</p>
      )}
    </div>
  );
}
