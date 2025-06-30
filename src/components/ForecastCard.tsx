import React, { useState } from "react";
import { useForecast } from "../hooks/useForecast";

export default function ForecastList() {
  const forecast = useForecast();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  if (!forecast || forecast.length === 0) return <p>Loading forecast...</p>;

  // Group by local day (yyyy-mm-dd)
  const groupedByDay = forecast.reduce((acc: Record<string, any[]>, item) => {
    const localDate = new Date(item.dt * 1000);
    const dateKey = localDate.toLocaleDateString("en-CA"); // e.g. 2025-06-25
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📅 Forecast (Next 5 Days)</h2>

      {/* Day selector buttons */}
      <div className="flex gap-2 flex-wrap mb-4">
        {Object.entries(groupedByDay).map(([date, items]) => (
          <button
            key={date}
            onClick={() => setSelectedDay(date)}
            className={`px-4 py-2 rounded shadow ${
              selectedDay === date
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {new Date(items[0].dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </button>
        ))}
      </div>

      {/* Forecast Detail Section */}
      {selectedDay && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow transition">
          <h3 className="text-lg font-bold mb-4">
            Forecast for{" "}
            {new Date(
              groupedByDay[selectedDay][0].dt * 1000
            ).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>

          <ul className="grid grid-cols-2 gap-4 text-sm">
            {groupedByDay[selectedDay].map((item) => (
              <li
                key={item.dt}
                className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex flex-col"
              >
                <span className="text-gray-600 dark:text-gray-300">
                  {new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="font-semibold text-lg">
                  {Math.round(item.main.temp)}°C
                </span>
                <span className="capitalize text-gray-500 dark:text-gray-300">
                  {item.weather[0].description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
