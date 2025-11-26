import React, { useState, Suspense } from "react";
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
import { initialSidebarState } from "@/lib/constants";

const AgeChart = React.lazy(() => import("./age-chart"));
const GenderChart = React.lazy(() => import("./gender-chart"));
const LocationChart = React.lazy(() => import("./location-chart"));
const EthnicityChart = React.lazy(() => import("./ethnicity-chart"));
const DegreeChart = React.lazy(() => import("./degree-chart"));
const ChargeChart = React.lazy(() => import("./charge-chart"));
const ChartModal = React.lazy(() => import("./chart-modal"));

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
          <Suspense fallback={<Loader text={"Fetching location data..."} />}>
            <LocationChart toggleChartModal={toggleChartModal} />
          </Suspense>
        )}

        {sidebarState["Ethnicity"] && (
          <Suspense fallback={<Loader text={"Fetching ethnicity data..."} />}>
            <EthnicityChart toggleChartModal={toggleChartModal} />
          </Suspense>
        )}
        {sidebarState["Degree"] && chartData.barChartDataDegree && (
          <Suspense fallback={<Loader text={"Fetching degree data..."} />}>
            <DegreeChart toggleChartModal={toggleChartModal} />
          </Suspense>
        )}
        {sidebarState["Charge"] && chartData.lineChartDataChargeDescription && (
          <Suspense fallback={<Loader text={"Fetching charge data..."} />}>
            <ChargeChart toggleChartModal={toggleChartModal} />
          </Suspense>
        )}

        {selectedChart.chart && (
          <Suspense fallback={<Loader text={"Fetching modal data..."} />}>
            <ChartModal chart={selectedChart} handleClose={toggleChartModal} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
