import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type ChartsData } from "@/types/charts.interface";
import { getMaxChartData, getMinChartData } from "@/utils/chartData";
import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";

interface GenderChartProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
  chartData: ChartsData["pieChartData"];
}

export default function GenderChart({
  toggleChartModal,
  chartData,
}: GenderChartProps) {
  if (!chartData) {
    return <div className="rounded-2xl bg-white p-6 shadow-sm">Loading…</div>;
  }

  const highestGenderArrests = getMaxChartData(chartData);
  const lowestGenderArrests = getMinChartData(chartData);

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Arrests by Gender
        </h3>
        <span className="text-xs text-gray-500">Click chart to expand</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <ChartCard
          title="Highest Arrests"
          stat={highestGenderArrests}
          color="blue"
        />
        <ChartCard
          title="Lowest Arrests"
          stat={lowestGenderArrests}
          color="green"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-gray-50 p-4">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-500 text-sm">Male</TableHead>
              <TableHead className="text-gray-500 text-sm">Female</TableHead>
              <TableHead className="text-gray-500 text-sm">Juvenile</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {chartData.datasets?.map((dataset, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                {dataset.data?.map((value, i) => (
                  <TableCell
                    key={i}
                    className="text-sm font-medium text-gray-700"
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Chart */}
      <div
        className="relative h-[260px] w-full rounded-xl border bg-gray-50 p-4 transition hover:shadow-md cursor-pointer"
        onClick={() =>
          toggleChartModal(
            <Pie
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
        <Pie
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
