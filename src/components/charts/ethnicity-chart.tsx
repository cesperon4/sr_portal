import { type ChartsData } from "@/types/charts.interface";
import {
  getHighestRace,
  getMaxChartData,
  getMinChartData,
} from "@/utils/chartData";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";

interface EthnicityChartProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
  chartData: ChartsData["doughnutChartData"];
}
export default function EthnicityChart({
  toggleChartModal,
  chartData,
}: EthnicityChartProps) {
  if (!chartData) return <div>loading...</div>;

  const highestArrestEthnicity = getMaxChartData(chartData);
  const leastArrestedEthnicity = getMinChartData(chartData);
  const highestOccurringRace = getHighestRace(chartData);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 min-w-[250px]">
          <h2 className="text-sm font-medium text-gray-600 mb-3">
            Highest Arrested Ethnicity
          </h2>

          <ul className="space-y-1">
            {highestOccurringRace?.map((race, index) => (
              <li key={index} className="text-gray-700 text-sm font-medium">
                <span className="font-semibold">{index + 1}.</span> {race[0]} -{" "}
                {race[1]} arrests
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
                data={chartData}
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
          data={chartData}
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
