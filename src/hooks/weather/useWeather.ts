import { useQueryBuilder } from "@/api/queryBuilder";
import { type OpenWeatherResponse } from "@/types/openWeather.interface";
import { kelvinToFahrenheit } from "@/utils/convertWeather";
import { useEffect, useState } from "react";

type Weather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

type ModalDetails = {
  name: string;
  gradient: string;
  iconPath: string;
  temp: number;
  feels_like: number;
  high: number;
  low: number;
  wind_speed: number;
  humidity: number;
  dateLabel: string;
  weather: Weather[];
};

const isDaytime = (sunrise: number, sunset: number) => {
  const now = Math.floor(Date.now() / 1000); // current Unix time (seconds)
  return now >= sunrise && now < sunset;
};

export function useWeather() {
  const {
    data: weatherData,
    isLoading: isWeatherDataLoading,
    error: weatherDataError,
  } = useQueryBuilder<OpenWeatherResponse>({
    searchParams: { lat: (38.4404).toString(), lon: -(122.7141).toString() },
    base_url: process.env.NEXT_PUBLIC_OPEN_WEATHER_BASE_URL,
    type: "weather",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState<ModalDetails | null>(null);

  useEffect(() => {
    if (weatherData) {
      const dayTime = isDaytime(
        weatherData.sys.sunrise,
        weatherData.sys.sunset,
      );

      const temp = kelvinToFahrenheit(weatherData.main.temp);

      const localTime = new Date((weatherData.dt + weatherData.timezone) * 1000);
      const today = new Date();
      const isToday =
        localTime.getUTCDate() === today.getUTCDate() &&
        localTime.getUTCMonth() === today.getUTCMonth() &&
        localTime.getUTCFullYear() === today.getUTCFullYear();
      const dateStr = localTime.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
      const dateLabel = isToday ? `Today, ${dateStr}` : dateStr;

      let modal: ModalDetails = {
        gradient: "",
        iconPath: "",
        name: "",
        high: 0,
        low: 0,
        temp: 0,
        feels_like: 0,
        wind_speed: 0,
        humidity: 0,
        dateLabel: "",
        weather: [],
      };
      modal.name = weatherData.name;
      modal.temp = temp;
      modal.feels_like = kelvinToFahrenheit(weatherData.main.feels_like);
      modal.high = kelvinToFahrenheit(weatherData.main.temp_max);
      modal.low = kelvinToFahrenheit(weatherData.main.temp_min);
      modal.wind_speed = Math.round(weatherData.wind.speed * 2.237 * 10) / 10; // m/s → mph
      modal.humidity = weatherData.main.humidity;
      modal.dateLabel = dateLabel;
      modal.weather = [...weatherData.weather];

      const weatherType = weatherData.weather[0].main.toLowerCase();

      if (temp > 70) {
        modal.gradient = "from-yellow-500 to-yellow-200  text-gray-50";
      } else if (kelvinToFahrenheit(weatherData.main.temp) < 70) {
        modal.gradient = "from-black to-blue-600  text-gray-50";
      }

      if (weatherType === "mist") {
        modal.iconPath = "/cloudy-day-1.svg";
      } else if (dayTime) {
        modal.iconPath = "/day.svg";
      } else {
        modal.iconPath = "/night.svg";
      }

      setModalDetails((prev) => ({ ...prev, ...modal }));
    }
  }, [weatherData]);

  return {
    modalDetails,
    isModalOpen,
    setIsModalOpen,
    weatherData,
    isWeatherDataLoading,
    weatherDataError,
  };
}
