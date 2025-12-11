import { type Feature, OpenDataResponse } from "./openDataPortal.type";

export type PoliceComplaint = {
  Address: string;
  Allegation: string;
  AllegationType: string | null;
  Assignment: string | null;
  Block: string;
  Bureau: string;
  CaseNumber: string;
  CitizenAge: number;
  CitizenComplaint: string;
  CitizenRace: string;
  CitizenSex: string;
  City: string;
  Count_: string | null;
  Division: string;
  County: string;
  F_first_match: string | null;
  FileNumber: string;
  Finding: string;
  IncidentNumber: number;
  Location: string;
  OBJECTID_1: number;
  OccurredDate: number;
  OccurredDayOfWeek: string;
  Source: string;
  State: string;
  StreetDirection: string | null;

  StreetName: string;
  ServiceType: string | null;
  Team: string;
  StreetType: string | null;
  OBJECTID: number;
  Zipcode: number;
  UniqueKey: string;
  YearsOfService: number;
};

export type PoliceComplaintFeature = Feature<PoliceComplaint>;

export type PoliceComplaintResponse = OpenDataResponse<PoliceComplaintFeature>;
