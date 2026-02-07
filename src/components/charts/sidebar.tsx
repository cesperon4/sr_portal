"use client";

import { initialSidebarState } from "@/lib/constants";
import { BarChart3, Calendar, MapPin, Palette, Users } from "lucide-react";

interface SidebarProps {
  variant?: "default" | "vision";
  getButtonClass: (key: keyof typeof initialSidebarState) => string;
  updateSidebar: (key: keyof typeof initialSidebarState) => void;
}

const categories = [
  { key: "Arrest Logs" as const, label: "Arrest Logs", icon: Calendar },
  { key: "Police Complaints" as const, label: "Police Complaints", icon: Users },
  { key: "Police Pursuits" as const, label: "Police Pursuits", icon: MapPin },
  { key: "Use of Force" as const, label: "Use of Force", icon: Palette },
];

export function Sidebar({
  variant = "default",
  getButtonClass,
  updateSidebar,
}: SidebarProps) {
  const isVision = variant === "vision";

  return (
    <aside className="flex flex-col gap-3 w-full sm:w-56 flex-shrink-0">
      <div className="flex items-center gap-2.5 px-1">
        <div
          className={`flex items-center justify-center size-9 rounded-xl ${
            isVision
              ? "bg-blue-50 dark:bg-blue-500 border border-blue-100 dark:border-0 shadow-sm dark:shadow-lg dark:shadow-blue-500/20"
              : "bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50"
          }`}
        >
          <BarChart3
            className={`size-4 shrink-0 ${isVision ? "text-blue-600 dark:text-white" : "text-blue-600 dark:text-blue-400"}`}
            strokeWidth={1.5}
          />
        </div>
        <div>
          <h2
            className={`text-body-sm font-semibold ${isVision ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"}`}
          >
            Insights
          </h2>
          <p className={`text-caption ${isVision ? "text-gray-500 dark:text-slate-400" : "text-gray-500 dark:text-gray-400"}`}>
            By category
          </p>
        </div>
      </div>

      <nav
        className={`flex flex-col gap-0.5 p-1.5 rounded-2xl w-fit ${
          isVision
            ? "bg-gray-100/80 dark:bg-[#0d1b33] border-0 dark:border border-white/[0.08]"
            : "rounded-2xl bg-gray-100/80 dark:bg-neutral-800/50"
        }`}
      >
        {categories.map(({ key, label, icon: Icon }) => {
          const isActive = getButtonClass(key).includes("bg-gray-100");
          return (
            <button
              key={key}
              type="button"
              onClick={() => updateSidebar(key)}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 w-full text-left ${
                isVision
                  ? isActive
                    ? "bg-blue-500 text-white shadow-sm dark:shadow-lg dark:shadow-blue-500/25"
                    : "text-gray-600 dark:text-slate-400 hover:bg-gray-200/70 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-slate-200"
                  : isActive
                    ? "bg-white dark:bg-neutral-700/80 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-neutral-700/50 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.5} />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
