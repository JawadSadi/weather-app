// src/api/weatherNews.ts
const NEWS_API_KEY = "c7df272580af4a5884ce78bbf392c6dc"; // 🔁 کلید خودت را جایگزین کن

export async function fetchWeatherNews() {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=weather OR storm OR heatwave OR climate OR rain&language=en&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch news articles.");
  const data = await res.json();
  return data.articles;
}
