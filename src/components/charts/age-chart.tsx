import React from "react";
import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";

interface AgeChartsProps {
  youngestArrestAge: number | null;
  oldestArrestAge: number | null;
  averageArrestAge: number | null;
  highestOccurringArrestAge: number | string | null;
  chartData: ChartData<"bar">;
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
}
export function AgeCharts({
  youngestArrestAge,
  oldestArrestAge,
  averageArrestAge,
  highestOccurringArrestAge,
  chartData,
  toggleChartModal,
}: AgeChartsProps) {
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
        className="rounded cursor-pointer w-full h-[50vh]"
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
