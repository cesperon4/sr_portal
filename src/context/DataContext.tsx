// "use client"; // required in next.js 13+ which uses server side rendering

import {
  initialArrestLogColumns,
  initialCrimeFilterState,
  initialPoliceComplaintColumns,
  initialPoliceForceColumns,
  initialPolicePursuitColumns,
} from "@/lib/constants";
import { CrimeFilterState } from "@/types/map.interface";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  type DataCategory,
  type VisibleFields,
} from "../types/openDataPortal.type";

interface DataContextType {
  visibleArrestLogColumns: VisibleFields;
  visiblePoliceComplaintColumns: VisibleFields;
  visiblePolicePursuitColumns: VisibleFields;
  visibleUseOfForceColumns: VisibleFields;
  crimeFilterState: CrimeFilterState;
  setCrimeFilterState: React.Dispatch<React.SetStateAction<CrimeFilterState>>;
  uncheckAllVisibleColumns: (group: DataCategory) => void;
  checkAllVisibleColumns: (group: DataCategory) => void;
  resetVisibleColumns: (group: DataCategory) => void;
  columnSetters: Record<
    DataCategory,
    React.Dispatch<React.SetStateAction<VisibleFields>>
  >;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [visibleArrestLogColumns, setVisibleArrestLogColumns] =
    useState<VisibleFields>(initialArrestLogColumns);

  const [visiblePoliceComplaintColumns, setVisiblePoliceComplaintColumns] =
    useState<VisibleFields>(initialPoliceComplaintColumns);

  const [visiblePolicePursuitColumns, setVisiblePolicePursuitColumns] =
    useState<VisibleFields>(initialPolicePursuitColumns);

  const [visibleUseOfForceColumns, setVisibleUseOfForceColumns] =
    useState<VisibleFields>(initialPoliceForceColumns);

  useEffect(() => {
    console.log("use effect for visible force");
  }, [visibleUseOfForceColumns]);

  const columnSetters: Record<
    DataCategory,
    React.Dispatch<React.SetStateAction<VisibleFields>>
  > = {
    ["Arrest Logs"]: setVisibleArrestLogColumns,
    ["Police Complaints"]: setVisiblePoliceComplaintColumns,
    ["Police Pursuits"]: setVisiblePolicePursuitColumns,
    ["Use of Force Reports"]: setVisibleUseOfForceColumns,
  };

  const columnStates: Record<DataCategory, VisibleFields> = {
    ["Arrest Logs"]: visibleArrestLogColumns,
    ["Police Complaints"]: visiblePoliceComplaintColumns,
    ["Police Pursuits"]: visiblePolicePursuitColumns,
    ["Use of Force Reports"]: visibleUseOfForceColumns,
  };

  const uncheckAllVisibleColumns = (group: DataCategory) => {
    const updatedObj = Object.keys(columnStates[group]).reduce((acc, key) => {
      acc[key as keyof VisibleFields] = false; // Set each key's value to false
      return acc;
    }, {} as VisibleFields);

    columnSetters[group](updatedObj);
  };

  const checkAllVisibleColumns = (group: DataCategory) => {
    const updatedObj = Object.keys(columnStates[group]).reduce((acc, key) => {
      acc[key as keyof VisibleFields] = true; // Set each key's value to true
      return acc;
    }, {} as VisibleFields);
    columnSetters[group](updatedObj);
  };

  const resetVisibleColumns = (group: DataCategory) => {
    switch (group) {
      case "Arrest Logs":
        columnSetters[group](initialArrestLogColumns);
        break;
      case "Police Complaints":
        columnSetters[group](initialPoliceComplaintColumns);
        break;
      case "Police Pursuits":
        columnSetters[group](initialPolicePursuitColumns);
        break;
      case "Use of Force Reports":
        columnSetters[group](initialPoliceForceColumns);
        break;
      default:
        break;
    }
  };

  const [crimeFilterState, setCrimeFilterState] = useState<CrimeFilterState>(
    initialCrimeFilterState
  );

  return (
    <DataContext.Provider
      value={{
        visibleArrestLogColumns,
        crimeFilterState,
        visiblePolicePursuitColumns,
        visibleUseOfForceColumns,
        setCrimeFilterState,
        uncheckAllVisibleColumns,
        resetVisibleColumns,
        visiblePoliceComplaintColumns,
        columnSetters,
        checkAllVisibleColumns,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
