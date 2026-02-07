"use client";

import { Backdrop } from "../backdrop";
import { CloudRain, Droplets, MapPin, Thermometer, Wind, X } from "lucide-react";
import Image from "next/image";

type Weather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export type ModalDetails = {
  gradient: string;
  iconPath: string;
  name: string;
  high: number;
  low: number;
  temp: number;
  feels_like: number;
  wind_speed: number;
  humidity: number;
  dateLabel: string;
  weather: Weather[];
};

type WeatherModalProps = {
  modalDetails: ModalDetails;
  onClose?: () => void;
};

const STAT_CARDS: {
  key: keyof Pick<ModalDetails, "temp" | "high" | "low" | "feels_like" | "wind_speed" | "humidity">;
  label: string;
  icon: React.ElementType;
  format: (v: number) => string;
  iconBg: string;
}[] = [
  { key: "temp", label: "Now", icon: Thermometer, format: (v) => `${v}°`, iconBg: "bg-sky-500" },
  { key: "high", label: "High", icon: Thermometer, format: (v) => `${v}°`, iconBg: "bg-amber-400" },
  { key: "low", label: "Low", icon: Thermometer, format: (v) => `${v}°`, iconBg: "bg-sky-400" },
  { key: "feels_like", label: "Feels like", icon: CloudRain, format: (v) => `${v}°`, iconBg: "bg-sky-500" },
  { key: "wind_speed", label: "Wind", icon: Wind, format: (v) => `${v} mph`, iconBg: "bg-sky-500" },
  { key: "humidity", label: "Humidity", icon: Droplets, format: (v) => `${v}%`, iconBg: "bg-blue-500" },
];

export default function WeatherModal({
  modalDetails,
  onClose,
}: WeatherModalProps) {
  return (
    <Backdrop onClick={onClose ?? (() => {})}>
      <div
        role="dialog"
        aria-label="Weather forecast"
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90vw] max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-900"
      >
        {/* Light blue hero (reference style) */}
        <div className="bg-[#7dd3fc] px-5 pt-5 pb-8 text-white dark:bg-sky-600">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-sm font-medium text-white/95">
                <MapPin className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                <span className="truncate">{modalDetails.name}</span>
              </div>
              <p className="text-caption text-white/90">{modalDetails.dateLabel}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl p-2 text-white/90 hover:bg-white/20 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-6xl font-bold tabular-nums leading-none">
              {modalDetails.temp}°
            </p>
            <div className="shrink-0">
              <Image
                src={modalDetails.iconPath}
                alt=""
                width={80}
                height={80}
                className="drop-shadow-lg"
              />
            </div>
          </div>
          <p className="mt-2 text-body-sm capitalize text-white/95">
            {modalDetails.weather.map((w) => w.description).join(", ") || "—"}
          </p>
        </div>

        {/* Weather Today card (white overlay style) */}
        <div className="relative -mt-4 mx-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
          <h3 className="text-subheading mb-4 text-gray-900 dark:text-white">
            Weather Today
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {STAT_CARDS.map(({ key, label, icon: Icon, format, iconBg }) => {
              const value = modalDetails[key];
              const display = typeof value === "number" ? format(value) : "—";
              return (
                <div
                  key={key}
                  className="flex min-w-[88px] flex-col items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/80 py-3 dark:border-neutral-700 dark:bg-neutral-700/40"
                >
                  <span className="text-caption text-gray-500 dark:text-neutral-400">
                    {label}
                  </span>
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full ${iconBg} text-white`}
                  >
                    <Icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-body-sm font-semibold tabular-nums text-gray-900 dark:text-white">
                    {display}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Backdrop>
  );
}
