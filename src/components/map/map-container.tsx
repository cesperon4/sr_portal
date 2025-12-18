"use client";

import {
  type MarkerDataType,
  type PoliceIncidentMapFeature,
} from "@/types/map.interface";
import { normalizeMapMarker } from "@/utils/mapData";
import { Icon } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { type MapPost } from "../../../generated/graphql";
import SearchBox from "./SearchBox";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38], // size of the icon
});

interface DataTableProps {
  policeIncidents: PoliceIncidentMapFeature[] | [];
  openMapModal: (id: number, type: MarkerDataType) => void;
  posts: MapPost[] | [];
}

export default React.memo(function Map({
  policeIncidents,
  posts,
  openMapModal,
}: DataTableProps) {
  console.log("map re render");
  const center: [number, number] = [38.4404, -122.7141];

  const markers = normalizeMapMarker(policeIncidents, posts);

  console.log("markers: ", markers);

  return (
    <div className="w-full mr-4 flex items-center justify-center z-0">
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-[100vh] rounded-lg shadow-md bg-white"
      >
        <SearchBox />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {markers?.map((incident, index) => (
            <Marker
              position={[incident.lat, incident.lon]}
              icon={customIcon}
              key={index}
            >
              <div className={`cursor-pointer`}>
                (
                <Popup>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();

                      openMapModal(incident.id, incident.type);
                    }}
                    className={`cursor-pointer`}
                  >
                    {/* {`${incident.attributes.StatuteDescription}, ${incident.attributes.DateOccurred}`} */}
                    {incident.description}
                  </div>
                </Popup>
                )
              </div>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
});
