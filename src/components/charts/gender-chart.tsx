import React from "react";
import { ChartCard } from "../ui/chart-card";
import { ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getMaxChartData, getMinChartData } from "@/utils/chartData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInsightContext } from "@/context/InsightContext";

interface GenderChartProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
  pieChartData: ChartData<"pie">;
}
export default function GenderChart({ toggleChartModal }: GenderChartProps) {
  const { chartData } = useInsightContext();
  if (!chartData.pieChartData) return <div>loading...</div>;

  const highestGenderArrests = getMaxChartData(chartData.pieChartData);
  const lowestGenderArrests = getMinChartData(chartData.pieChartData);

  return (
    <div className="flex justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-4 h-[60vh]">
        <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 min-w-[250px]">
          {/* Card Title */}
          <h2 className="text-sm font-medium text-gray-600 mb-3">
            Arrests by Gender
          </h2>

          {/* Table wrapper for scroll on small screens */}
          <div className="overflow-x-auto">
            <Table className="w-full table-auto border-collapse">
              <TableCaption className="sr-only">{""}</TableCaption>

              {/* Table Header */}
              <TableHeader>
                <TableRow className="">
                  <TableHead className="text-left px-4 py-2 text-gray-500 text-sm">
                    Male
                  </TableHead>
                  <TableHead className="text-left px-4 py-2 text-gray-500 text-sm">
                    Female
                  </TableHead>
                  <TableHead className="text-left px-4 py-2 text-gray-500 text-sm">
                    Juvenile
                  </TableHead>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody>
                {chartData.pieChartData.datasets?.map((dataset, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                  >
                    {dataset.data?.map((data, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className="px-4 py-2 text-gray-700 text-sm font-medium"
                      >
                        {data}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="chart-cards flex flex-col gap-4">
          <ChartCard
            title={"Gender With Highest Number of Arrests"}
            stat={highestGenderArrests}
            color={"blue"}
          />
          <ChartCard
            title={"Gender With Lowest Number of Arrests"}
            stat={lowestGenderArrests}
            color={"green"}
          />
        </div>
      </div>
      <div
        className="p-4 rounded cursor-pointer h-[60vh]"
        onClick={() => {
          toggleChartModal(
            <Pie
              data={chartData.pieChartData!}
              options={{ responsive: true }}
              className="bg-white rounded" // Fixed height (adjust as needed)
              onClick={(e) => {
                e.stopPropagation();
              }}
            />,
            "sm"
          );
        }}
      >
        <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 min-w-[250px]">
          <h2 className="text-sm font-medium text-gray-600 mb-3">
            Arrests by Category
          </h2>
          <div className="w-full h-[400px] flex items-center justify-center">
            <Pie
              data={chartData.pieChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      font: { size: 12 },
                      color: "#4B5563", // Tailwind gray-700
                    },
                  },
                  tooltip: {
                    backgroundColor: "#111827", // Tailwind gray-900
                    titleFont: { size: 13 },
                    bodyFont: { size: 12 },
                    padding: 10,
                  },
                },
              }}
              className="!w-full !h-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
