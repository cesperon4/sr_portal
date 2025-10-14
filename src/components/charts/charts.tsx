import React, { useState, useMemo } from "react";
import { ChartData } from "chart.js";
import { Sidebar } from "./sidebar";

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

import { ChartModal } from "./chart-modal";
import { initialSidebarState } from "@/lib/constants";

import {
  getYoungestArrestAge,
  getOldestArrestAge,
  getAverageArrestAgeBar,
  getHighestArrestStreetBar,
  getHighestChargeDescriptionLine,
  getHighestRace,
  getMaxChartData,
} from "@/utils/chartData";

import { AgeCharts } from "./age-chart";
import { GenderChart } from "./gender-chart";
import { LocationChart } from "./location-chart";
import { EthnicityChart } from "./ethnicity-chart";
import { DegreeChart } from "./degree-chart";
import { ChargeChart } from "./charge-chart";

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

  //Age insights
  const averageArrestAge = useMemo(() => {
    if (!chartData) return null;

    return getAverageArrestAgeBar(chartData);
  }, [chartData]);

  const youngestArrestAge = useMemo(() => {
    if (!chartData) return null;
    return getYoungestArrestAge(chartData);
  }, [chartData]);

  const oldestArrestAge = useMemo(() => {
    if (!chartData) return null;
    return getOldestArrestAge(chartData);
  }, [chartData]);

  const highestOccurringArrestAge = useMemo(() => {
    if (!chartData) return null;

    return getMaxChartData(chartData);
  }, [chartData]);

  //Location insights
  const highestArrestStreet = useMemo(() => {
    if (!barChartDataStreet) return null;

    return getHighestArrestStreetBar(barChartDataStreet);
  }, [barChartDataStreet]);

  //Charge insights
  const highestOccurringCharge = useMemo(() => {
    if (!lineChartDataChargeDescription) return null;

    return getHighestChargeDescriptionLine(lineChartDataChargeDescription);
  }, [lineChartDataChargeDescription]);

  //Ethnicity insights
  const highestOccurringRace = useMemo(() => {
    if (!doughnutChartData) return null;

    return getHighestRace(doughnutChartData);
  }, [doughnutChartData]);

  //data insights sidebar
  const [sidebarState, setSidebarState] = useState({
    ...initialSidebarState,
    Age: true,
  });

  const getButtonClass = (key: keyof typeof initialSidebarState) => {
    return `px-24 text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md ${
      sidebarState[key] ? "bg-gray-100" : "bg-white"
    }`;
  };

  const updateSidebar = (key: keyof typeof initialSidebarState) => {
    const temp = { ...initialSidebarState, [key]: true };
    setSidebarState(temp);
  };

  return (
    <div className="flex gap-4 font-sans h-[60vh]">
      <Sidebar getButtonClass={getButtonClass} updateSidebar={updateSidebar} />
      <div className="w-full">
        {sidebarState["Age"] && (
          <AgeCharts
            youngestArrestAge={youngestArrestAge}
            oldestArrestAge={oldestArrestAge}
            averageArrestAge={averageArrestAge}
            highestOccurringArrestAge={highestOccurringArrestAge}
            chartData={chartData}
            toggleChartModal={toggleChartModal}
          />
        )}
        {sidebarState["Gender"] && (
          <GenderChart
            pieChartData={pieChartData}
            toggleChartModal={toggleChartModal}
          />
        )}

        {sidebarState["Location"] && (
          <LocationChart
            barChartDataStreet={barChartDataStreet}
            highestArrestStreet={highestArrestStreet}
            toggleChartModal={toggleChartModal}
          />
        )}

        {sidebarState["Ethnicity"] && (
          <EthnicityChart
            doughnutChartData={doughnutChartData}
            highestOccurringRace={highestOccurringRace}
            lineChartData={lineChartData}
            toggleChartModal={toggleChartModal}
          />
        )}
        {sidebarState["Degree"] && (
          <DegreeChart
            barChartDataDegree={barChartDataDegree}
            toggleChartModal={toggleChartModal}
          />
        )}
        {sidebarState["Charge"] && (
          <ChargeChart
            lineChartDataChargeDescription={lineChartDataChargeDescription}
            highestOccurringCharge={highestOccurringCharge}
            toggleChartModal={toggleChartModal}
          />
        )}

        {selectedChart.chart && (
          <ChartModal chart={selectedChart} handleClose={toggleChartModal} />
        )}
      </div>
    </div>
  );
}
