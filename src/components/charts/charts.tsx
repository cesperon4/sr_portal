"use client";

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
import { AlertCircle, BarChart3, MapPin, Scale, Users } from "lucide-react";

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

const CHART_SUSPENSE = (
  <div className="rounded-xl dark:rounded-3xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-neutral-900 p-6 animate-pulse">
    <div className="h-5 w-32 rounded bg-gray-200 dark:bg-white/10 mb-4" />
    <div className="h-[200px] rounded-lg dark:rounded-xl bg-gray-100 dark:bg-white/5" />
  </div>
);

const KPI_CARDS = [
  {
    key: "total",
    title: "Total Arrests",
    icon: BarChart3,
    color: "bg-blue-500",
  },
  {
    key: "locations",
    title: "Locations",
    icon: MapPin,
    color: "bg-blue-500",
  },
  {
    key: "genders",
    title: "Gender Categories",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    key: "charges",
    title: "Charge Types",
    icon: Scale,
    color: "bg-blue-500",
  },
] as const;

export default function Charts() {
  const { chartData, totalRecords, summary, isArrestLogsLoading, arrestLogsError } = useCharts();
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
    ["Arrest Logs"]: true,
  });

  const getButtonClass = (key: keyof typeof initialSidebarState) => {
    return `px-24 text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md ${
      sidebarState[key] ? "bg-gray-100" : "bg-white"
    }`;
  };

  const updateSidebar = (key: keyof typeof initialSidebarState) => {
    setSidebarState({ ...initialSidebarState, [key]: true });
  };

  if (isArrestLogsLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-black py-24 text-gray-900 dark:text-white">
        <Loader text="Loading insights…" />
        <p className="text-caption text-gray-500 dark:text-slate-400">Preparing chart data</p>
      </div>
    );
  }

  if (arrestLogsError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-50 dark:bg-black py-24 px-4 text-gray-900 dark:text-white">
        <div className="rounded-full bg-red-100 dark:bg-red-500/20 p-3">
          <AlertCircle className="size-8 text-red-600 dark:text-red-400" strokeWidth={1.5} />
        </div>
        <p className="text-body-sm font-semibold">Couldn’t load insights</p>
        <p className="text-caption text-gray-500 dark:text-slate-400 text-center max-w-sm">
          {arrestLogsError.message}
        </p>
      </div>
    );
  }

  const kpiValue = (key: (typeof KPI_CARDS)[number]["key"]) => {
    if (key === "total") return totalRecords;
    if (key === "locations") return summary?.locations ?? "—";
    if (key === "genders") return summary?.genders ?? "—";
    if (key === "charges") return summary?.charges ?? "—";
    return "—";
  };

  return (
    <div className="insights-dashboard min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-slate-100">
      <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-11 rounded-2xl bg-blue-50 dark:bg-blue-500 border border-blue-100 dark:border-0 shadow-sm dark:shadow-lg dark:shadow-blue-500/25">
              <BarChart3 className="size-5 text-blue-600 dark:text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-heading text-gray-900 dark:text-white">Data insights</h1>
              <p className="text-caption text-gray-500 dark:text-slate-400 mt-0.5">
                Arrest logs analytics · Click a chart to expand
              </p>
            </div>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_CARDS.map(({ key, title, icon: Icon, color }) => (
            <div
              key={key}
              className="flex items-center gap-4 rounded-2xl dark:rounded-3xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/[0.08] p-5 shadow-sm"
            >
              <div
                className={`flex items-center justify-center size-12 shrink-0 rounded-2xl ${color} shadow-sm dark:shadow-lg`}
              >
                <Icon className="size-6 text-white" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-caption text-gray-500 dark:text-slate-400 truncate">{title}</p>
                <p className="text-xl font-bold tabular-nums text-gray-900 dark:text-white truncate">
                  {kpiValue(key)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar
            variant="vision"
            getButtonClass={getButtonClass}
            updateSidebar={updateSidebar}
          />

        <main className="flex-1 min-w-0">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <Suspense fallback={CHART_SUSPENSE}>
              <LocationChart
                toggleChartModal={toggleChartModal}
                chartData={chartData.barChartDataStreet}
              />
            </Suspense>
            <Suspense fallback={CHART_SUSPENSE}>
              <GenderChart
                chartData={chartData.pieChartData}
                toggleChartModal={toggleChartModal}
              />
            </Suspense>
            <Suspense fallback={CHART_SUSPENSE}>
              <AgeChart
                toggleChartModal={toggleChartModal}
                chartData={chartData.barChartData}
              />
            </Suspense>
            <Suspense fallback={CHART_SUSPENSE}>
              <EthnicityChart
                toggleChartModal={toggleChartModal}
                chartData={chartData.doughnutChartData}
              />
            </Suspense>
            <Suspense fallback={CHART_SUSPENSE}>
              <DegreeChart
                toggleChartModal={toggleChartModal}
                chartData={chartData.barChartDataDegree}
              />
            </Suspense>
            <Suspense fallback={CHART_SUSPENSE}>
              <ChargeChart
                toggleChartModal={toggleChartModal}
                chartData={chartData.lineChartDataChargeDescription}
              />
            </Suspense>
          </div>
        </main>
      </div>

      {selectedChart.chart && (
        <Suspense fallback={null}>
          <ChartModal chart={selectedChart} handleClose={toggleChartModal} />
        </Suspense>
      )}
      </div>
    </div>
  );
}
