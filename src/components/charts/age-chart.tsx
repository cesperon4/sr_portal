import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";

import { useInsightContext } from "@/context/InsightContext";
import {
  getAverageArrestAgeBar,
  getYoungestArrestAge,
  getOldestArrestAge,
  getMaxChartData,
} from "@/utils/chartData";

interface AgeChartsProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
}
export default function AgeChart({ toggleChartModal }: AgeChartsProps) {
  const { chartData } = useInsightContext();
  if (!chartData.barChartData) return <div>loading...</div>;

  const averageArrestAge = getAverageArrestAgeBar(chartData.barChartData);
  const youngestArrestAge = getYoungestArrestAge(chartData.barChartData);
  const oldestArrestAge = getOldestArrestAge(chartData.barChartData);
  const highestOccurringArrestAge = getMaxChartData(chartData.barChartData);

  return (
    <div className="flex flex-col items-center mr-4">
      <div className="flex gap-4 h-[10vh]">
        <ChartCard
          title={"Youngest Arrest Age"}
          stat={youngestArrestAge}
          color={"blue"}
        />
        <ChartCard
          title={"Oldest Arrest Age"}
          stat={oldestArrestAge}
          color={"green"}
        />
        <ChartCard
          title={"Average Arrest Age"}
          stat={averageArrestAge}
          color={"orange"}
        />
        <ChartCard
          title={"Highest Occurring Arrest Age"}
          stat={highestOccurringArrestAge}
          color={"yellow"}
        />
      </div>

      <div
        className="rounded cursor-pointer w-6/12"
        onClick={() => {
          toggleChartModal(
            <Bar
              data={chartData.barChartData!}
              options={{
                responsive: true,
                scales: {
                  x: {
                    grid: {
                      display: false, // Hide grid lines
                    },
                    ticks: {
                      display: true, // Keep the labels visible
                    },
                  },
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />,
            "lg"
          );
        }}
      >
        <Bar
          data={chartData.barChartData}
          options={{
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: false, // Hide grid lines
                },
                ticks: {
                  display: true, // Keep the labels visible
                },
              },
            },
          }}
          className="cursor-pointer w-full mx-auto" // Fixed height (adjust as needed)
        />
      </div>
    </div>
  );
}
