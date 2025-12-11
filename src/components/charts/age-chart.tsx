import { type ChartsData } from "@/types/charts.interface";
import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";

import {
  getAverageArrestAgeBar,
  getMaxChartData,
  getOldestArrestAge,
  getYoungestArrestAge,
} from "@/utils/chartData";

interface AgeChartsProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
  chartData: ChartsData["barChartData"];
}
export default function AgeChart({
  toggleChartModal,
  chartData,
}: AgeChartsProps) {
  if (!chartData) return <div>loading...</div>;

  const averageArrestAge = getAverageArrestAgeBar(chartData);
  const youngestArrestAge = getYoungestArrestAge(chartData);
  const oldestArrestAge = getOldestArrestAge(chartData);
  const highestOccurringArrestAge = getMaxChartData(chartData);

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
              data={chartData}
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
          data={chartData}
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
