import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { Suspense, useState } from "react";
import { Loader } from "../../components/ui/loader";
import { Sidebar } from "./sidebar";

import { useCharts } from "@/hooks/charts/useCharts";
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
  const { chartData, isArrestLogsLoading, arrestLogsError } = useCharts();
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

  if (isArrestLogsLoading) {
    return <Loader text={"Loading charts..."} />;
  }

  if (arrestLogsError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">
          Error loading charts: {arrestLogsError.message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 font-sans h-[60vh]">
      <Sidebar getButtonClass={getButtonClass} updateSidebar={updateSidebar} />
      <div className="w-full">
        {sidebarState["Age"] && (
          <Suspense fallback={<Loader text={"Loading Age Chart..."} />}>
            <AgeChart
              toggleChartModal={toggleChartModal}
              chartData={chartData.barChartData}
            />
          </Suspense>
        )}
        {sidebarState["Gender"] && (
          <Suspense fallback={<Loader text={"Loading Gender Chart..."} />}>
            <GenderChart
              chartData={chartData.pieChartData}
              toggleChartModal={toggleChartModal}
            />
          </Suspense>
        )}
        {sidebarState["Location"] && (
          <Suspense fallback={<Loader text={"Loading Location Chart..."} />}>
            <LocationChart
              toggleChartModal={toggleChartModal}
              chartData={chartData.barChartDataStreet}
            />
          </Suspense>
        )}

        {sidebarState["Ethnicity"] && (
          <Suspense fallback={<Loader text={"Loading Ethnicity Chart..."} />}>
            <EthnicityChart
              toggleChartModal={toggleChartModal}
              chartData={chartData.doughnutChartData}
            />
          </Suspense>
        )}
        {sidebarState["Degree"] && (
          <Suspense fallback={<Loader text={"Loading Degree Chart..."} />}>
            <DegreeChart
              toggleChartModal={toggleChartModal}
              chartData={chartData.barChartDataDegree}
            />
          </Suspense>
        )}
        {sidebarState["Charge"] && chartData.lineChartDataChargeDescription && (
          <Suspense fallback={<Loader text={"Loading Charge Chart..."} />}>
            <ChargeChart
              toggleChartModal={toggleChartModal}
              chartData={chartData.lineChartDataChargeDescription}
            />
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
