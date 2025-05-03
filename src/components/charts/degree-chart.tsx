import React, { useMemo } from "react";
import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getMaxChartData, getMinChartData } from "@/utils/chartData";
import { ChartCard } from "../ui/chart-card";

interface DegreeChartProps {
  barChartDataDegree: ChartData<"bar">;
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
}
export function DegreeChart({
  barChartDataDegree,
  toggleChartModal,
}: DegreeChartProps) {
  const highestArrestDegree = useMemo(() => {
    if (!barChartDataDegree) return null;
    return getMaxChartData(barChartDataDegree);
  }, [barChartDataDegree]);

  const leastArrestedDegree = useMemo(() => {
    if (!barChartDataDegree) return null;
    return getMinChartData(barChartDataDegree);
  }, [barChartDataDegree]);
  return (
    <div className="flex gap-8">
      <div className="flex flex-col w-2/12">
        <div className="flex flex-col gap-2">
          <ChartCard
            title={"Degree with Most Arrests"}
            stat={highestArrestDegree}
            color={"blue"}
          />
          <ChartCard
            title={"Degree with Least Arrests"}
            stat={leastArrestedDegree}
            color={"green"}
          />
        </div>
      </div>
      <div
        className="p-4 rounded w-10/12"
        onClick={() => {
          toggleChartModal(
            <Bar
              data={barChartDataDegree}
              options={{ responsive: true }}
              className="bg-white p-8 rounded" // Fixed height (adjust as needed)
              onClick={(e) => {
                e.stopPropagation();
              }}
            />,
            "lg"
          );
        }}
      >
        <Bar
          data={barChartDataDegree}
          options={{ responsive: true }}
          className="bg-white cursor-pointer w-full h-80" // Fixed height (adjust as needed)
        />
      </div>
    </div>
  );
}
