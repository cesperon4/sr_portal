"use client";

import { Button } from "@/components/ui/button";
import { crimeFilters } from "@/lib/constants";
import { CrimeFilterState } from "@/types/map.interface";
import {
  ChevronDown,
  ChevronRight,
  Filter as FilterIcon,
  MapPin,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface FilterProps {
  crimeFilterState: CrimeFilterState;
  setCrimeFilterState: React.Dispatch<React.SetStateAction<CrimeFilterState>>;
  clearAllCriminalFilters: () => void;
}

export default function Filter({
  crimeFilterState,
  setCrimeFilterState,
  clearAllCriminalFilters,
}: FilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const activeFilterCount =
    Object.values(crimeFilterState).filter(Boolean).length;

  return (
    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm max-h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/30 flex-shrink-0">
        <Link
          href="/community/submit?returnView=Map"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 transition-colors mb-4"
        >
          <Plus className="size-4 shrink-0" strokeWidth={2} />
          Create map incident
        </Link>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex-shrink-0 p-2 rounded-xl dark:bg-blue-950/50">
              <FilterIcon
                className="size-4 text-blue-600 dark:text-blue-400"
                strokeWidth={1.5}
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-body-sm font-semibold text-gray-900 dark:text-white truncate">
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <p className="text-caption text-blue-600 dark:text-blue-400">
                  {activeFilterCount} active{" "}
                  {activeFilterCount === 1 ? "filter" : "filters"}
                </p>
              )}
            </div>
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllCriminalFilters}
              className="shrink-0 gap-1.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900"
            >
              <X className="size-3.5" strokeWidth={1.5} />
              Clear all
            </Button>
          )}
        </div>

        <div className="flex items-start gap-2 mt-3 text-body-sm text-gray-600 dark:text-gray-400 dark:bg-blue-950/30 border rounded-xl border-gray-200 dark:border-blue-900/50 p-3">
          <MapPin
            className="size-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
            strokeWidth={1.5}
          />
          <p>Click a marker on the map to view incident details.</p>
        </div>
      </div>

      {/* Scrollable filter list */}
      <div className="overflow-y-auto flex-1 p-4">
        <div className="space-y-3">
          {Object.entries(crimeFilters).map(([category, subcategories]) => {
            const isExpanded = expandedCategories[category] ?? true;
            return (
              <div
                key={category}
                className="rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-left"
                >
                  <span className="text-body-sm font-semibold text-gray-900 dark:text-white">
                    {category}
                  </span>
                  {isExpanded ? (
                    <ChevronDown
                      className="size-4 text-gray-500 shrink-0"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <ChevronRight
                      className="size-4 text-gray-500 shrink-0"
                      strokeWidth={1.5}
                    />
                  )}
                </button>
                {isExpanded && (
                  <div className="p-3 space-y-4 bg-white dark:bg-neutral-900">
                    {Object.entries(subcategories).map(
                      ([subcategory, codes]) => (
                        <div key={subcategory}>
                          <h4 className="text-label text-gray-600 dark:text-gray-400 mb-2">
                            {subcategory}
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(codes).map(([name, code]) => (
                              <label
                                key={code}
                                className="flex items-center gap-2.5 cursor-pointer group"
                              >
                                <input
                                  type="checkbox"
                                  checked={crimeFilterState[code] ?? false}
                                  onChange={(e) =>
                                    setCrimeFilterState((prev) => ({
                                      ...prev,
                                      [code]: e.target.checked,
                                    }))
                                  }
                                  className="size-4 rounded border-gray-300 dark:border-neutral-600 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-neutral-900 cursor-pointer"
                                />
                                <span className="text-body-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                  {name}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
