import { type ChartsData } from "@/types/charts.interface";
import {
  getHighestRace,
  getMaxChartData,
  getMinChartData,
} from "@/utils/chartData";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";

interface EthnicityChartProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
  chartData: ChartsData["doughnutChartData"];
}

export default function EthnicityChart({
  toggleChartModal,
  chartData,
}: EthnicityChartProps) {
  if (!chartData) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 animate-pulse">
        <div className="h-5 w-40 rounded bg-gray-200 dark:bg-neutral-700 mb-4" />
        <div className="h-[200px] rounded-lg bg-gray-100 dark:bg-neutral-800" />
      </div>
    );
  }

  const highestArrestEthnicity = getMaxChartData(chartData);
  const leastArrestedEthnicity = getMinChartData(chartData);
  const highestOccurringRace = getHighestRace(chartData);

  return (
    <article className="flex flex-col gap-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
      <header className="flex items-center justify-between gap-2">
        <h3 className="text-subheading text-gray-900 dark:text-white">
          Arrests by ethnicity
        </h3>
        <span className="text-caption text-gray-500 dark:text-gray-400 shrink-0">Click to expand</span>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard
          title="Ethnicity with Most Arrests"
          stat={highestArrestEthnicity}
          color="blue"
        />
        <ChartCard
          title="Ethnicity with Least Arrests"
          stat={leastArrestedEthnicity}
          color="green"
        />
      </div>

      <div className="rounded-xl border border-gray-100 dark:border-neutral-700 bg-gray-50/50 dark:bg-neutral-800/30 p-4">
        <h4 className="mb-3 text-label text-gray-600 dark:text-gray-400">
          Highest arrested ethnicities
        </h4>
        <ul className="space-y-1.5">
          {highestOccurringRace?.map(([race, count], index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-lg bg-white dark:bg-neutral-800/50 px-3 py-2 text-body-sm text-gray-700 dark:text-gray-300"
            >
              <span className="font-medium truncate">
                {index + 1}. {race}
              </span>
              <span className="text-caption shrink-0 ml-2">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="relative h-[240px] w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50 p-4 cursor-pointer hover:bg-gray-100/80 dark:hover:bg-neutral-700/50 transition-colors"
        onClick={() =>
          toggleChartModal(
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />,
            "sm"
          )
        }
      >
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  font: { size: 12 },
                  color: "#4B5563",
                },
              },
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
