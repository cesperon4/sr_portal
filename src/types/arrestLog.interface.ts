import { type Feature, OpenDataResponse } from "./openDataPortal.type";

export type AttributeTypes =
  | "AGE"
  | "ARREST_STATUS"
  | "ArrestLocationAptFlr"
  | "ArrestLocationCity"
  | "ArrestLocationStreet"
  | "ArrestLocationStreetNBR"
  | "Arrest_Charge"
  | "Arrest_ID"
  | "Case_Number"
  | "Charge_Description"
  | "Charge_Sequence"
  | "DATE_ARRESTED"
  | "DOB"
  | "Degree"
  | "FIRSTNAME"
  | "LASTNAME"
  | "MIDDLENAME"
  | "RACE"
  | "SEX"
  | "TIME_ARREST";

export interface ArrestLogType {
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
}
export type ArrestLogFeature = Feature<ArrestLogType>;

export interface ArrestLogField {
  alias: string;
  defaultValue: string | null;
  domain: string | null;
  name: string;
  sqlType: string;
  type: string;
}

export type ArrestLogResponse = OpenDataResponse<ArrestLogFeature>;
