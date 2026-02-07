"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const FILTER_OPTIONS = [
  "First Name",
  "Last Name",
  "Arrest Location",
  "Race",
  "Sex",
  "Age",
  "Degree",
  "Date Arrested",
];

type SearchbarProps = {
  searchArrestLogs: (e: string, filter?: string) => void;
};

function Searchbar({ searchArrestLogs }: SearchbarProps) {
  const [filterState, setFilterState] = useState<Record<string, boolean>>({});
  const [filterText, setFilterText] = useState("");

  const selectedFilter = useMemo(() => {
    const entry = Object.entries(filterState).find(([, value]) => value);
    return entry?.[0];
  }, [filterState]);

  useEffect(() => {
    if (selectedFilter) {
      searchArrestLogs(filterText, selectedFilter);
    }
  }, [filterText, searchArrestLogs, selectedFilter]);

  const setShowStatusBar = useCallback((checkedFilter: string) => {
    setFilterState((prev) =>
      Object.fromEntries(
        FILTER_OPTIONS.map((f) => [
          f,
          f === checkedFilter ? !prev[checkedFilter] : false,
        ])
      )
    );
  }, []);

  return (
    <div className="flex rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400 focus-within:border-transparent">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700 transition-colors"
          >
            <span className="hidden sm:inline">
              {selectedFilter ?? "Search by"}
            </span>
            <ChevronDown className="size-4 text-gray-500 shrink-0" strokeWidth={1.5} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg">
          <DropdownMenuLabel className="text-label text-gray-500 dark:text-gray-400">
            Filter by field
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-100 dark:bg-neutral-800" />
          {FILTER_OPTIONS.map((filter) => (
            <DropdownMenuCheckboxItem
              key={filter}
              checked={filterState[filter]}
              onCheckedChange={() => setShowStatusBar(filter)}
              className="text-body-sm rounded-lg"
            >
              {filter}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="relative flex-1 min-w-[140px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 dark:text-gray-500 pointer-events-none" strokeWidth={1.5} />
        <Input
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder={selectedFilter ? `Search ${selectedFilter}…` : "Select a field to search"}
          className="border-0 rounded-none bg-transparent pl-9 pr-4 py-2.5 h-auto text-body-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}

export default React.memo(Searchbar);
