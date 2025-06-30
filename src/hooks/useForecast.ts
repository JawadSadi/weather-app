// hooks/useForecast.ts
import { useEffect, useState } from "react";

const API_KEY = "879a28f6b8099b7aec6c1dff720bd806"; //  my API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export function useForecast() {
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const res = await fetch(
          `${BASE_URL}?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        setForecast(data.list || []);
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  return forecast;
}
