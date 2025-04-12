import React from "react";
import { ModeToggle } from "../components/mode-toggle";
import { Button } from "@/components/ui/button";
import { HeaderSelect } from "@/types/header.interface";
import Searchbar from "@/components/arrest-logs/searchbar";

import { HEADER_CLASSES } from "@/lib/constants";

interface HeaderProps {
  view: HeaderSelect;
  toggleView: (view: HeaderSelect) => void;
  searchArrestLogs: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openSelectColumns: () => void;
}
export function Header({
  view,
  toggleView,
  searchArrestLogs,
  openSelectColumns,
}: HeaderProps) {
  return (
    <header className="flex gap-4 items-center mr-auto w-full border-b-2 pb-4">
      <span className="font-semibold">SR PORTAL</span>
      <ModeToggle />
      <div className="flex gap-1">
        <Button
          variant="outline"
          onClick={() => {
            toggleView("Map");
          }}
          className={`${view === "Map" && HEADER_CLASSES.view_button}`}
        >
          Map
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            toggleView("Table");
          }}
          className={`${view === "Table" && HEADER_CLASSES.view_button}`}
        >
          Table
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            toggleView("Chart");
          }}
          className={`${view === "Chart" && HEADER_CLASSES.view_button}`}
        >
          Charts
        </Button>
      </div>
      {view === "Table" && (
        <div className={`flex gap-2 items-center ml-12`}>
          <Button
            variant="outline"
            onClick={() => {
              openSelectColumns();
            }}
          >
            Select Columns
          </Button>
          <Searchbar handleChange={searchArrestLogs} />
        </div>
      )}
    </header>
  );
}
