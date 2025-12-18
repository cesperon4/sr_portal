import {
  type ArrestLogFeature,
  type ArrestLogType,
} from "./arrestLog.interface";
import { type PoliceComplaintFeature } from "./policeComplaint.type";
import {
  type PoliceForceAttributes,
  type PoliceForceFeature,
} from "./policeForce.type";
import { type PoliceIncidentAttributes } from "./policeIncident.interface";
import {
  type PolicePursuit,
  type PolicePursuitFeature,
} from "./policePursuit.type";

export type coordinates = {
  x: number;
  y: number;
};

export type Geometry = {
  geometry: coordinates;
};

export type Feature<T> = {
  attributes: T;
};

export type Fields<T> = {
  fields: T[];
};

type SpatialReference = {
  wkid: number;
  latestWkid: number;
};

type UniqueIdField = {
  name: string;
  isSystemMaintained: string;
};

export type Field = {
  alias: string;
  defaultValue: string | null;
  domain: string | null;
  name: string;
  sqlType: string;
  type: string;
};

export type DisplayLog =
  | PoliceComplaintFeature
  | ArrestLogFeature
  | PoliceForceFeature
  | PolicePursuitFeature;

export type OpenDataResponse<T> = {
  exceededTransferLimit?: boolean;
  features: T[];
  fields: Field[];
  geometryType?: string;
  globalFieldName: string;
  objectIdFieldName: string;
  spatialReference?: SpatialReference;
  uniqueIdField: UniqueIdField;
};

export type VisibleFields =
  | Record<keyof PoliceIncidentAttributes, boolean>
  | Record<keyof PoliceForceAttributes, boolean>
  | Record<keyof PolicePursuit, boolean>
  | Record<keyof ArrestLogType, boolean>
  | Record<keyof PoliceComplaintFeature["attributes"], boolean>;

export type DataCategory =
  | "Arrest Logs"
  | "Police Complaints"
  | "Police Pursuits"
  | "Use of Force Reports";
