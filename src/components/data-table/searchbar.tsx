"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps {
  handleChange: (e: string, filter: string) => void;
}

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

function Searchbar({ handleChange }: DataTableProps) {
  const [filterState, setFilterState] = useState<Record<string, boolean>>({});

  const selectedFilter = useMemo(() => {
    const entry = Object.entries(filterState).find(([, value]) => value);
    return entry?.[0];
  }, [filterState]);

  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    if (selectedFilter) {
      handleChange(filterText, selectedFilter);
    }
  }, [filterText, selectedFilter, handleChange]);

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
    <div className={`flex p-1rounded`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Search by</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
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
        onChange={(e) => {
          setFilterText(e.target.value);
        }}
      />
    </div>
  );
}

export default React.memo(Searchbar);
