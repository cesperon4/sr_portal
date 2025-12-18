import { ChartData, Point } from "chart.js";
export interface SidebarState {
  ["Arrest Logs"]: boolean;
  ["Police Complaints"]: boolean;
  ["Police Pursuits"]: boolean;
  ["Use of Force"]: boolean;
}

export type ChartsData = {
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
