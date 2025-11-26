import React, { useState, useMemo, Suspense } from "react";
import { Sidebar } from "./sidebar";
import { Loader } from "../../components/ui/loader";
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

import { useInsightContext } from "@/context/InsightContext";

import { ChartModal } from "./chart-modal";
import { initialSidebarState } from "@/lib/constants";

import {
  getHighestChargeDescriptionLine,
  getHighestRace,
} from "@/utils/chartData";

const AgeChart = React.lazy(() => import("./age-chart"));
const GenderChart = React.lazy(() => import("./gender-chart"));
const LocationChart = React.lazy(() => import("./location-chart"));
const EthnicityChart = React.lazy(() => import("./ethnicity-chart"));
const DegreeChart = React.lazy(() => import("./degree-chart"));
const ChargeChart = React.lazy(() => import("./charge-chart"));

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

type Size = "lg" | "sm";

export default function Charts() {
  const { chartData } = useInsightContext();
  const [selectedChart, setSelectedChart] = useState<{
    chart: React.ReactNode | null;
    size: Size;
  }>({ chart: null, size: "lg" });

  const toggleChartModal = (chart: React.ReactNode | null, size: Size) => {
    if (chart) {
      setSelectedChart((prev) => ({ ...prev, size, chart }));
    } else {
      setSelectedChart((prev) => ({ ...prev, chart: null }));
    }
  };

  //Charge insights
  const highestOccurringCharge = useMemo(() => {
    if (!chartData.lineChartDataChargeDescription) return null;

    return getHighestChargeDescriptionLine(
      chartData.lineChartDataChargeDescription
    );
  }, [chartData.lineChartDataChargeDescription]);

  //Ethnicity insights
  const highestOccurringRace = useMemo(() => {
    if (!chartData.doughnutChartData) return null;

    return getHighestRace(chartData.doughnutChartData);
  }, [chartData.doughnutChartData]);

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
          <Suspense fallback={<Loader text={"Fetching age data..."} />}>
            <AgeChart toggleChartModal={toggleChartModal} />
          </Suspense>
        )}
        {sidebarState["Gender"] && chartData.pieChartData && (
          <Suspense fallback={<Loader text={"Fetching gender data..."} />}>
            <GenderChart
              pieChartData={chartData.pieChartData}
              toggleChartModal={toggleChartModal}
            />
          </Suspense>
        )}
        {sidebarState["Location"] && chartData.barChartDataStreet && (
          <Suspense fallback={<Loader text={"Fetching gender data..."} />}>
            <LocationChart toggleChartModal={toggleChartModal} />
          </Suspense>
        )}

        {sidebarState["Ethnicity"] && (
          <Suspense fallback={<Loader text={"Fetching gender data..."} />}>
            <EthnicityChart toggleChartModal={toggleChartModal} />
          </Suspense>
        )}
        {sidebarState["Degree"] && chartData.barChartDataDegree && (
          <DegreeChart
            barChartDataDegree={chartData.barChartDataDegree}
            toggleChartModal={toggleChartModal}
          />
        )}
        {sidebarState["Charge"] && chartData.lineChartDataChargeDescription && (
          <ChargeChart
            lineChartDataChargeDescription={
              chartData.lineChartDataChargeDescription
            }
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
