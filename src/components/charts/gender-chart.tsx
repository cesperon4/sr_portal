import React, { useMemo } from "react";

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

interface GenderChartProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
  pieChartData: ChartData<"pie">;
}
export function GenderChart({
  toggleChartModal,
  pieChartData,
}: GenderChartProps) {
  const highestGenderArrests = useMemo(() => {
    if (!pieChartData) return null;
    return getMaxChartData(pieChartData);
  }, [pieChartData]);

  const lowestGenderArrests = useMemo(() => {
    if (!pieChartData) return null;
    return getMinChartData(pieChartData);
  }, [pieChartData]);

  return (
    <div className="h-320 flex gap-12">
      <div className="flex flex-col w-2/12 gap-4">
        <div className="rounded p-4 flex flex-col gap-2 items-start ">
          <h2>Arrests by Gender</h2>
          <Table>
            <TableCaption>{""}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Male</TableHead>
                <TableHead>Female</TableHead>
                <TableHead>Juvenile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pieChartData.datasets?.map((dataset, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  {dataset.data?.map((data, index) => (
                    <TableCell key={index}>{data}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        className="p-4 rounded cursor-pointer w-10/12 "
        onClick={() => {
          toggleChartModal(
            <Pie
              data={pieChartData}
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
        <div className="h-250">
          <Pie
            data={pieChartData}
            options={{ responsive: true }}
            className="bg-white cursor-pointer" // Fixed height (adjust as needed)
          />
        </div>
      </div>
    </div>
  );
}
