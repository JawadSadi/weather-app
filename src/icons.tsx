import type { JSX } from "react";
import {
  WiDaySunny,
  WiNightClear,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayCloudy,
  WiNightAltCloudy,
} from "react-icons/wi";

export const iconMap: Record<string, JSX.Element> = {
  "01d": <WiDaySunny size={48} color="#fbbf24" />,
  "01n": <WiNightClear size={48} color="#3b82f6" />,
  "02d": <WiDayCloudy size={48} color="#60a5fa" />,
  "02n": <WiNightAltCloudy size={48} color="#6366f1" />,
  "03d": <WiCloudy size={48} color="#9ca3af" />,
  "03n": <WiCloudy size={48} color="#6b7280" />,
  "04d": <WiCloudy size={48} color="#4b5563" />,
  "04n": <WiCloudy size={48} color="#4b5563" />,
  "09d": <WiRain size={48} color="#2563eb" />,
  "09n": <WiRain size={48} color="#1e40af" />,
  "10d": <WiRain size={48} color="#3b82f6" />,
  "10n": <WiRain size={48} color="#1d4ed8" />,
  "11d": <WiThunderstorm size={48} color="#7c3aed" />,
  "11n": <WiThunderstorm size={48} color="#6d28d9" />,
  "13d": <WiSnow size={48} color="#93c5fd" />,
  "13n": <WiSnow size={48} color="#60a5fa" />,
  "50d": <WiFog size={48} color="#9ca3af" />,
  "50n": <WiFog size={48} color="#6b7280" />,
};
