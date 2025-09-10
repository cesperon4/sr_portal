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
    <div className="flex gap-8">
      <div className="w-2/12 flex flex-col gap-4">
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
        className="rounded cursor-pointer h-240 w-full"
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
          className="cursor-pointer w-full" // Fixed height (adjust as needed)
        />
      </div>
    </div>
  );
}
