export interface CrimeFilterType {
  [category: string]: {
    [subcategory: string]: string[];
  };
}

export interface PoliceIncidentMapType {
  attributes: {
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
  };
  geometry: {
    x: number;
    y: number;
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

export type PoliceIncidentMapResponse = {
  exceededTransferLimit: boolean;
  features: PoliceIncidentMapType[];
  fields: PoliceIncidentField[];
  geometryType: string;
  globalFieldName: string;
  objectIdFieldName: string;
  spatialReference: SpatialReference;
  uniqueIdField: UniqueIdField;
};

export type CrimeFilterState = Record<string, boolean>; // This ensures all codes are treated as strings and values are booleans
