"use client";

import React, { useState } from "react";
import { useQueryBuilder } from "../api/queryBuilder"; // Adjust the import path
import { Header } from "@/components/header";
import { SelectColumnModal } from "@/components/data-table/select-column-modal";
import { Filter } from "@/components/map/filter";
//hooks
import { useRenderMap } from "@/hooks/map/useRenderMap";
import { useArrestLogSearch } from "@/hooks/data-table/useArrestLogSearch";
import { useRenderCharts } from "@/hooks/charts/useRenderCharts";
import { useRenderTable } from "@/hooks/data-table/useRenderTable";

import { HeaderSelect } from "@/types/header.interface";
import { CrimeFilterState } from "@/types/map.interface";
import { initialCrimeFilterState } from "@/lib/constants";

export default function Home() {
  //Table search
  const { searchArrestLogs, arrestLogSearchParams } = useArrestLogSearch();

  ////Map Filters
  const [crimeFilterState, setCrimeFilterState] = useState<CrimeFilterState>(
    initialCrimeFilterState
  );
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

  const { renderMap } = useRenderMap({
    isPoliceIncidentsLoading,
    policeIncidentsError,
    policeIncidents: policeIncidents?.features,
  });

  const { renderCharts } = useRenderCharts({
    isArrestLogsLoading,
    arrestLogsError,
    arrestLogs: arrestLogs?.features,
  });

  const { renderDataTable } = useRenderTable({
    isArrestLogsLoading,
    arrestLogsError,
    arrestLogs: arrestLogs?.features,
    arrestLogFields: arrestLogs?.fields,
    arrestLogCount: arrestLogs?.features.length,
  });

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
