export interface PoliceIncidentType {
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
  geometry: {
    x: string | null;
    y: string | null;
  };
}

type PoliceIncidentField = {
  alias: string | null;
  defaultValue: string | null;
  domain: string | null;
  name: string | null;
  sqlType: string | null;
  type: string | null;
};

type SpatialReference = {
  wkid: number;
  latestWkid: number;
};

type UniqueIdField = {
  name: string;
  isSystemMaintained: string;
};

export type PoliceIncidentResponse = {
  exceededTransferLimit: boolean;
  features: PoliceIncidentType[];
  fields: PoliceIncidentField[];
  geometryType: string;
  globalFieldName: string;
  objectIdFieldName: string;
  spatialReference: SpatialReference;
  uniqueIdField: UniqueIdField;
};
