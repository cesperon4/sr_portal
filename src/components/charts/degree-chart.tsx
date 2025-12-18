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
    return <div className="rounded-2xl bg-white p-6 shadow-sm">Loading…</div>;
  }

  const highestArrestDegree = getMaxChartData(chartData);
  const leastArrestedDegree = getMinChartData(chartData);

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Arrests by Degree
        </h3>
        <span className="text-xs text-gray-500">Click chart to expand</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
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

      {/* Chart */}
      <div
        className="relative h-[260px] w-full rounded-xl border bg-gray-50 p-4 transition hover:shadow-md cursor-pointer"
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
    </div>
  );
}
