import { ArrestLogResponse } from "@/types/arrestLog.interface";
import {
  getBarChartData,
  getDoughnutChartData,
  getLineChartData,
  getPieChartData,
} from "@/utils/chartData";
import { useMemo } from "react";
import { useQueryBuilder } from "../../api/queryBuilder"; // Adjust the import path

export function useCharts() {
  const {
    data: arrestLogs,
    isLoading: isArrestLogsLoading,
    error: arrestLogsError,
  } = useQueryBuilder<ArrestLogResponse>({
    searchParams: undefined,
    filterParams: undefined,
    base_url: process.env.NEXT_PUBLIC_ARREST_LOG_URL,
    orderBy: "DATE_ARRESTED DESC",
    type: "open_data",
  });

  const chartData = useMemo(() => {
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
      barChartData: getBarChartData(arrestLogs.features, "AGE"),
      pieChartData: getPieChartData(arrestLogs.features, "SEX"),
      lineChartData: getLineChartData(arrestLogs.features, "RACE"),
      lineChartDataChargeDescription: getLineChartData(
        arrestLogs.features,
        "Charge_Description"
      ),
      barChartDataDegree: getBarChartData(arrestLogs.features, "Degree"),
      barChartDataStreet: getBarChartData(
        arrestLogs.features,
        "ArrestLocationStreet"
      ),
      doughnutChartData: getDoughnutChartData(arrestLogs.features, "RACE"),
    };
  }, [arrestLogs]);

  return { chartData, isArrestLogsLoading, arrestLogsError };
}
