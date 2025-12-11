import { Map } from "@/components/map/map-container";
import { type PoliceIncidentMapFeature } from "@/types/map.interface";
import { useCallback, useState } from "react";

interface UseRenderMapProps {
  isPoliceIncidentsLoading: boolean;
  policeIncidentsError: Error | null;
  policeIncidents: PoliceIncidentMapFeature[];
}
export function useRenderMap({
  isPoliceIncidentsLoading,
  policeIncidentsError,
  policeIncidents,
}: UseRenderMapProps) {
  const [mapModal, setMapModal] = useState(false);
  const [modalData, setModalData] = useState<PoliceIncidentMapFeature | null>(
    null
  );

  const openMapModal = (incident: PoliceIncidentMapFeature) => {
    if (!incident) {
      console.log("modal did not open incident does not occur");
      return;
    }
    setModalData(incident);
    setMapModal(true);
  };

  const closeMapModal = () => {
    setMapModal(false);
  };
  const renderMap = useCallback(() => {
    if (isPoliceIncidentsLoading) return <p>Loading map...</p>;
    if (policeIncidentsError)
      return <p>Error: {policeIncidentsError.message}</p>;

    return (
      <Map policeIncidents={policeIncidents} openMapModal={openMapModal} />
    );
  }, [isPoliceIncidentsLoading, policeIncidentsError, policeIncidents]);

  return { renderMap, mapModal, openMapModal, closeMapModal, modalData };
}
