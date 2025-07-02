export function getSuggestionEn(weather: string): string {
  const lower = weather.toLowerCase();

  if (lower.includes("rain")) return "Don't forget your umbrella ☔";
  if (lower.includes("snow")) return "Wear warm clothes and be careful ❄️";
  if (lower.includes("clear")) return "Use sunscreen today ☀️";
  if (lower.includes("cloud")) return "It might be chilly, dress warmly 🌥️";
  if (lower.includes("wind")) return "It's windy today, take care 💨";

  return "Have a wonderful day 🌈";
}

export function showDailyNotification(weatherText: string) {
  if (Notification.permission === "granted") {
    new Notification("🌤️ Today's Weather", {
      body: weatherText,
      icon: "/weather-icon.png", // مسیر آیکون سفارشی
    });
  }
}

export function shouldSendNotificationToday(): boolean {
  const today = new Date().toISOString().split("T")[0]; // فقط تاریخ YYYY-MM-DD
  const lastDate = localStorage.getItem("weatherNotificationDate");
  if (lastDate === today) return false;

  localStorage.setItem("weatherNotificationDate", today);
  return true;
}
