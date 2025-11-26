import React from "react";
import { Bar } from "react-chartjs-2";
import { getMaxChartData, getMinChartData } from "@/utils/chartData";
import { ChartCard } from "../ui/chart-card";
import { useInsightContext } from "@/context/InsightContext";

interface DegreeChartProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
}
export default function DegreeChart({ toggleChartModal }: DegreeChartProps) {
  const { chartData } = useInsightContext();

  if (!chartData.barChartDataDegree)
    return <div>loading bar chart data degree...</div>;

  const highestArrestDegree = getMaxChartData(chartData.barChartDataDegree);
  const leastArrestedDegree = getMinChartData(chartData.barChartDataDegree);

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
        className="p-4 rounded h-[52vh] w-6/12 cursor-pointer"
        onClick={() => {
          toggleChartModal(
            <Bar
              data={chartData.barChartDataDegree!}
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
          data={chartData.barChartDataDegree}
          options={{ responsive: true }}
          className="bg-white cursor-pointer w-full mx-auto" // Fixed height (adjust as needed)
        />
      </div>
    </div>
  );
}
