"use client";

import { useMapData } from "@/hooks/map/useMapData";
import { useMapModal } from "@/hooks/map/useMapModal";
import { Loader2, MapPin, AlertCircle } from "lucide-react";
import Filter from "./filter";
import Map from "./map-container";
import MapModal from "./map-modal";

export default function MapWrapper() {
  const { mapModalDetails, openMapModal, closeMapModal } = useMapModal();
  const {
    policeIncidents,
    isPoliceIncidentsLoading,
    policeIncidentsError,
    crimeFilterState,
    setCrimeFilterState,
    clearAllCriminalFilters,
    posts,
  } = useMapData();

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-6 min-h-[calc(100vh-8rem)]">
      {mapModalDetails.isOpen && mapModalDetails.id != null && mapModalDetails.type && (
        <MapModal
          id={mapModalDetails.id}
          type={mapModalDetails.type}
          closeMapModal={closeMapModal}
        />
      )}

      {/* Filter sidebar */}
      <Filter
        crimeFilterState={crimeFilterState}
        setCrimeFilterState={setCrimeFilterState}
        clearAllCriminalFilters={clearAllCriminalFilters}
      />

      {/* Map area */}
      <div className="flex-1 min-w-0 flex flex-col rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
        {isPoliceIncidentsLoading && (
          <div className="flex flex-col items-center justify-center flex-1 gap-3 text-gray-500 dark:text-gray-400 py-16">
            <Loader2 className="size-10 animate-spin" strokeWidth={1.5} aria-hidden />
            <p className="text-body-sm font-medium">Loading map data…</p>
            <p className="text-caption">Fetching incidents and posts</p>
          </div>
        )}

        {policeIncidentsError && (
          <div className="flex flex-col items-center justify-center flex-1 gap-3 py-16 px-4">
            <div className="rounded-full bg-red-100 dark:bg-red-950/50 p-3">
              <AlertCircle className="size-8 text-red-600 dark:text-red-400" strokeWidth={1.5} />
            </div>
            <p className="text-body-sm font-semibold text-gray-900 dark:text-white text-center">
              Unable to load map data
            </p>
            <p className="text-caption text-center max-w-sm">
              There was a problem fetching police incidents. Please try again later.
            </p>
          </div>
        )}

        {!isPoliceIncidentsLoading && !policeIncidentsError && (
          <Map
            policeIncidents={policeIncidents?.features ?? []}
            posts={posts ?? []}
            openMapModal={openMapModal}
          />
        )}
      </div>
    </div>
  );
}
