"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { PoliceIncidentType } from "@/types/map.interface";
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38], // size of the icon
});

interface DataTableProps {
  policeIncidents: PoliceIncidentType[];
}

export function Map({ policeIncidents }: DataTableProps) {
  const center: [number, number] = [38.4404, -122.7141];
  return (
    <div className="w-full mr-4 flex items-center justify-center z-0">
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full rounded-lg shadow-md bg-white"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {policeIncidents?.map((incident, index) => (
            <Marker
              position={[incident.attributes.LAT, incident.attributes.LON]}
              icon={customIcon}
              key={index}
            >
              <div className={`cursor-pointer`}>
                <Popup>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={`cursor-pointer`}
                  >{`${incident.attributes.StatuteDescription}, ${incident.attributes.DateOccurred}`}</div>
                </Popup>
              </div>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
