import { createContext, useContext, ReactNode, useMemo } from "react";
import {
  getBarChartData,
  getPieChartData,
  getLineChartData,
  getDoughnutChartData,
} from "@/utils/chartData";
import { type ChartData } from "chart.js";
import { type ArrestLogType } from "@/types/arrestLog.interface";
import { type Point } from "chart.js";

type ChartsDataType = {
  barChartData: ChartData<
    "bar",
    (number | [number, number] | null)[],
    unknown
  > | null;
  pieChartData: ChartData<"pie", number[], unknown> | null;
  lineChartData: ChartData<"line", (number | Point | null)[], unknown> | null;
  lineChartDataChargeDescription: ChartData<
    "line",
    (number | Point | null)[],
    unknown
  > | null;
  barChartDataDegree: ChartData<
    "bar",
    (number | [number, number] | null)[],
    unknown
  > | null;
  barChartDataStreet: ChartData<
    "bar",
    (number | [number, number] | null)[],
    unknown
  > | null;
  doughnutChartData: ChartData<"doughnut", number[], unknown> | null;
};
type InsightContextType = {
  chartData: ChartsDataType;
};

type InsightContextProviderProps = {
  children: ReactNode;
  arrestLogs: ArrestLogType[];
};

const InsightContext = createContext<InsightContextType | undefined>(undefined);

export const useInsightContext = (): InsightContextType => {
  const context = useContext(InsightContext);

  if (!context)
    throw new Error(
      "useInsightContext must be used within Insight context provider"
    );

  return context;
};

export const InsightContextProvider = ({
  children,
  arrestLogs,
}: InsightContextProviderProps) => {
  const chartsData = useMemo(() => {
    if (!arrestLogs)
      return {
        barChartData: null,
        pieChartData: null,
        lineChartData: null,
        doughnutChartData: null,
        lineChartDataChargeDescription: null,
        barChartDataStreet: null,
        barChartDataDegree: null,
      };

    return {
      barChartData: getBarChartData(arrestLogs, "AGE"),
      pieChartData: getPieChartData(arrestLogs, "SEX"),
      lineChartData: getLineChartData(arrestLogs, "RACE"),
      lineChartDataChargeDescription: getLineChartData(
        arrestLogs,
        "Charge_Description"
      ),
      barChartDataDegree: getBarChartData(arrestLogs, "Degree"),
      barChartDataStreet: getBarChartData(arrestLogs, "ArrestLocationStreet"),
      doughnutChartData: getDoughnutChartData(arrestLogs, "RACE"),
    };
  }, [arrestLogs]);
  return (
    <InsightContext.Provider value={{ chartData: chartsData }}>
      {children}
    </InsightContext.Provider>
  );
};
