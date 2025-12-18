"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const filters = [
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

  const selectedFilter = useMemo(() => {
    const entry = Object.entries(filterState).find(([, value]) => value);
    return entry?.[0];
  }, [filterState]);

  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    if (selectedFilter) {
      searchArrestLogs(filterText, selectedFilter);
    }
  }, [filterText, searchArrestLogs]);

  const setShowStatusBar = useCallback((checkedFilter: string) => {
    setFilterState((prev) =>
      Object.fromEntries(
        filters.map((filter) => [
          filter,
          filter === checkedFilter ? !prev[checkedFilter] : false,
        ])
      )
    );
  }, []);

  return (
    <div className={`flex  border-1 border-gray-300 rounded-xl`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="border-r-1 border-gray-300">Search by</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white rounded">
          <DropdownMenuLabel>Filter By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filters.map((filter: string, index: number) => {
            return (
              <DropdownMenuCheckboxItem
                checked={filterState[filter]}
                onCheckedChange={() => {
                  setShowStatusBar(filter);
                }}
                key={index}
              >
                {filter}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        className="border-none"
        onChange={(e) => {
          setFilterText(e.target.value);
        }}
      />
    </div>
  );
}

export default React.memo(Searchbar);
