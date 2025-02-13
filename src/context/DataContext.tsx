"use client"; // required in next.js 13+ which uses server side rendering

import React, { createContext, useContext, useState, ReactNode } from "react";

type CustomObjectType = {
  [key: string]: boolean;
};

interface DataContextType {
  visibleColumns: CustomObjectType;
  setVisibleColumns: React.Dispatch<React.SetStateAction<CustomObjectType>>;
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
    OBJECTID: true,
    DATE_ARRESTED: true,
    Arrest_ID: true,
    Case_Number: true,
    Charge_Sequence: true,
    Degree: true,
    Arrest_Charge: true,
    Charge_Description: true,
    TIME_ARREST: true,
    ArrestLocationStreetNBR: true,
    ArrestLocationStreet: true,
    ArrestLocationCity: true,
    ArrestLocationAptFlr: true,
    LASTNAME: true,
    FIRSTNAME: true,
    MIDDLENAME: true,
    SUFFIX: true,
    RACE: true,
    SEX: true,
    DOB: true,
    AGE: true,
    ARREST_STATUS: true,
    UNIQUEKEY: true,
    OBJECTID_1: true,
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

  return (
    <DataContext.Provider
      value={{
        visibleColumns,
        setVisibleColumns,
        uncheckAllVisibleColumns,
        checkAllVisibleColumns,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
