import {
  Table,
  TableBody,
  TableCaption,
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
  if (!chartData) return <div>loading...</div>;

  const highestArrestStreet = getHighestArrestStreetBar(chartData);
  const maxArrestStreet = getMaxChartData(chartData);
  const minArrestStreet = getMinChartData(chartData);

  return (
    <div className="flex gap-2 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 min-w-[250px]">
          {/* Card Title */}
          <h2 className="text-sm font-medium text-gray-600 mb-3">
            Location With Highest # of Arrests
          </h2>

          {/* Table wrapper for responsive scroll */}
          <div className="overflow-x-auto">
            <Table className="w-full table-auto border-collapse">
              <TableCaption className="sr-only">{""}</TableCaption>

              <TableHeader>
                <TableRow className="">
                  <TableHead className="text-left px-4 py-2 text-gray-500 text-sm">
                    Street Name
                  </TableHead>
                  <TableHead className="text-left px-4 py-2 text-gray-500 text-sm">
                    Total Arrests
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {highestArrestStreet?.map((street, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                  >
                    <TableCell className="px-4 py-2 text-gray-700 text-sm font-medium">
                      {street[0]}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-gray-700 text-sm font-medium">
                      {street[1]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <ChartCard
          title={"Street with Most Arrests"}
          stat={maxArrestStreet}
          color={"green"}
        />

        <ChartCard
          title={"Street with Least Arrests"}
          stat={minArrestStreet}
          color={"blue"}
        />
      </div>
      <div
        className="flex justify-center w-6/12 h-[60vh]"
        onClick={() => {
          toggleChartModal(
            <Bar
              data={chartData}
              options={{ responsive: true }}
              className="bg-white p-8 rounded" // Fixed height (adjust as needed)
              onClick={(e) => {
                e.stopPropagation();
              }}
            />,
            "lg"
          );
        }}
      >
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: false, // Hide grid lines
                },
                ticks: {
                  display: true, // Keep the labels visible
                },
              },
            },
          }}
          className="cursor-pointer h-full w-full"
        />
      </div>
    </div>
  );
}
