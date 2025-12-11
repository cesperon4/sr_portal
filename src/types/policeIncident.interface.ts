import {
  type Feature,
  type Geometry,
  type OpenDataResponse,
} from "./openDataPortal.type";

export type PoliceIncidentAttributes = {
  AGE: string | null;
  ARREST_STATUS: string | null;
  ArrestLocationAptFlr: string | null;
  ArrestLocationCity: string | null;
  ArrestLocationStreet: string | null;
  ArrestLocationStreetNBR: string | null;
  Arrest_Charge: string | null;
  Arrest_ID: string | null;
  Case_Number: string | null;
  Charge_Description: string | null;
  Charge_Sequence: string | null;
  DATE_ARRESTED: string | null;
  DOB: string | null;
  Degree: string | null;
  FIRSTNAME: string | null;
  LASTNAME: string | null;
  MIDDLENAME: string | null;
  OBJECTID: number | null;
  OBJECTID_1: number | null;
  RACE: string | null;
  SEX: string | null;
  SUFFIX: string | null;
  TIME_ARREST: string | null;
  UNIQUEKEY: string | null;
};

export type PoliceIncidentFeature = Feature<PoliceIncidentAttributes> &
  Geometry;

export type PoliceIncidentResponse = OpenDataResponse<PoliceIncidentFeature>;
