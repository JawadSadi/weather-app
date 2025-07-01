import { format, parseISO } from "date-fns";
import { FiWind, FiDroplet, FiBarChart2 } from "react-icons/fi";
import { iconMap } from "../icons";
import { WiDaySunny } from "react-icons/wi";
import { motion } from "framer-motion";

export default function WeatherDetailCard({
  dayData,
  date,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dayData: any[];
  date: string;
}) {
  return (
    <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Forecast for {format(parseISO(date), "MMMM dd, yyyy")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {dayData.map((item, index) => {
          const time = item.dt_txt.split(" ")[1].slice(0, 5);
          return (
            <motion.div
              key={item.dt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white bg-opacity-90 rounded-xl  shadow text-gray-800"
            >
              <div
                key={item.dt}
                className="bg-blue-100 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">{time}</p>
                  <p className="text-lg font-bold">
                    {Math.round(item.main.temp)}°C
                  </p>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  {iconMap[item.weather[0].icon] || (
                    <WiDaySunny size={48} color="" />
                  )}
                  <p className="capitalize text-gray-600">
                    {item.weather[0].description}
                  </p>
                </div>

                <div className="text-sm space-y-1 text-gray-700">
                  <div className="flex items-center gap-2">
                    <FiDroplet className="text-blue-600" />
                    <span>Humidity:</span>
                    <span className="ml-auto">{item.main.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiWind className="text-sky-600" />
                    <span>Wind Speed:</span>
                    <span className="ml-auto">
                      {Math.round(item.wind.speed * (18 / 5))} km/hr
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiBarChart2 className="text-gray-600" />
                    <span>Pressure:</span>
                    <span className="ml-auto">{item.main.pressure} hPa</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
