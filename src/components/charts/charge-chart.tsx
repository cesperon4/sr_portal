import { type ChartsData } from "@/types/charts.interface";
import {
  getHighestChargeDescriptionLine,
  getMaxChartData,
  getMinChartData,
} from "@/utils/chartData";
import React from "react";
import { Line } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";

interface ChargeChartProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
  chartData: ChartsData["lineChartDataChargeDescription"];
}

export default function ChargeChart({
  toggleChartModal,
  chartData,
}: ChargeChartProps) {
  if (!chartData) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 animate-pulse">
        <div className="h-5 w-40 rounded bg-gray-200 dark:bg-neutral-700 mb-4" />
        <div className="h-[200px] rounded-lg bg-gray-100 dark:bg-neutral-800" />
      </div>
    );
  }

  const highestChargeArrests = getMaxChartData(chartData);
  const leastChargeArrests = getMinChartData(chartData);
  const highestOccurringCharge = getHighestChargeDescriptionLine(chartData);

  return (
    <article className="flex flex-col gap-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm col-span-1 xl:col-span-2">
      <header className="flex items-center justify-between gap-2">
        <h3 className="text-subheading text-gray-900 dark:text-white">
          Arrests by charge
        </h3>
        <span className="text-caption text-gray-500 dark:text-gray-400 shrink-0">Click to expand</span>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-gray-100 dark:border-neutral-700 bg-gray-50/50 dark:bg-neutral-800/30 p-4">
            <h4 className="mb-3 text-label text-gray-600 dark:text-gray-400">
              Highest occurring charge
            </h4>
            <ul className="space-y-1.5">
              {highestOccurringCharge?.map((charge, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-2 text-body-sm text-gray-700 dark:text-gray-300"
                >
                  <span className="truncate">
                    <span className="font-semibold">{index + 1}.</span> {charge[0]}
                  </span>
                  <span className="text-caption shrink-0">{charge[1]}</span>
                </li>
              ))}
            </ul>
          </div>

          <ChartCard
            title="Charge with Most Arrests"
            stat={highestChargeArrests}
            color="blue"
          />
          <ChartCard
            title="Charge with Least Arrests"
            stat={leastChargeArrests}
            color="green"
          />
        </div>

        <div
          className="lg:col-span-2 relative h-[260px] rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50 p-4 cursor-pointer hover:bg-gray-100/80 dark:hover:bg-neutral-700/50 transition-colors"
          onClick={() =>
            toggleChartModal(
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />,
              "lg"
            )
          }
        >
          <Line
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
      </div>
    </article>
  );
}
