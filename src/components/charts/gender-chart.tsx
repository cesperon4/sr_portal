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
    return (
      <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 animate-pulse">
        <div className="h-5 w-40 rounded bg-gray-200 dark:bg-neutral-700 mb-4" />
        <div className="h-[200px] rounded-lg bg-gray-100 dark:bg-neutral-800" />
      </div>
    );
  }

  const highestGenderArrests = getMaxChartData(chartData);
  const lowestGenderArrests = getMinChartData(chartData);

  return (
    <article className="flex flex-col gap-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
      <header className="flex items-center justify-between gap-2">
        <h3 className="text-subheading text-gray-900 dark:text-white">
          Arrests by gender
        </h3>
        <span className="text-caption text-gray-500 dark:text-gray-400 shrink-0">Click to expand</span>
      </header>

      <div className="grid grid-cols-2 gap-3">
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

      <div className="rounded-xl border border-gray-100 dark:border-neutral-700 bg-gray-50/50 dark:bg-neutral-800/30 overflow-hidden">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow className="border-gray-100 dark:border-neutral-700 hover:bg-transparent">
              <TableHead className="text-label text-gray-500 dark:text-gray-400">Male</TableHead>
              <TableHead className="text-label text-gray-500 dark:text-gray-400">Female</TableHead>
              <TableHead className="text-label text-gray-500 dark:text-gray-400">Juvenile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chartData.datasets?.map((dataset, index) => (
              <TableRow key={index} className="border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/30">
                {dataset.data?.map((value, i) => (
                  <TableCell key={i} className="text-body-sm text-gray-700 dark:text-gray-300">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div
        className="relative h-[240px] w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50 p-4 cursor-pointer hover:bg-gray-100/80 dark:hover:bg-neutral-700/50 transition-colors"
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
    </article>
  );
}
