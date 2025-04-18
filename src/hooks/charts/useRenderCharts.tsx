import { useMemo, useCallback } from "react";
import { Charts } from "../../components/charts/charts";
import { ArrestLogType } from "@/types/arrestLog.interface";
import {
  getBarChartData,
  getPieChartData,
  getLineChartData,
  getDoughnutChartData,
} from "@/utils/chartData";

interface UseRenderChartsProps {
  isArrestLogsLoading: boolean;
  arrestLogsError: Error | null;
  arrestLogs: ArrestLogType[] | null;
}

export function useRenderCharts({
  isArrestLogsLoading,
  arrestLogsError,
  arrestLogs,
}: UseRenderChartsProps) {
  const chartsData = useMemo(() => {
    if (!arrestLogs)
      return {
        barChartData: null,
        pieChartData: null,
        lineChartData: null,
        doughnutChartData: null,
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

  const renderCharts = useCallback(() => {
    if (isArrestLogsLoading) return <p>Loading table...</p>;
    if (arrestLogsError) return <p>Error: {arrestLogsError.message}</p>;
    if (
      !chartsData.barChartData ||
      !chartsData.lineChartData ||
      !chartsData.pieChartData ||
      !chartsData.doughnutChartData ||
      !chartsData.barChartDataDegree ||
      !chartsData.barChartDataStreet ||
      !chartsData.lineChartDataChargeDescription
    )
      return <p>Error loading chart data...</p>;

    return (
      <Charts
        chartData={chartsData.barChartData}
        lineChartData={chartsData.lineChartData}
        lineChartDataChargeDescription={
          chartsData.lineChartDataChargeDescription
        }
        barChartDataDegree={chartsData.barChartDataDegree}
        barChartDataStreet={chartsData.barChartDataStreet}
        pieChartData={chartsData.pieChartData}
        doughnutChartData={chartsData.doughnutChartData}
      />
    );
  }, [isArrestLogsLoading, arrestLogsError, chartsData]);

  return { renderCharts };
}
