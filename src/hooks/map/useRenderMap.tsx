import { useCallback } from "react";
import { PoliceIncidentType } from "@/types/map.interface";
import { Map } from "@/components/map/map-container";

interface UseRenderMapProps {
  isPoliceIncidentsLoading: boolean;
  policeIncidentsError: Error | null;
  policeIncidents: PoliceIncidentType[];
}
export function useRenderMap({
  isPoliceIncidentsLoading,
  policeIncidentsError,
  policeIncidents,
}: UseRenderMapProps) {
  const renderMap = useCallback(() => {
    if (isPoliceIncidentsLoading) return <p>Loading map...</p>;
    if (policeIncidentsError)
      return <p>Error: {policeIncidentsError.message}</p>;

    return <Map policeIncidents={policeIncidents} />;
  }, [isPoliceIncidentsLoading, policeIncidentsError, policeIncidents]);

  return { renderMap };
}
