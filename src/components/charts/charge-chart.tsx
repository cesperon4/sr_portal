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
  if (!chartData) return <div>loading...</div>;

  const highestChargeArrests = getMaxChartData(chartData);
  const leastChargeArrests = getMinChartData(chartData);
  const highestOccurringCharge = getHighestChargeDescriptionLine(chartData);
  return (
    <div className="flex">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 min-w-[250px]">
          <h2 className="text-sm font-medium text-gray-600 mb-3">
            Highest Occurring Charge
          </h2>

          <ul className="space-y-1">
            {highestOccurringCharge?.map((charge, index) => (
              <li
                key={index}
                className="flex justify-between text-gray-700 text-sm font-medium"
              >
                <span className="truncate">
                  <span className="font-semibold">{index + 1}.</span>{" "}
                  {charge[0]}
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
        <Line
          data={chartData}
          options={{ responsive: true }}
          className="bg-white cursor-pointer w-full h-full" // Fixed height (adjust as needed)
        />
      </div>
    </div>
  );
}
