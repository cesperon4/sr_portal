import { createContext, useContext, ReactNode } from "react";
import { useArrestLogSearch } from "@/hooks/data-table/useArrestLogSearch";

type ArrestLogContextType = {
  arrestLogSearchParams: Record<string, string | number>;
  searchArrestLogs: (e: string, filter?: string) => void;
};

const ArrestLogContext = createContext<ArrestLogContextType | undefined>(
  undefined
);

export const useArrestLogContext = (): ArrestLogContextType => {
  const context = useContext(ArrestLogContext);
  if (!context) {
    throw new Error(
      "useArrestLogContext must be used within a ArrestLogProvider"
    );
  }

  return context;
};

export const ArrestLogProvider = ({ children }: { children: ReactNode }) => {
  const { searchArrestLogs, arrestLogSearchParams } = useArrestLogSearch();

  return (
    <ArrestLogContext.Provider
      value={{ arrestLogSearchParams, searchArrestLogs }}
    >
      {children}
    </ArrestLogContext.Provider>
  );
};
