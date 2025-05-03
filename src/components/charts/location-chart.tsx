import React, { useMemo } from "react";
import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";

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

interface LocationChartProps {
  barChartDataStreet: ChartData<"bar">;
  highestArrestStreet: [string, number][] | null;
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
}
export function LocationChart({
  barChartDataStreet,
  highestArrestStreet,
  toggleChartModal,
}: LocationChartProps) {
  const maxArrestStreet = useMemo(() => {
    if (!barChartDataStreet) return null;
    return getMaxChartData(barChartDataStreet);
  }, [barChartDataStreet]);

  const minArrestStreet = useMemo(() => {
    if (!barChartDataStreet) return null;
    return getMinChartData(barChartDataStreet);
  }, [barChartDataStreet]);

  return (
    <div className="flex gap-2 w-full">
      <div className="flex flex-col gap-4 w-2/12">
        <div className="rounded p-4 flex flex-col gap-2 items-start ">
          <h2>Location With Highest # of Arrests</h2>
          <Table>
            <TableCaption>{""}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Street Name</TableHead>
                <TableHead>Total Arrests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {highestArrestStreet?.map((street, index) => {
                return (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <TableCell>{street[0]}</TableCell>
                    <TableCell>{street[1]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
        className="w-10/12 "
        onClick={() => {
          toggleChartModal(
            <Bar
              data={barChartDataStreet}
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
          data={barChartDataStreet}
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
          className="bg-white cursor-pointer w-full"
        />
      </div>
    </div>
  );
}
