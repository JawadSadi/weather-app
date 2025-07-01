// src/components/SearchBox.tsx
import { useState, useEffect } from "react";

const API_KEY = "879a28f6b8099b7aec6c1dff720bd806"; // 🔁 این را با key خودت جایگزین کن

export default function SearchBox({
  onCitySelect,
}: {
  onCitySelect: (lat: number, lon: number, name: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then(setSuggestions)
        .catch(() => setSuggestions([]));
    }, 300); // 🔁 دی‌بونس برای کاهش تعداد درخواست‌ها

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSearch = (item: any) => {
    onCitySelect(item.lat, item.lon, item.name);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative ml-auto w-full max-w-xs">
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute bg-white z-50 mt-1 border border-gray-300 rounded shadow-md w-full text-black max-h-60 overflow-y-auto">
          {suggestions.map((city) => (
            <li
              key={`${city.lat}-${city.lon}`}
              onClick={() => handleSearch(city)}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
