// src/components/WeatherNews.tsx
import { useEffect, useState } from "react";
import { fetchWeatherNews } from "../api/weatherNews";
import { motion } from "framer-motion";

export default function WeatherNews() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    fetchWeatherNews().then(setNews).catch(console.error);
  }, []);

  return (
    <div className="p-4 mt-6 bg-white/70 text-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🌐 Global Weather News
      </h2>

      {news.length === 0 && <p>Loading latest weather news...</p>}

      <ul className="space-y-5">
        {news.map((item) => (
          <motion.li
            key={item.url}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-b pb-3"
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-700 hover:underline"
            >
              {item.title}
            </a>
            <p className="text-sm mt-1 text-gray-600">{item.description}</p>
            <span className="text-xs text-gray-500 mt-1 block">
              Source: {item.source.name}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
