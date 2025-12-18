import { useMapData } from "@/hooks/map/useMapData";
import { useMapModal } from "@/hooks/map/useMapModal";
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
    <div className="flex w-full gap-4">
      {mapModalDetails.isOpen && mapModalDetails.id && mapModalDetails.type && (
        <MapModal
          id={mapModalDetails.id}
          type={mapModalDetails.type}
          closeMapModal={closeMapModal}
        />
      )}

      <Filter
        crimeFilterState={crimeFilterState}
        setCrimeFilterState={setCrimeFilterState}
        clearAllCriminalFilters={clearAllCriminalFilters}
      />

      <div className="flex-1">
        {isPoliceIncidentsLoading && (
          <div className="flex justify-center items-center">
            Map Data Loading...
          </div>
        )}

        {policeIncidentsError && <div>Error fetching police incidents</div>}

        {!isPoliceIncidentsLoading && !policeIncidentsError && (
          <Map
            policeIncidents={policeIncidents?.features || []}
            posts={posts || []}
            openMapModal={openMapModal}
          />
        )}
      </div>
    </div>
  );
}
