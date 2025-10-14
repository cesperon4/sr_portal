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
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex h-[8vh]">
        <div className="flex gap-4">
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
        className="p-4 rounded h-[52vh] w-full cursor-pointer"
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
          className="bg-white cursor-pointer w-full mx-auto" // Fixed height (adjust as needed)
        />
      </div>
    </div>
  );
}
