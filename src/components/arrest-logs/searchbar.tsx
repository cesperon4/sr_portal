"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

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
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    filter: string
  ) => void;
}

const filters = [
  "Name",
  "Arrest Location",
  "Race",
  "Sex",
  "Age",
  "Degree",
  "Date Arrested",
];

function Searchbar({ handleChange }: DataTableProps) {
  const [filterState, setFilterState] = useState<Record<string, boolean>>({});

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
    <div className={`flex p-1 bg-gray-50 rounded`}>
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
      <Input onChange={handleChange} />
    </div>
  );
}

export default React.memo(Searchbar);
