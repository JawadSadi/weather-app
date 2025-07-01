// src/components/WeatherApp.tsx
import { useEffect, useState } from "react";
import { useGeoLocation } from "../hooks/useGeolocation";
import { fetchForecast } from "../api/weather";
import { format, parseISO } from "date-fns";
import WeatherDetailCard from "./WeatherDetailCard";
import SearchBox from "./SearchBox";
import { AnimatePresence, motion } from "framer-motion";

function getSuggestionEn(weather: string): string {
  console.log(weather);
  const lower = weather.toLowerCase();

  if (lower.includes("rain")) return "Don't forget your umbrella ☔";
  if (lower.includes("snow")) return "Wear warm clothes and be careful ❄️";
  if (lower.includes("clear")) return "Use sunscreen today ☀️";
  if (lower.includes("cloud")) return "It might be chilly, dress warmly 🌥️";
  if (lower.includes("wind")) return "It's windy today, take care 💨";

  return "Have a wonderful day 🌈";
}

export default function WeatherApp() {
  const { location } = useGeoLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [cityName, setCityName] = useState<string>("Your Location");

  // load default location on mount
  useEffect(() => {
    if (location) {
      fetchForecast(location.lat, location.lon)
        .then((data) => {
          const grouped = groupForecast(data.list);
          setForecastData(grouped);
          setSelectedDay(grouped[0].date);
          setCityName(data.city.name);
        })
        .catch(console.error);
    }
  }, [location]);

  // helper for grouping
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupForecast = (list: any[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const grouped: Record<string, any[]> = {};
    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    return Object.entries(grouped).map(([date, data]) => ({ date, data }));
  };

  // when user searches for a new city
  const handleCitySelect = (lat: number, lon: number, name: string) => {
    fetchForecast(lat, lon)
      .then((data) => {
        const grouped = groupForecast(data.list);
        setForecastData(grouped);
        setSelectedDay(grouped[0].date);
        setCityName(name);
      })
      .catch(console.error);
  };

  const selectedForecast = forecastData.find((d) => d.date === selectedDay);

  if (!forecastData.length) {
    return (
      <div className="flex items-center justify-center min-h-screen text-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }
  return (
    <>
      <motion.div
        key={selectedDay + cityName}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
        className="bg-white bg-opacity-20 rounded-lg shadow-lg"
      >
        <div className="min-h-screen bg-gradient-to-br from-sky-500 to-blue-700 text-white">
          {/* Navbar */}
          <nav className="bg-white text-blue-700 shadow-md py-3 px-4 text-lg font-bold flex justify-between items-center">
            <div className="text-xl font-bold">
              Weather App 🌤
              {cityName && (
                <span className="text-gray-600 ml-3">| {cityName}</span>
              )}
            </div>
            <SearchBox onCitySelect={handleCitySelect} />
          </nav>

          {/* {days} */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 bg-blue-100 text-gray-800">
            <div className="flex flex-wrap gap-2 overflow-x">
              {forecastData.map((day) => (
                <motion.button
                  key={day.date}
                  onClick={() => setSelectedDay(day.date)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    selectedDay === day.date
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: selectedDay === day.date ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {format(parseISO(day.date), "EEEE")}
                </motion.button>
              ))}
            </div>
          </div>

          {/* جزییات هوا */}
          <div className="p-4">
            <AnimatePresence mode="wait">
              {selectedForecast && (
                <motion.div
                  key={selectedDay + cityName} // force animation when day or city changes
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <WeatherDetailCard
                    dayData={selectedForecast.data}
                    date={selectedForecast.date}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-2 p-5 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl shadow-md border-l-4 border-yellow-400"
            >
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                📌 Daily Suggestion
              </h3>
              <p className="text-yellow-900">
                {getSuggestionEn(
                  selectedForecast.data[0].weather[0].description
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
