"use client";

import { useWeather } from "@/hooks/weather/useWeather";
import { kelvinToFahrenheit } from "@/utils/convertWeather";
import { CloudSun, Loader2, Thermometer } from "lucide-react";
import Image from "next/image";
import React from "react";
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

  const handleClose = React.useCallback(() => setIsModalOpen(false), [setIsModalOpen]);

  const temp = weatherData ? kelvinToFahrenheit(weatherData.main.temp) : null;
  const baseClasses =
    "flex items-center gap-2 rounded-xl px-3 py-1.5 min-w-0 text-left transition-colors duration-200 " +
    "bg-gradient-to-br from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 " +
    "border border-white/20 dark:border-white/10 text-white shadow-sm";

  if (isWeatherDataLoading) {
    return (
      <div className={`${baseClasses} min-w-[100px]`} aria-hidden>
        <Loader2 className="size-4 shrink-0 animate-spin text-white/90" strokeWidth={1.5} />
        <span className="text-caption text-white/90">Weather</span>
      </div>
    );
  }

  if (weatherDataError) {
    return (
      <div className={`${baseClasses} min-w-[100px]`} title="Weather unavailable">
        <CloudSun className="size-4 shrink-0 text-white/80" strokeWidth={1.5} />
        <span className="text-caption text-white/90">—</span>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen((prev) => !prev)}
        className={`${baseClasses} hover:from-blue-600 hover:to-indigo-600 dark:hover:from-blue-500 dark:hover:to-indigo-500 hover:border-white/30`}
        aria-label="View weather"
        aria-expanded={isModalOpen}
      >
        {modalDetails?.iconPath && (
          <Image
            src={modalDetails.iconPath}
            alt=""
            width={28}
            height={28}
            className="shrink-0 size-7 object-contain drop-shadow-sm"
            aria-hidden
          />
        )}
        <div className="flex min-w-0 flex-col items-start">
          <span className="text-caption text-white/95 truncate max-w-[88px]">
            {weatherData?.name ?? "—"}
          </span>
          <span className="flex items-center gap-0.5 text-body-sm font-semibold tabular-nums text-white">
            {temp != null ? (
              <>
                {temp}
                <span className="text-caption font-normal text-white/90">°F</span>
              </>
            ) : (
              "—"
            )}
          </span>
        </div>
      </button>

      {isModalOpen && modalDetails && (
        <WeatherModal modalDetails={modalDetails} onClose={handleClose} />
      )}
    </>
  );
});
