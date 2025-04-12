"use client";

import React, { useState, useCallback, useMemo } from "react";

import { useQueryBuilder } from "../api/queryBuilder"; // Adjust the import path
import { Paginate } from "../components/paginate";

import { DataTable } from "../components/data-table";
import { Charts } from "../components/charts";
import { Header } from "@/components/header";
import { Map } from "@/components/map";
import { SelectColumnModal } from "@/components/arrest-logs/select-column-modal";
import { HeaderSelect } from "@/types/header.interface";
import { Filter } from "@/components/map/filter";

import {
  getBarChartData,
  getPieChartData,
  getLineChartData,
  getDoughnutChartData,
} from "@/utils/chartData";

import {
  initialCrimeFilterState,
  checkCrimeFilterState,
} from "@/lib/constants";
import { CrimeFilterState } from "@/types/map.interface";

export default function Home() {
  const [arrestLogSearchParams, setArrestLogSearchParams] = useState<
    Record<string, string | number>
  >({
    ArrestLocationStreet: "",
  });

  const searchArrestLogs = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, filter?: string) => {
      console.log("filter: ", filter);
      if (!filter) {
        alert("Please select a filter");
        return;
      }

      setArrestLogSearchParams((prev) => ({
        ...prev,
        ArrestLocationStreet: e.target.value, // No need for bracket notation here
      }));
    },
    []
  );

  ////Map Filters
  const [crimeFilterState, setCrimeFilterState] = useState<CrimeFilterState>(
    initialCrimeFilterState
  );

  const selectAllCriminalFilters = () => {
    setCrimeFilterState(checkCrimeFilterState);
  };

  const clearAllCriminalFilters = () => {
    setCrimeFilterState(initialCrimeFilterState);
  };

  const {
    data: arrestLogs,
    isLoading: isArrestLogsLoading,
    error: arrestLogsError,
  } = useQueryBuilder({
    searchParams: arrestLogSearchParams,
    filterParams: undefined,
    base_url: process.env.NEXT_PUBLIC_ARREST_LOG_URL,
    orderBy: "DATE_ARRESTED DESC",
  });

  const {
    data: policeIncidents,
    isLoading: isPoliceIncidentsLoading,
    error: policeIncidentsError,
  } = useQueryBuilder({
    searchParams: undefined,
    filterParams: crimeFilterState,
    base_url: process.env.NEXT_PUBLIC_POLICE_INCIDENT_URL,
    orderBy: "",
  });

  const [view, setView] = useState<HeaderSelect>("Map");
  const toggleView = (view: HeaderSelect) => setView(view);

  const renderMap = useCallback(() => {
    if (isPoliceIncidentsLoading) return <p>Loading map...</p>;
    if (policeIncidentsError)
      return <p>Error: {policeIncidentsError.message}</p>;

    return <Map policeIncidents={policeIncidents.features} />;
  }, [isPoliceIncidentsLoading, policeIncidentsError, policeIncidents]);

  const chartsData = useMemo(() => {
    if (!arrestLogs)
      return {
        barChartData: null,
        pieChartData: null,
        lineChartData: null,
        doughnutChartData: null,
      };

    return {
      barChartData: getBarChartData(arrestLogs.features, "AGE"),
      pieChartData: getPieChartData(arrestLogs.features, "SEX"),
      lineChartData: getLineChartData(arrestLogs.features, "RACE"),
      lineChartDataChargeDescription: getLineChartData(
        arrestLogs.features,
        "Charge_Description"
      ),
      barChartDataDegree: getBarChartData(arrestLogs.features, "Degree"),
      barChartDataStreet: getBarChartData(
        arrestLogs.features,
        "ArrestLocationStreet"
      ),
      doughnutChartData: getDoughnutChartData(arrestLogs.features, "RACE"),
    };
  }, [arrestLogs]);

  const renderCharts = useCallback(() => {
    if (isArrestLogsLoading) return <p>Loading table...</p>;
    if (arrestLogsError) return <p>Error: {arrestLogsError.message}</p>;
    if (
      !chartsData.barChartData ||
      !chartsData.lineChartData ||
      !chartsData.pieChartData ||
      !chartsData.doughnutChartData ||
      !chartsData.barChartDataDegree ||
      !chartsData.barChartDataStreet ||
      !chartsData.lineChartDataChargeDescription
    )
      return <p>Error loading chart data...</p>;

    return (
      <Charts
        chartData={chartsData.barChartData}
        lineChartData={chartsData.lineChartData}
        lineChartDataChargeDescription={
          chartsData.lineChartDataChargeDescription
        }
        barChartDataDegree={chartsData.barChartDataDegree}
        barChartDataStreet={chartsData.barChartDataStreet}
        pieChartData={chartsData.pieChartData}
        doughnutChartData={chartsData.doughnutChartData}
      />
    );
  }, [isArrestLogsLoading, arrestLogsError, chartsData]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const renderDataTable = useCallback(() => {
    if (isArrestLogsLoading) return <p>Loading table...</p>;
    if (arrestLogsError) return <p>Error: {arrestLogsError.message}</p>;

    const itemsPerPage = 12;
    const numOfPages = Math.ceil(arrestLogs.features.length / itemsPerPage);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const displayLogs = arrestLogs.features.slice(firstIndex, lastIndex);
    return (
      <>
        <DataTable
          arrestLogs={displayLogs}
          arrestLogFields={arrestLogs.fields}
        />
        <Paginate count={numOfPages} setCurrentPage={setCurrentPage} />
      </>
    );
  }, [isArrestLogsLoading, arrestLogsError, arrestLogs, currentPage]);

  const [selectColumns, setSelectColumns] = useState<boolean>(false);
  const openSelectColumns = () => {
    setSelectColumns(true);
  };
  const closeSelectColumns = () => {
    setSelectColumns(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header
        view={view}
        toggleView={toggleView}
        searchArrestLogs={searchArrestLogs}
        openSelectColumns={openSelectColumns}
      />
      <main className="flex flex-col gap-8 w-full">
        {selectColumns && (
          <SelectColumnModal
            handleClose={closeSelectColumns}
            arrestLogFields={arrestLogs.fields}
          />
        )}
        {view === "Map" && (
          <div className="flex w-full gap-4">
            <Filter
              crimeFilterState={crimeFilterState}
              setCrimeFilterState={setCrimeFilterState}
              checkAllCriminalFilters={selectAllCriminalFilters}
              clearAllCriminalFilters={clearAllCriminalFilters}
            />
            {renderMap()}
          </div>
        )}
        {view === "Table" && renderDataTable()}
        {view === "Chart" && renderCharts()}
      </main>
    </div>
  );
}
