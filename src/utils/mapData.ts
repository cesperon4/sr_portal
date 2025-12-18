import {
  type MarkerData,
  type MarkerDataType,
  type PoliceIncidentMapFeature,
} from "@/types/map.interface";
import { type MapPost, type Post } from "../../generated/graphql";

type FieldData = {
  label: string;
  value: string | number;
};

function isPoliceIncident(
  incident: PoliceIncidentMapFeature | Post
): incident is PoliceIncidentMapFeature {
  return "attributes" in incident;
}

function isPost(incident: PoliceIncidentMapFeature | Post): incident is Post {
  return "__typename" in incident;
}

export function normalizeIncident(
  incident: PoliceIncidentMapFeature | Post
): FieldData[] {
  if (isPoliceIncident(incident)) {
    return Object.entries(incident.attributes).map(([key, value]) => ({
      label: key,
      value: value ?? "",
    }));
  }

  if (isPost(incident)) {
    return Object.entries(incident)
      .filter(
        ([, value]) => typeof value === "string" || typeof value === "number"
      )
      .map(([key, value]) => ({
        label: key,
        value,
      }));
  }

  return [];
}

export function normalizeMapMarker(
  incidents: PoliceIncidentMapFeature[],
  posts: MapPost[]
): MarkerData[] {
  const incidentMarkers = incidents.flatMap((incident) => {
    const lon = incident.attributes.LON;
    const lat = incident.attributes.LAT;
    const id = incident.attributes.OBJECTID;
    const description = `${incident.attributes.StatuteDescription}, ${incident.attributes.DateOccurred}`;

    if (typeof lon !== "number" || typeof lat !== "number" || id === null) {
      return [];
    }

    return [
      {
        lon,
        lat,
        id: id,
        type: "incident" as MarkerDataType,
        description,
      },
    ];
  });

  const postMarkers = posts.flatMap((post) => {
    const lon = post.lon;
    const lat = post.lat;
    const id = post.id;
    const description = `${post.title}, ${post.date_occurred} `;

    if (typeof lon !== "number" || typeof lat !== "number" || id === null) {
      return [];
    }

    return [
      {
        lon,
        lat,
        id: id,
        type: "post" as MarkerDataType,
        description,
      },
    ];
  });

  return [...incidentMarkers, ...postMarkers];
}
