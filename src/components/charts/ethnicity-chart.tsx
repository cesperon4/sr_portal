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
    <div className="flex gap-8">
      <div className="flex flex-col gap-4 w-2/12">
        <div className="shadow rounded p-4 flex flex-col gap-2 items-start border-4 border-orange-50 ">
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
        className="p-4 cursor-pointer h-[80rem] w-10/12"
        onClick={() => {
          toggleChartModal(
            <Doughnut
              data={doughnutChartData}
              options={{ responsive: true }}
              className="bg-white p-8 rounded" // Fixed height (adjust as needed)
              onClick={(e) => {
                e.stopPropagation();
              }}
            />,
            "sm"
          );
        }}
      >
        <Doughnut
          data={doughnutChartData}
          options={{ responsive: true }}
          className="bg-white cursor-pointer " // Fixed height (adjust as needed)
        />
      </div>
      {/* <div
        className="p-4 rounded shadow"
        onClick={() => {
          toggleChartModal(
            <Line
              data={lineChartData}
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
          data={lineChartData}
          options={{ responsive: true }}
          className="bg-white cursor-pointer w-full h-80" // Fixed height (adjust as needed)
        />
      </div> */}
    </div>
  );
}
