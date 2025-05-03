import React from "react";
import { initialSidebarState } from "@/lib/constants";
import { MdInsights } from "react-icons/md";

import { Button } from "@/components/ui/button";

interface SidebarProps {
  getButtonClass: (key: keyof typeof initialSidebarState) => string;
  updateSidebar: (key: keyof typeof initialSidebarState) => void;
}
export function Sidebar({ getButtonClass, updateSidebar }: SidebarProps) {
  return (
    <div className="sidebar shadow border border-gray-50 rounded flex flex-col gap-1">
      <div className="flex items-center gap-1 mx-auto py-4 font-semibold">
        <span className="">Data Insights</span>
        <MdInsights />
      </div>

      <Button
        className={getButtonClass("Age")}
        onClick={() => {
          updateSidebar("Age");
        }}
      >
        Age
      </Button>
      <Button
        className={getButtonClass("Gender")}
        onClick={() => {
          updateSidebar("Gender");
        }}
      >
        Gender
      </Button>
      <Button
        className={getButtonClass("Location")}
        onClick={() => {
          updateSidebar("Location");
        }}
      >
        Location
      </Button>
      <Button
        className={getButtonClass("Ethnicity")}
        onClick={() => {
          updateSidebar("Ethnicity");
        }}
      >
        Ethnicity
      </Button>
      <Button
        className={getButtonClass("Degree")}
        onClick={() => {
          updateSidebar("Degree");
        }}
      >
        Degree
      </Button>
      <Button
        className={getButtonClass("Charge")}
        onClick={() => {
          updateSidebar("Charge");
        }}
      >
        Charge
      </Button>
    </div>
  );
}
