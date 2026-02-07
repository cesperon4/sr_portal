import { ChartsData } from "@/types/charts.interface";
import { getMaxChartData, getMinChartData } from "@/utils/chartData";
import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";

interface DegreeChartProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
  chartData: ChartsData["barChartDataDegree"];
}

export default function DegreeChart({
  toggleChartModal,
  chartData,
}: DegreeChartProps) {
  if (!chartData) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 animate-pulse">
        <div className="h-5 w-40 rounded bg-gray-200 dark:bg-neutral-700 mb-4" />
        <div className="h-[200px] rounded-lg bg-gray-100 dark:bg-neutral-800" />
      </div>
    );
  }

  const highestArrestDegree = getMaxChartData(chartData);
  const leastArrestedDegree = getMinChartData(chartData);

  return (
    <article className="flex flex-col gap-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
      <header className="flex items-center justify-between gap-2">
        <h3 className="text-subheading text-gray-900 dark:text-white">
          Arrests by degree
        </h3>
        <span className="text-caption text-gray-500 dark:text-gray-400 shrink-0">Click to expand</span>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard
          title="Degree with Most Arrests"
          stat={highestArrestDegree}
          color="blue"
        />
        <ChartCard
          title="Degree with Least Arrests"
          stat={leastArrestedDegree}
          color="green"
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
                scales: {
                  x: {
                    grid: { display: false },
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
                ticks: { color: "#4B5563" },
              },
              y: {
                ticks: { color: "#4B5563" },
              },
            },
            plugins: {
              tooltip: {
                backgroundColor: "#111827",
                titleFont: { size: 13 },
                bodyFont: { size: 12 },
                padding: 10,
              },
            },
          }}
        />
      </div>
    </article>
  );
}
