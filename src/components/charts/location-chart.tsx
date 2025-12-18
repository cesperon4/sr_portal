import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartsData } from "@/types/charts.interface";
import {
  getHighestArrestStreetBar,
  getMaxChartData,
  getMinChartData,
} from "@/utils/chartData";
import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";

interface LocationChartProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
  chartData: ChartsData["barChartDataStreet"];
}

export default function LocationChart({
  toggleChartModal,
  chartData,
}: LocationChartProps) {
  if (!chartData) {
    return <div className="rounded-2xl bg-white p-6 shadow-sm">Loading…</div>;
  }

  const highestArrestStreet = getHighestArrestStreetBar(chartData);
  const maxArrestStreet = getMaxChartData(chartData);
  const minArrestStreet = getMinChartData(chartData);

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Arrests by Location
        </h3>
        <span className="text-xs text-gray-500">Click chart to expand</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <ChartCard
          title="Street with Most Arrests"
          stat={maxArrestStreet}
          color="green"
        />
        <ChartCard
          title="Street with Least Arrests"
          stat={minArrestStreet}
          color="blue"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-gray-50 p-4">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-500 text-sm">
                Street Name
              </TableHead>
              <TableHead className="text-gray-500 text-sm">
                Total Arrests
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {highestArrestStreet?.map(([street, total], index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell className="text-sm font-medium text-gray-700">
                  {street}
                </TableCell>
                <TableCell className="text-sm font-medium text-gray-700">
                  {total}
                </TableCell>
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
