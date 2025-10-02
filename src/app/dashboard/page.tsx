"use client";

import React, { useState, useEffect } from "react";
import { useQueryBuilder } from "../../api/queryBuilder"; // Adjust the import path
import { Header } from "@/components/header";
import { SelectColumnModal } from "@/components/data-table/select-column-modal";
import { ProfileSettings } from "@/components/user/profile-settings";
import CommunityContainer from "@/components/community/community-container";

import { Filter } from "@/components/map/filter";
//hooks
import { useRenderMap } from "@/hooks/map/useRenderMap";
import { useArrestLogSearch } from "@/hooks/data-table/useArrestLogSearch";
import { useRenderCharts } from "@/hooks/charts/useRenderCharts";
import { useRenderTable } from "@/hooks/data-table/useRenderTable";
import { useTableHeaderFilter } from "@/hooks/data-table/useTableHeaderFilter";

import { HeaderSelect } from "@/types/header.interface";
import { CrimeFilterState } from "@/types/map.interface";
import { initialCrimeFilterState } from "@/lib/constants";

import { useAuth } from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";

import { useProfileSettings } from "@/hooks/user/useProfileSettings";
import { useSession } from "next-auth/react";

import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: session } = useSession();

  const { loading, isAuthenticated } = useAuth();
  const { isProfileSettingsOpen, setIsProfileSettingsOpen } =
    useProfileSettings();

  const selectedView = searchParams.get("view") || "Map";

  useEffect(() => {
    if (!loading && !isAuthenticated && !session) {
      const timeout = setTimeout(() => {
        router.push("/");
      }, 100); // 100–300ms is usually enough

      return () => clearTimeout(timeout);
    }
  }, [loading, isAuthenticated, router, session]);

  //export default only required for pages
  //Table search
  const { searchArrestLogs, arrestLogSearchParams } = useArrestLogSearch();

  //Table filters
  const {
    headerFilter,
    setHeaderFilter,
    filterDirection,
    setFilterDirection,
    filterText,
  } = useTableHeaderFilter();

  //Map Filters
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
    orderBy: filterText,
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

  const [view, setView] = useState<HeaderSelect>(selectedView as HeaderSelect);

  useEffect(() => {
    router.replace(`/dashboard?view=${view.toLowerCase()}`);
  }, [view, router]);

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
    headerFilter,
    setHeaderFilter,
    filterDirection,
    setFilterDirection,
  });

  const [selectColumns, setSelectColumns] = useState<boolean>(false);
  const openSelectColumns = () => {
    setSelectColumns(true);
  };
  const closeSelectColumns = () => {
    setSelectColumns(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-8 font-(family-name:--font-geist-sans)">
      {isProfileSettingsOpen && (
        <ProfileSettings setIsProfileSettingsOpen={setIsProfileSettingsOpen} />
      )}
      <Header
        view={view}
        toggleView={toggleView}
        searchArrestLogs={searchArrestLogs}
        openSelectColumns={openSelectColumns}
        setIsProfileSettingsOpen={setIsProfileSettingsOpen}
      />
      <main className="flex flex-col gap-8 w-full">
        {selectColumns && (
          <SelectColumnModal
            handleClose={closeSelectColumns}
            arrestLogFields={arrestLogs.fields}
          />
        )}
        {view === "Map" && (
          <div className="flex w-full gap-4 p-24">
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
        {view === "Community" && <CommunityContainer />}
      </main>
    </div>
  );
}
