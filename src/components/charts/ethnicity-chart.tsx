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
    return <div className="rounded-2xl bg-white p-6 shadow-sm">Loading…</div>;
  }

  const highestArrestEthnicity = getMaxChartData(chartData);
  const leastArrestedEthnicity = getMinChartData(chartData);
  const highestOccurringRace = getHighestRace(chartData);

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Arrests by Ethnicity
        </h3>
        <span className="text-xs text-gray-500">Click chart to expand</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
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

      {/* Top Ethnicities List */}
      <div className="rounded-xl border bg-gray-50 p-4">
        <h4 className="mb-3 text-sm font-medium text-gray-600">
          Highest Arrested Ethnicities
        </h4>

        <ul className="space-y-2">
          {highestOccurringRace?.map(([race, count], index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm text-gray-700 shadow-sm"
            >
              <span className="font-medium">
                {index + 1}. {race}
              </span>
              <span className="text-gray-500">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chart */}
      <div
        className="relative h-[260px] w-full rounded-xl border bg-gray-50 p-4 transition hover:shadow-md cursor-pointer"
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
    </div>
  );
}
