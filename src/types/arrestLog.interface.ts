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
  attributes: {
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
}

export interface ArrestLogField {
  alias: string | null;
  defaultValue: string | null;
  domain: string | null;
  name: string;
  sqlType: string | null;
  type: string | null;
}

type UniqueField = {
  name: string;
  isSystemMaintained: boolean;
};

export type ArrestLogResponse = {
  features: ArrestLogType[];
  fields: ArrestLogField[];
  globalIdFieldName: string;
  objectIdFieldName: string;
  uniqueField: UniqueField;
};
