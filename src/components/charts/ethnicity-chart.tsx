import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartCard } from "../ui/chart-card";
import { getMaxChartData, getMinChartData } from "@/utils/chartData";
import { useInsightContext } from "@/context/InsightContext";
import { getHighestRace } from "@/utils/chartData";

interface EthnicityChartProps {
  toggleChartModal: (chart: React.ReactNode | null, size: "sm" | "lg") => void;
}
export default function EthnicityChart({
  toggleChartModal,
}: EthnicityChartProps) {
  const { chartData } = useInsightContext();

  if (!chartData.doughnutChartData || !chartData.lineChartDataChargeDescription)
    return <div>loading...</div>;

  const highestArrestEthnicity = getMaxChartData(chartData.doughnutChartData);
  const leastArrestedEthnicity = getMinChartData(chartData.doughnutChartData);
  const highestOccurringCharge = getHighestRace(chartData.doughnutChartData);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 min-w-[250px]">
          {/* Card Title */}
          <h2 className="text-sm font-medium text-gray-600 mb-3">
            Highest Arrested Ethnicity
          </h2>

          {/* List of results */}
          <ul className="space-y-1">
            {highestOccurringCharge?.map((race, index) => (
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
                data={chartData.doughnutChartData!}
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
          data={chartData.doughnutChartData}
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
