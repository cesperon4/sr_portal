import React from "react";
import { ModeToggle } from "../components/mode-toggle";
import { Button } from "@/components/ui/button";
import Searchbar from "@/components/arrest-logs/searchbar";

interface HeaderProps {
  view: "table" | "map";
  searchArrestLogs: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleView: () => void;
}
export function Header({ view, searchArrestLogs, toggleView }: HeaderProps) {
  return (
    <header className="flex gap-4 items-center mr-auto w-full ">
      <ModeToggle />
      <Button
        variant="outline"
        onClick={() => {
          toggleView();
        }}
        className={`text-white ${
          view === "map" ? "bg-green-300 " : "bg-orange-300"
        }`}
      >
        {`${view === "table" ? "Map" : "Table"} view`}
      </Button>

      {view === "table" && <Searchbar handleChange={searchArrestLogs} />}
    </header>
  );
}
