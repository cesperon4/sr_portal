"use client";

import React, { useState } from "react";
import { crimeFilters } from "@/lib/constants";
import { CrimeFilterState } from "@/types/map.interface";
// import { Button } from "@/components/ui/button";

interface FilterProps {
  crimeFilterState: CrimeFilterState;
  setCrimeFilterState: React.Dispatch<React.SetStateAction<CrimeFilterState>>;
  checkAllCriminalFilters: () => void;
  clearAllCriminalFilters: () => void;
}
export function Filter({
  crimeFilterState,
  setCrimeFilterState,
}: //   checkAllCriminalFilters,
//   clearAllCriminalFilters,
FilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="shadow border border-gray-50 rounded p-8">
      <header className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="flex gap-1">
          {/* <Button
            className="bg-green-400 hover:bg-green-300"
            size="sm"
            onClick={() => {
              checkAllCriminalFilters();
            }}
          >
            check all
          </Button>

          <Button
            className="bg-red-400 hover:bg-red-300"
            size="sm"
            onClick={() => {
              clearAllCriminalFilters();
            }}
          >
            clear all
          </Button> */}
        </div>
      </header>

      <p className="text-sm text-gray-500 mb-4">
        Click on the map to view details of police incidents.
      </p>
      <>
        {Object.entries(crimeFilters).map(([category, subcategories]) => (
          <div key={category} className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-blue-500 font-semibold my-2">{category}</h3>
              <button
                onClick={() => toggleCategory(category)}
                className="text-sm text-blue-600 underline"
              >
                {expandedCategories[category] ? "Hide" : "Show"}
              </button>
            </div>

            {expandedCategories[category] && (
              <div>
                {Object.entries(subcategories).map(([subcategory, codes]) => (
                  <div key={subcategory} className="ml-4 mb-2">
                    <h4 className="font-semibold text-gray-700">
                      {subcategory}
                    </h4>
                    <div className="flex flex-col gap-1 ml-2">
                      {Object.entries(codes).map(([name, code]) => (
                        <label key={code} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={crimeFilterState[code] ?? false}
                            onChange={(e) =>
                              setCrimeFilterState((prev) => ({
                                ...prev,
                                [code]: e.target.checked,
                              }))
                            }
                          />
                          {name}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </>
    </div>
  );
}
