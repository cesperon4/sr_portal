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
      <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 min-w-[250px]">
        {/* Card Title */}
        <h2 className="text-sm font-medium text-gray-600 mb-3">Highest Arrested Ethnicity</h2>

        {/* List of results */}
        <ul className="space-y-1">
          {highestOccurringRace?.map((race, index) => (
            <li
              key={index}
              className="text-gray-700 text-sm font-medium"
            >
              <span className="font-semibold">{index + 1}.</span> {race[0]} - {race[1]} arrests
            </li>
          ))}
        </ul>
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
