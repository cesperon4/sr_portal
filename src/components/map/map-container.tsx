"use client";

import {
  type MarkerDataType,
  type PoliceIncidentMapFeature,
} from "@/types/map.interface";
import { normalizeMapMarker } from "@/utils/mapData";
import { Icon } from "leaflet";
import React from "react";
import { MapContainer as LeafletMapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { type MapPost } from "../../../generated/graphql";
import BaseMapSwitcher from "./base-map-switcher";
import SearchBox from "./SearchBox";

const defaultCenter: [number, number] = [38.4404, -122.7141];
const defaultZoom = 13;

const incidentIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapContainerProps {
  policeIncidents: PoliceIncidentMapFeature[] | [];
  openMapModal: (id: number, type: MarkerDataType) => void;
  posts: MapPost[] | [];
}

function MapComponent({
  policeIncidents,
  posts,
  openMapModal,
}: MapContainerProps) {
  const markers = normalizeMapMarker(policeIncidents, posts);

  return (
    <div className="relative w-full h-[min(70vh,600px)] lg:h-[calc(100vh-8rem)]">
      <LeafletMapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="w-full h-full rounded-xl z-0"
      >
        <SearchBox />
        <BaseMapSwitcher />
        <MarkerClusterGroup>
          {markers.map((incident, index) => (
            <Marker
              position={[incident.lat, incident.lon]}
              icon={incidentIcon}
              key={`${incident.type}-${incident.id}-${index}`}
            >
              <Popup>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openMapModal(incident.id, incident.type);
                  }}
                  className="text-left text-sm text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer max-w-[240px]"
                >
                  {incident.description}
                </button>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </LeafletMapContainer>
    </div>
  );
}

export default React.memo(MapComponent);
