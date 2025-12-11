import {
  type Feature,
  type Geometry,
  type OpenDataResponse,
} from "./openDataPortal.type";

export interface CrimeFilterType {
  [category: string]: {
    [subcategory: string]: string[];
  };
}

export type CrimeFilterState = Record<string, boolean>; // This ensures all codes are treated as strings and values are booleans

export interface PoliceIncidentMapType {
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
}

export type PoliceIncidentMapFeature = Feature<PoliceIncidentMapType> &
  Geometry;

export type PoliceIncidentMapResponse =
  OpenDataResponse<PoliceIncidentMapFeature>;
