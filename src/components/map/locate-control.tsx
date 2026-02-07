"use client";

import { Crosshair } from "lucide-react";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

export default function LocateControl() {
  const map = useMap();
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    setError(null);
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        map.setView([latitude, longitude], 15);
        setLocating(false);
      },
      () => {
        setError("Location unavailable");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <div className="absolute bottom-4 right-4 z-[1000] flex flex-col items-end gap-1">
      {error && (
        <span className="text-xs text-red-600 dark:text-red-400 bg-white dark:bg-neutral-900 px-2 py-1 rounded shadow">
          {error}
        </span>
      )}
      <button
        type="button"
        onClick={handleLocate}
        disabled={locating}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-300 shadow-md hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-colors disabled:opacity-60 disabled:pointer-events-none"
        aria-label="Locate me"
      >
        <Crosshair
          className={`size-5 ${locating ? "animate-pulse" : ""}`}
          strokeWidth={1.5}
        />
      </button>
    </div>
  );
}
