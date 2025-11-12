"use client";

import React, { useState } from "react";
import { crimeFilters } from "@/lib/constants";
import { CrimeFilterState } from "@/types/map.interface";
import { Button } from "@/components/ui/button";
import {
  Filter as FilterIcon,
  X,
  ChevronDown,
  ChevronRight,
  MapPin,
} from "lucide-react";

interface FilterProps {
  crimeFilterState: CrimeFilterState;
  setCrimeFilterState: React.Dispatch<React.SetStateAction<CrimeFilterState>>;
  clearAllCriminalFilters: () => void;
}

export function Filter({
  crimeFilterState,
  setCrimeFilterState,
  clearAllCriminalFilters,
}: FilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Count active filters
  const activeFilterCount =
    Object.values(crimeFilterState).filter(Boolean).length;

  return (
    <aside className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FilterIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
              {activeFilterCount > 0 && (
                <p className="text-xs text-blue-600 font-medium mt-0.5">
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
              className="gap-2 text-gray-600 hover:text-red-600 hover:border-red-300"
            >
              <X className="w-3.5 h-3.5" />
              Clear All
            </Button>
          )}
        </div>

        <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-100 p-3 rounded-lg border border-blue-100">
          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p>Click on the map to view details of police incidents.</p>
        </div>
      </div>

      {/* Filter Categories - Scrollable */}
      <div className="overflow-y-auto flex-1 p-6">
        <div className="space-y-4">
          {Object.entries(crimeFilters).map(([category, subcategories]) => {
            const isExpanded = expandedCategories[category];

            return (
              <div
                key={category}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-gray-900">
                    {category}
                  </h3>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {/* Subcategories */}
                {isExpanded && (
                  <div className="p-4 space-y-4 bg-white">
                    {Object.entries(subcategories).map(
                      ([subcategory, codes]) => (
                        <div key={subcategory}>
                          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                            {subcategory}
                          </h4>
                          <div className="space-y-2 pl-1">
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
                                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                                  {name}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )
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
