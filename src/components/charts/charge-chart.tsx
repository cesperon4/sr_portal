import React, { useMemo } from "react";
import { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";

import { getMaxChartData, getMinChartData } from "@/utils/chartData";
import { ChartCard } from "../ui/chart-card";

interface ChargeChartProps {
  lineChartDataChargeDescription: ChartData<"line">;
  highestOccurringCharge: [string, number][] | null;
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
}
export function ChargeChart({
  lineChartDataChargeDescription,
  highestOccurringCharge,
  toggleChartModal,
}: ChargeChartProps) {
  const highestChargeArrests = useMemo(() => {
    if (!lineChartDataChargeDescription) return null;
    return getMaxChartData(lineChartDataChargeDescription);
  }, [lineChartDataChargeDescription]);
  const leastChargeArrests = useMemo(() => {
    if (!lineChartDataChargeDescription) return null;
    return getMinChartData(lineChartDataChargeDescription);
  }, [lineChartDataChargeDescription]);
  return (
    <div className="flex">
      <div className="flex flex-col gap-4">
      <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 min-w-[250px]">
        {/* Card Title */}
        <h2 className="text-sm font-medium text-gray-600 mb-3">Highest Occurring Charge</h2>

        {/* List of Charges */}
        <ul className="space-y-1">
          {highestOccurringCharge?.map((charge, index) => (
            <li
              key={index}
              className="flex justify-between text-gray-700 text-sm font-medium"
            >
              <span className="truncate">
                <span className="font-semibold">{index + 1}.</span> {charge[0]}
              </span>
              <span className="text-gray-500">{charge[1]} arrests</span>
            </li>
          ))}
        </ul>
      </div>


        <ChartCard
          title={"Charge with Most Arrests"}
          stat={highestChargeArrests}
          color={"blue"}
        />
        <ChartCard
          title={"Charge with Least Arrests"}
          stat={leastChargeArrests}
          color={"green"}
        />
      </div>
      <div
        className="full h-[60vh] mr-4"
        onClick={() => {
          toggleChartModal(
            <Line
              data={lineChartDataChargeDescription}
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
        <Line
          data={lineChartDataChargeDescription}
          options={{ responsive: true }}
          className="bg-white cursor-pointer w-full h-full" // Fixed height (adjust as needed)
        />
      </div>
    </div>
  );
}
