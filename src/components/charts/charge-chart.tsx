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
    <div className="flex gap-8">
      <div className="flex flex-col gap-4 w-2/12">
        <div className="shadow rounded p-4 flex flex-col gap-2 items-start border-4 border-red-50">
          <h2>Highest Ocurring Charge</h2>

          {highestOccurringCharge?.map((street, index) => {
            return (
              <span key={index}>{`${index + 1}. ${street[0]} - ${
                street[1]
              } arrests`}</span>
            );
          })}
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
        className="w-10/12"
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
          className="bg-white cursor-pointer w-full h-80" // Fixed height (adjust as needed)
        />
      </div>
    </div>
  );
}
