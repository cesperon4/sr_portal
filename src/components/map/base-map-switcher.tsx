"use client";

import { Layers, Map as MapIcon, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { TileLayer } from "react-leaflet";

const BASE_MAPS = [
  {
    id: "streets",
    name: "Streets",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    icon: MapIcon,
  },
  {
    id: "light",
    name: "Light",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    icon: Sun,
  },
  {
    id: "dark",
    name: "Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    icon: Moon,
  },
] as const;

type BaseMapId = (typeof BASE_MAPS)[number]["id"];

export default function BaseMapSwitcher() {
  const [activeId, setActiveId] = useState<BaseMapId>("streets");

  const active = BASE_MAPS.find((m) => m.id === activeId) ?? BASE_MAPS[0];

  return (
    <>
      <TileLayer
        key={activeId}
        attribution={active.attribution}
        url={active.url}
      />
      <div className="absolute bottom-4 left-4 z-[1000] flex flex-col gap-2">
        <div className="flex rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden">
          {BASE_MAPS.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeId === layer.id;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveId(layer.id)}
                title={layer.name}
                className={`flex items-center justify-center w-10 h-10 transition-colors ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
                aria-label={`Map style: ${layer.name}`}
                aria-pressed={isActive}
              >
                <Icon className="size-4" strokeWidth={1.5} />
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5 text-caption text-gray-500 dark:text-gray-400 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-2 py-1 rounded-md border border-gray-200/80 dark:border-neutral-700/80 shadow">
          <Layers className="size-3 shrink-0" strokeWidth={1.5} />
          <span>{active.name}</span>
        </div>
      </div>
    </>
  );
}
