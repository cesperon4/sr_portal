"use client";
import React, { Suspense, useEffect, useState } from "react";

import { SelectColumnModal } from "@/components/data-table/select-column-modal";
import { Header } from "@/components/header";
import { Filter } from "@/components/map/filter";
import { ProfileSettings } from "@/components/user/profile-settings";
import { useArrestLogContext } from "@/context/ArrestLogContext";
import { InsightContextProvider } from "@/context/InsightContext";
import { useAuth } from "@/hooks/auth/useAuth";
import { useTableHeaderFilter } from "@/hooks/data-table/useTableHeaderFilter";
import { useRenderMap } from "@/hooks/map/useRenderMap";
import { useProfileSettings } from "@/hooks/user/useProfileSettings";
import { initialCrimeFilterState } from "@/lib/constants";
import { HeaderSelect } from "@/types/header.interface";
import { CrimeFilterState } from "@/types/map.interface";
import { kelvinToFahrenheit } from "@/utils/convertWeather";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryBuilder } from "../../api/queryBuilder"; // Adjust the import path
import { Loader } from "../../components/ui/loader";

const DataTableWrapper = React.lazy(
  () => import("@/components/data-table/data-table-wrapper")
);
const Charts = React.lazy(() => import("@/components/charts/charts"));
const CommunityContainer = React.lazy(
  () => import("@/components/community/community-container")
);
const MapModal = React.lazy(() => import("@/components/map/map-modal"));

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

  const { arrestLogSearchParams } = useArrestLogContext();

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
    type: "arrest_log",
  });

  const {
    data: policeIncidents,
    isLoading: isPoliceIncidentsLoading,
    error: policeIncidentsError,
  } = useQueryBuilder({
    searchParams: undefined,
    filterParams: crimeFilterState,
    base_url: process.env.NEXT_PUBLIC_POLICE_INCIDENT_URL,
    type: "police_incident",
  });

  const {
    data: weatherData,
    isLoading: isWeatherDataLoading,
    error: weatherDataError,
  } = useQueryBuilder({
    searchParams: { lat: (38.4404).toString(), lon: -(122.7141).toString() },
    base_url: process.env.NEXT_PUBLIC_OPEN_WEATHER_BASE_URL,
    type: "weather",
  });

  useEffect(() => {
    if (weatherData?.main) {
      console.log("weather data: ", weatherData);
      console.log("weather attributes: ", weatherData.weather);
      console.log("location: ", weatherData.name);
      console.log("weather: ", kelvinToFahrenheit(weatherData.main.temp));
      console.log("high: ", kelvinToFahrenheit(weatherData.main.temp_max));
      console.log("low: ", kelvinToFahrenheit(weatherData.main.temp_min));
      console.log("humidity: ", `${weatherData.main.humidity}%`);
      console.log("wind speed: ", weatherData.wind.speed);
    }
  }, [weatherData]);

  const [view, setView] = useState<HeaderSelect>(selectedView as HeaderSelect);

  useEffect(() => {
    router.replace(`/dashboard?view=${view.toLowerCase()}`);
  }, [view, router]);

  const toggleView = (view: HeaderSelect) => setView(view);

  const { renderMap, mapModal, closeMapModal, modalData } = useRenderMap({
    isPoliceIncidentsLoading,
    policeIncidentsError,
    policeIncidents: policeIncidents?.features,
  });

  const [selectColumns, setSelectColumns] = useState<boolean>(false);
  const openSelectColumns = () => {
    setSelectColumns(true);
  };
  const closeSelectColumns = () => {
    setSelectColumns(false);
  };

  return (
    <div className="grid grid-rows-1 items-center justify-items-center gap-10 font-(family-name:--font-geist-sans)">
      {isProfileSettingsOpen && (
        <ProfileSettings setIsProfileSettingsOpen={setIsProfileSettingsOpen} />
      )}
      <Header
        view={view}
        toggleView={toggleView}
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
          <div className="flex w-full gap-4">
            {mapModal && modalData && (
              <Suspense
                fallback={<Loader text={"Fetching incident data..."} />}
              >
                <MapModal incident={modalData} closeMapModal={closeMapModal} />
              </Suspense>
            )}
            <Filter
              crimeFilterState={crimeFilterState}
              setCrimeFilterState={setCrimeFilterState}
              clearAllCriminalFilters={clearAllCriminalFilters}
            />
            {renderMap()}
          </div>
        )}
        {view === "Table" && (
          <Suspense fallback={<Loader text={"Fetching arrest logs..."} />}>
            <DataTableWrapper
              isArrestLogsLoading={isArrestLogsLoading}
              arrestLogsError={arrestLogsError}
              arrestLogs={arrestLogs?.features}
              arrestLogFields={arrestLogs?.fields}
              arrestLogCount={arrestLogs?.features.length}
              headerFilter={headerFilter}
              setHeaderFilter={setHeaderFilter}
              filterDirection={filterDirection}
              setFilterDirection={setFilterDirection}
            />
          </Suspense>
        )}
        {view === "Chart" && (
          <Suspense fallback={<Loader text={"Fetching arrest logs..."} />}>
            <InsightContextProvider arrestLogs={arrestLogs.features}>
              <Charts />
            </InsightContextProvider>
          </Suspense>
        )}
        {view === "Community" && (
          <Suspense fallback={<Loader text={"Fetching arrest logs..."} />}>
            <CommunityContainer />
          </Suspense>
        )}
      </main>
    </div>
  );
}
