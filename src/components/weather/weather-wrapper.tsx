import { useWeather } from "@/hooks/weather/useWeather";
import { kelvinToFahrenheit } from "@/utils/convertWeather";
import Image from "next/image";
import React from "react";
import { WiFahrenheit } from "react-icons/wi";
import WeatherModal from "./weather-modal";

export default React.memo(function WeatherWrapper() {
  const {
    modalDetails,
    isModalOpen,
    setIsModalOpen,
    weatherData,
    isWeatherDataLoading,
    weatherDataError,
  } = useWeather();

  if (isWeatherDataLoading) return <div>Weather Data is Loading ... </div>;
  if (weatherDataError) return <div>Error Loading Weather Data ... </div>;

  return (
    <div
      onClick={() => {
        setIsModalOpen((prev) => !prev);
      }}
      className={`bg-gradient-to-br flex justify-center items-center rounded-xl z-100 ${
        modalDetails?.gradient || ""
      } shadow-md cursor-pointer`}
    >
      {isModalOpen && modalDetails && (
        <WeatherModal modalDetails={modalDetails} />
      )}
      {modalDetails?.iconPath && (
        <Image
          aria-hidden
          src={modalDetails.iconPath}
          alt="weather icon"
          width={50}
          height={50}
        />
      )}

      {weatherData && (
        <div className="flex gap-2 items-center">
          <p>{weatherData.name}</p>
          <div className="flex items-center">
            {kelvinToFahrenheit(weatherData.main.temp)}
            <WiFahrenheit size={30} />
          </div>
        </div>
      )}
    </div>
  );
});
