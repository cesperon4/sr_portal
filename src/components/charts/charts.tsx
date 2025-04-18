import React, { useState, useMemo } from "react";
import { ChartData } from "chart.js";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { ChartModal } from "./chart-modal";

import {
  getAverageArrestAgeBar,
  getHighestArrestStreetBar,
  getHighestChargeDescriptionLine,
  getHighestRace,
} from "@/utils/chartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  chartData: ChartData<"bar">;
  lineChartData: ChartData<"line">;
  lineChartDataChargeDescription: ChartData<"line">;
  barChartDataDegree: ChartData<"bar">;
  barChartDataStreet: ChartData<"bar">;
  pieChartData: ChartData<"pie">;
  doughnutChartData: ChartData<"doughnut">;
}
export function Charts({
  chartData,
  lineChartData,
  lineChartDataChargeDescription,
  barChartDataDegree,
  pieChartData,
  doughnutChartData,
  barChartDataStreet,
}: ChartsProps) {
  const [selectedChart, setSelectedChart] = useState<{
    chart: React.ReactNode | null;
    size: "lg" | "sm";
  }>({ chart: null, size: "lg" });

  const toggleChartModal = (
    chart: React.ReactNode | null,
    size: "lg" | "sm"
  ) => {
    if (chart) {
      setSelectedChart((prev) => ({ ...prev, size, chart }));
    } else {
      setSelectedChart((prev) => ({ ...prev, chart: null }));
    }
  };

  const averageArrestAge = useMemo(() => {
    if (!chartData) return null;

    return getAverageArrestAgeBar(chartData);
  }, [chartData]);

  const highestArrestStreet = useMemo(() => {
    if (!barChartDataStreet) return null;

    return getHighestArrestStreetBar(barChartDataStreet);
  }, [barChartDataStreet]);

  const highestOccurringCharge = useMemo(() => {
    if (!lineChartDataChargeDescription) return null;

    return getHighestChargeDescriptionLine(lineChartDataChargeDescription);
  }, [lineChartDataChargeDescription]);

  const highestOccurringRace = useMemo(() => {
    if (!doughnutChartData) return null;

    return getHighestRace(doughnutChartData);
  }, [doughnutChartData]);

  return (
    <div className="shadow p-12 flex flex-col gap-4 font-sans">
      <div className="grid grid-cols-4 px-4 gap-4">
        <div className="shadow rounded flex flex-col justify-center items-center border-4 border-blue-50">
          <h2>Average Arrest Age</h2>
          <span>{averageArrestAge}</span>
        </div>
        <div className="shadow rounded p-4 flex flex-col gap-2 items-start border-4 border-green-50">
          <h2>Location With Highest # of Arrests</h2>
          {highestArrestStreet?.map((street, index) => {
            return (
              <span key={index}>{`${index + 1}. ${street[0]} - ${
                street[1]
              } arrests`}</span>
            );
          })}
        </div>
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
        <div className="shadow rounded p-4 flex flex-col gap-2 items-start border-4 border-orange-50">
          <h2>Highest Arrested Ethnicity</h2>

          {highestOccurringRace?.map((street, index) => {
            return (
              <span key={index}>{`${index + 1}. ${street[0]} - ${
                street[1]
              } arrests`}</span>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <div className="p-4 rounded flex flex-col justify-between">
          <div
            className="p-4 rounded shadow cursor-pointer"
            onClick={() => {
              toggleChartModal(
                <Pie
                  data={pieChartData}
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
            <Pie
              data={pieChartData}
              options={{ responsive: true }}
              className="bg-white cursor-pointer " // Fixed height (adjust as needed)
            />
          </div>

          <div
            className="p-4 rounded shadow cursor-pointer"
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
        </div>

        <div className="grid grid-cols-3 gap-8 w-full">
          <div
            className="p-4 rounded shadow cursor-pointer"
            onClick={() => {
              toggleChartModal(
                <Bar
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
            <Bar
              data={chartData}
              options={{ responsive: true }}
              className="bg-white cursor-pointer w-full h-80" // Fixed height (adjust as needed)
            />
          </div>

          <div
            className="p-4 rounded shadow"
            onClick={() => {
              toggleChartModal(
                <Bar
                  data={barChartDataDegree}
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
              data={barChartDataDegree}
              options={{ responsive: true }}
              className="bg-white cursor-pointer w-full h-80" // Fixed height (adjust as needed)
            />
          </div>
          <div
            className="p-4 rounded shadow"
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
              options={{ responsive: true }}
              className="bg-white cursor-pointer w-full h-80"
            />
          </div>
          <div
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
          </div>
          <div
            className="p-4 rounded shadow"
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

        {selectedChart.chart && (
          <ChartModal chart={selectedChart} handleClose={toggleChartModal} />
        )}
      </div>
    </div>
  );
}
