// src/store/weatherStore.ts
import { create } from "zustand";

interface ForecastDay {
  date: string;
  data: any[];
}

interface WeatherState {
  forecastData: ForecastDay[];
  selectedDay: string;
  cityName: string;
  setForecastData: (data: ForecastDay[], city: string) => void;
  setSelectedDay: (day: string) => void;
  setCityName: (day: string) => void;

  //   for search
  query: string;
  suggestions: any[]; // ideally type suggestions properly
  setQuery: (q: string) => void;
  setSuggestions: (s: any[]) => void;
  clearSearch: () => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  forecastData: [],
  selectedDay: "",
  cityName: "Your Location",
  setForecastData: (data, city) =>
    set({
      forecastData: data,
      selectedDay: data[0]?.date || "",
      cityName: city,
    }),
  setSelectedDay: (day) => set({ selectedDay: day }),
  setCityName: (city) => set({ cityName: city }),

  //   for search
  query: "",
  suggestions: [],
  setQuery: (q) => set({ query: q }),
  setSuggestions: (s) => set({ suggestions: s }),
  clearSearch: () => set({ query: "", suggestions: [] }),
}));
