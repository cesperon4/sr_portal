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
    return (
      <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 animate-pulse">
        <div className="h-5 w-40 rounded bg-gray-200 dark:bg-neutral-700 mb-4" />
        <div className="h-[200px] rounded-lg bg-gray-100 dark:bg-neutral-800" />
      </div>
    );
  }

  const averageArrestAge = getAverageArrestAgeBar(chartData);
  const youngestArrestAge = getYoungestArrestAge(chartData);
  const oldestArrestAge = getOldestArrestAge(chartData);
  const highestOccurringArrestAge = getMaxChartData(chartData);

  return (
    <article className="flex flex-col gap-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
      <header className="flex items-center justify-between gap-2">
        <h3 className="text-subheading text-gray-900 dark:text-white">
          Age distribution
        </h3>
        <span className="text-caption text-gray-500 dark:text-gray-400 shrink-0">Click to expand</span>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ChartCard title="Youngest" stat={youngestArrestAge} color="blue" />
        <ChartCard title="Oldest" stat={oldestArrestAge} color="green" />
        <ChartCard title="Average" stat={averageArrestAge} color="orange" />
        <ChartCard
          title="Most Common"
          stat={highestOccurringArrestAge}
          color="yellow"
        />
      </div>

      <div
        className="relative h-[240px] w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50 p-4 cursor-pointer hover:bg-gray-100/80 dark:hover:bg-neutral-700/50 transition-colors"
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
    </article>
  );
}
