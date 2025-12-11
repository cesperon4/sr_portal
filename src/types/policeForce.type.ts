import { type Feature, type OpenDataResponse } from "./openDataPortal.type";

export type PoliceForceAttributes = {
  OBJECTID: number;
  Location: string | null;
  Address: string;
  IncidentNumber: number;
  UniqueKey: string;
  FileNumber: string;
  CaseNumber: string;
  OccurredDayOfWeek: string;
  OccurredDate: number; // Unix timestamp (ms)
  County: string;
  Division: string;
  Bureau: string;
  Team: string;
  Assignment: string;
  CallType: string;
  Reason: string;
  AggravatingFactors: string;
  SuspectArrested: string;
  SuspectInjured: string;
  SuspectHospitalized: string;
  YearsOfService: number | null;
  OfficerInjured: string;
  OfficerHospitalized: string;
  UseOfForceType: string;
  UseOfForceTypeScale: string;
  Disposition: string;
  Block: string;
  StreetName: string;
  StreetType: string;
  StreetDirection: string | null;
  City: string;
  State: string;
  Zipcode: string | null;
  Count_: number | null;
  F_first_match: string | null;
  OBJECTID_1: number;
};

export type PoliceForceFeature = Feature<PoliceForceAttributes>;

export type PoliceForceResponse = OpenDataResponse<PoliceForceFeature>;
