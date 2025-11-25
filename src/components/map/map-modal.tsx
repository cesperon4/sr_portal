"use client";

import React from "react";
import { Backdrop } from "../backdrop";
import { type PoliceIncidentType } from "@/types/map.interface";

type MapModalProps = {
  incident: PoliceIncidentType;
  closeMapModal: () => void;
};

export default function MapModal({ incident, closeMapModal }: MapModalProps) {
  const a = incident.attributes;
  return (
    <Backdrop onClick={closeMapModal}>
      <form
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl text-gray-900 p-8 w-[600px] shadow-xl space-y-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
          Incident Details
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Agency" value={a.Agency || ""} />
          <Field label="Date Occurred" value={a?.DateOccurred || ""} />
          <Field label="Charge Count" value={a?.ChargeCount || ""} />
          <Field label="Day Of the Week" value={a.DayOfWeek || ""} />
          <Field label="Hour Occurred" value={a?.HourOccurred || ""} />
          <Field label="Beat Zone" value={a?.Beat_Zone || ""} />
          <Field label="City" value={a?.City || ""} />
          <Field label="State" value={a?.State || ""} />

          {/* Repeated Beat Zone fields preserved */}

          <Field label="Incident Number" value={a?.Incident_number || ""} />
          <Field label="Latitude" value={a.LAT} />
          <Field label="Longitude" value={a.LON} />
          <Field label="Location Type" value={a?.Location_type || ""} />
          <Field label="Month Stamp" value={a?.MonthStamp || ""} />
          <Field label="Year" value={a?.YearStamp || ""} />
          <Field label="Part I" value={a?.PartI || ""} />
          <Field label="Statute" value={a?.Statute || ""} />
          <Field
            label="Statute Description"
            value={a?.StatuteDescription || ""}
          />
          <Field label="Street" value={a?.Street || ""} />
          <Field label="Zip Code" value={a?.ZIP || ""} />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={closeMapModal}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Close
          </button>
        </div>
      </form>
    </Backdrop>
  );
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        className="border rounded-md px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue={value || ""}
        readOnly
      />
    </div>
  );
}
