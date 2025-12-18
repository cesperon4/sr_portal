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
  if (!chartData) {
    return <div className="rounded-2xl bg-white p-6 shadow-sm">Loading…</div>;
  }

  const averageArrestAge = getAverageArrestAgeBar(chartData);
  const youngestArrestAge = getYoungestArrestAge(chartData);
  const oldestArrestAge = getOldestArrestAge(chartData);
  const highestOccurringArrestAge = getMaxChartData(chartData);

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Arrest Age Distribution
        </h3>
        <span className="text-xs text-gray-500">Click chart to expand</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <ChartCard title="Youngest" stat={youngestArrestAge} color="blue" />
        <ChartCard title="Oldest" stat={oldestArrestAge} color="green" />
        <ChartCard title="Average" stat={averageArrestAge} color="orange" />
        <ChartCard
          title="Most Common"
          stat={highestOccurringArrestAge}
          color="yellow"
        />
      </div>

      {/* Chart */}
      <div
        className="relative h-[260px] w-full rounded-xl border bg-gray-50 p-4 transition hover:shadow-md cursor-pointer"
        onClick={() =>
          toggleChartModal(
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: { display: false },
                  },
                  y: {
                    grid: { color: "rgba(0,0,0,0.05)" },
                  },
                },
              }}
            />,
            "lg"
          )
        }
      >
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: { display: false },
              },
              y: {
                grid: { color: "rgba(0,0,0,0.05)" },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
