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
    return <div className="rounded-2xl bg-white p-6 shadow-sm">Loading…</div>;
  }

  const highestChargeArrests = getMaxChartData(chartData);
  const leastChargeArrests = getMinChartData(chartData);
  const highestOccurringCharge = getHighestChargeDescriptionLine(chartData);

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Arrests by Charge
        </h3>
        <span className="text-xs text-gray-500">Click chart to expand</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          {/* Highest occurring charge */}
          <div className="rounded-xl border bg-gray-50 p-4">
            <h4 className="mb-3 text-sm font-medium text-gray-600">
              Highest Occurring Charge
            </h4>

            <ul className="space-y-1">
              {highestOccurringCharge?.map((charge, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-2 text-sm text-gray-700"
                >
                  <span className="truncate">
                    <span className="font-semibold">{index + 1}.</span>{" "}
                    {charge[0]}
                  </span>
                  <span className="shrink-0 text-gray-500">{charge[1]}</span>
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

        {/* Chart */}
        <div
          className="lg:col-span-2 relative h-[280px] rounded-xl border bg-gray-50 p-4 transition hover:shadow-md cursor-pointer"
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
    </div>
  );
}
