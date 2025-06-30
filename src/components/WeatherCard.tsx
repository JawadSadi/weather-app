import React, { useEffect, useState } from "react";
import { useGeoLocation } from "../hooks/useGeolocation";
import { fetchForecast } from "../api/weather";
import { format, parseISO } from "date-fns";
import WeatherDetailCard from "./WeatherDetailCard";

export default function WeatherApp() {
  const { location, error } = useGeoLocation();
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");

  useEffect(() => {
    if (location) {
      fetchForecast(location.lat, location.lon)
        .then((data) => {
          const grouped: Record<string, any[]> = {};

          data.list.forEach((item: any) => {
            const date = item.dt_txt.split(" ")[0]; // YYYY-MM-DD
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push(item);
          });

          const days = Object.entries(grouped).map(([date, list]) => ({
            date,
            data: list,
          }));

          setForecastData(days);
          setSelectedDay(days[0].date);
        })
        .catch(console.error);
    }
  }, [location]);

  const selectedForecast = forecastData.find((day) => day.date === selectedDay);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 to-blue-700 text-white">
      {/* Navbar */}
      <nav className="bg-white text-blue-700 shadow-md py-4 px-6 text-lg font-bold">
        Weather App 🌤
      </nav>

      {/* لیست روزها */}
      <div className="flex overflow-x-auto px-4 py-2 gap-2 bg-blue-100 text-gray-800">
        {forecastData.map((day) => (
          <button
            key={day.date}
            onClick={() => setSelectedDay(day.date)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              selectedDay === day.date
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {format(parseISO(day.date), "EEEE")}
          </button>
        ))}
      </div>

      <div className="p-4">
        {selectedForecast && (
          <WeatherDetailCard
            dayData={selectedForecast.data}
            date={selectedForecast.date}
          />
        )}
      </div>
    </div>
  );
}
