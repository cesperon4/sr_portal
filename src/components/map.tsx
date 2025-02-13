"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38], // size of the icon
});

interface PoliceIncidentType {
  attributes: {
    Agency: string | null;
    Beat_Zone: string | null;
    ChargeCount: number | null;
    City: string | null;
    DateOccurred: string | null;
    DayOfWeek: string | null;
    HourOccurred: string | null;
    Incident_number: number | null;
    LAT: number;
    LON: number;
    Location_type: string | null;
    MonthStamp: number | null;
    OBJECTID: number | null;
    OBJECTID_1: number | null;
    OBJECTID_2: number | null;
    PartI: string | null;
    State: string | null;
    Statute: string | null;
    StatuteDescription: string | null;
    Street: string | null;
    UCRcode: string | null;
    YearStamp: number | null;
    ZIP: number | null;
    id: number | null;
  };
  geometry: {
    x: number;
    y: number;
  };
}
interface DataTableProps {
  policeIncidents: PoliceIncidentType[];
}

export function Map({ policeIncidents }: DataTableProps) {
  const center: [number, number] = [38.4404, -122.7141];
  return (
    <div className="w-full h-[600px] flex items-center justify-center">
      <MapContainer
        center={center}
        zoom={13}
        className="h-[600px] w-full rounded-lg shadow-md"
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
                      console.log("hello");
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
