import { useEffect } from "react";
import { useGeoLocation } from "../hooks/useGeolocation";
import { fetchForecast } from "../api/weather";
import { format, parseISO } from "date-fns";
import WeatherDetailCard from "./WeatherDetailCard";
import SearchBox from "./SearchBox";
import { AnimatePresence, motion } from "framer-motion";
import { useWeatherStore } from "../store/weatherStore";
import { getSuggestionEn } from "../helperFunctions";

export default function WeatherApp() {
  const { location } = useGeoLocation();
  const {
    forecastData,
    selectedDay,
    setForecastData,
    setSelectedDay,
    cityName,
    setCityName,
  } = useWeatherStore();

  useEffect(() => {
    if (location) {
      fetchForecast(location.lat, location.lon)
        .then((data) => {
          const grouped = groupForecast(data.list);
          setForecastData(grouped, cityName);
          setSelectedDay(grouped[0].date);
          setCityName(data.city.name);
        })
        .catch(console.error);
    }
  }, [location]);

  const groupForecast = (list: any[]) => {
    const grouped: Record<string, any[]> = {};
    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    return Object.entries(grouped).map(([date, data]) => ({ date, data }));
  };

  const handleCitySelect = (lat: number, lon: number, name: string) => {
    fetchForecast(lat, lon)
      .then((data) => {
        const grouped = groupForecast(data.list);
        setForecastData(grouped, cityName);
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
          <nav className="bg-white text-blue-700 shadow-md py-3 px-4 text-lg font-bold flex justify-between items-center">
            <div className="text-xl font-bold">
              Weather App 🌤
              {cityName && (
                <span className="text-gray-600 ml-3">| {cityName}</span>
              )}
            </div>
            <SearchBox onCitySelect={handleCitySelect} />
          </nav>

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

          <div className="p-4">
            <AnimatePresence mode="wait">
              {selectedForecast && (
                <motion.div
                  key={selectedDay + cityName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
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
              className="mt-2 p-5 bg-gradient-to-r from-blue-200 to-blue-400 rounded-xl shadow-md "
            >
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                📌 Daily Suggestion
              </h3>
              <p className="text-yellow-900">
                {getSuggestionEn(forecastData[0].data[0].weather[0].main)}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
