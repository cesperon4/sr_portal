import React, { useMemo } from "react";
import { ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";
import { getMaxChartData, getMinChartData } from "@/utils/chartData";

interface EthnicityChartProps {
  doughnutChartData: ChartData<"doughnut">;
  lineChartData: ChartData<"line">;
  highestOccurringRace: [string, number][] | null;
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
}
export function EthnicityChart({
  doughnutChartData,
  //   lineChartData,
  highestOccurringRace,
  toggleChartModal,
}: EthnicityChartProps) {
  const highestArrestEthnicity = useMemo(() => {
    if (!doughnutChartData) return null;
    return getMaxChartData(doughnutChartData);
  }, [doughnutChartData]);

  const leastArrestedEthnicity = useMemo(() => {
    if (!doughnutChartData) return null;
    return getMinChartData(doughnutChartData);
  }, [doughnutChartData]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4">
        <div className="data-card">
          <h2>Highest Arrested Ethnicity</h2>

          {highestOccurringRace?.map((street, index) => {
            return (
              <span key={index}>{`${index + 1}. ${street[0]} - ${
                street[1]
              } arrests`}</span>
            );
          })}
        </div>

        <ChartCard
          title={"Ethnicity with Most Arrests"}
          stat={highestArrestEthnicity}
          color={"blue"}
        />

        <ChartCard
          title={"Ethnicity with Least Arrests"}
          stat={leastArrestedEthnicity}
          color={"green"}
        />
      </div>
      <div
        className="cursor-pointer h-[60vh]" // or h-full if inside a sized container
        onClick={() => {
          toggleChartModal(
            <div className="p-8 bg-white rounded">
              <Doughnut
                data={doughnutChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                className="w-full h-[50vh]"
              />
            </div>,
            "sm"
          );
        }}
      >
        <Doughnut
          data={doughnutChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
