"use client"; // required in next.js 13+ which uses server side rendering

import React, { createContext, useContext, useState, ReactNode } from "react";
import { initialCrimeFilterState } from "@/lib/constants";
import { CrimeFilterState } from "@/types/map.interface";

type CustomObjectType = {
  [key: string]: boolean;
};

interface DataContextType {
  visibleColumns: CustomObjectType;
  setVisibleColumns: React.Dispatch<React.SetStateAction<CustomObjectType>>;
  crimeFilterState: CrimeFilterState;
  setCrimeFilterState: React.Dispatch<React.SetStateAction<CrimeFilterState>>;
  uncheckAllVisibleColumns: () => void;
  checkAllVisibleColumns: () => void;
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
  const initialVisibleColumnState = {
    OBJECTID: false,
    DATE_ARRESTED: true,
    Arrest_ID: false,
    Case_Number: false,
    Charge_Sequence: false,
    Degree: false,
    Arrest_Charge: false,
    Charge_Description: true,
    TIME_ARREST: true,
    ArrestLocationStreetNBR: true,
    ArrestLocationStreet: true,
    ArrestLocationCity: true,
    ArrestLocationAptFlr: false,
    LASTNAME: true,
    FIRSTNAME: true,
    MIDDLENAME: false,
    SUFFIX: false,
    RACE: true,
    SEX: true,
    DOB: false,
    AGE: true,
    ARREST_STATUS: true,
    UNIQUEKEY: false,
    OBJECTID_1: false,
  };
  const [visibleColumns, setVisibleColumns] = useState<CustomObjectType>(
    initialVisibleColumnState
  );

  const uncheckAllVisibleColumns = () => {
    const updatedObj = Object.keys(visibleColumns).reduce((acc, key) => {
      acc[key] = false; // Set each key's value to false
      return acc;
    }, {} as Record<string, boolean>);
    setVisibleColumns(updatedObj);
  };

  const checkAllVisibleColumns = () => {
    setVisibleColumns(initialVisibleColumnState);
  };

  const [crimeFilterState, setCrimeFilterState] = useState<CrimeFilterState>(
    initialCrimeFilterState
  );

  return (
    <DataContext.Provider
      value={{
        visibleColumns,
        setVisibleColumns,
        crimeFilterState,
        setCrimeFilterState,
        uncheckAllVisibleColumns,
        checkAllVisibleColumns,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
