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
        <div className="data-card">
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
