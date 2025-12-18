"use client";

import { type coordinates } from "@/types/openDataPortal.type";
import { Icon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38], // size of the icon
});

interface DataTableProps {
  coordinates: coordinates;
  openMapModal: () => void;
}

export function Map({ coordinates, openMapModal }: DataTableProps) {
  if (!coordinates.x || !coordinates.y) return <div>Missing coordinates</div>;
  const center: [number, number] = [coordinates.x, coordinates.y];

  return (
    <MapContainer
      center={center}
      zoom={16}
      className="w-full h-[14vh] rounded-lg shadow-md bg-white my-8"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        <Marker
          position={[coordinates.x, coordinates.y]}
          icon={customIcon}
        ></Marker>
      </MarkerClusterGroup>
    </MapContainer>
  );
}
