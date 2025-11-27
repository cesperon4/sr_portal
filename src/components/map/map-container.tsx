"use client";

import { PoliceIncidentType } from "@/types/map.interface";
import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import SearchBox from "./SearchBox";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38], // size of the icon
});

interface DataTableProps {
  policeIncidents: PoliceIncidentType[];
  openMapModal: (incident: PoliceIncidentType) => void;
}

export function Map({ policeIncidents, openMapModal }: DataTableProps) {
  const center: [number, number] = [38.4404, -122.7141];

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
          {policeIncidents?.map((incident, index) => (
            <Marker
              position={[incident.attributes.LAT, incident.attributes.LON]}
              icon={customIcon}
              key={index}
            >
              <div className={`cursor-pointer`}>
                (
                <Popup>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      openMapModal(incident);
                    }}
                    className={`cursor-pointer`}
                  >{`${incident.attributes.StatuteDescription}, ${incident.attributes.DateOccurred}`}</div>
                </Popup>
                )
              </div>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
