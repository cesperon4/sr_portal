"use client";

import * as React from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Toggle } from "@/components/ui/toggle";

import { Backdrop } from "../backdrop";
// import { useDataContext } from "../../context/DataContext";

interface ArrestLogType {
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

// interface ArrestLogField {
//   alias: string | null;
//   defaultValue: string | null;
//   domain: string | null;
//   name: string;
//   sqlType: string | null;
//   type: string | null;
// }

interface DataTableProps {
  //   arrestLogFields: ArrestLogField[];
  data: ArrestLogType;
  handleClose: () => void;
}

export function TableRowModal({ data, handleClose }: DataTableProps) {
  // const { uncheckAllVisibleColumns, checkAllVisibleColumns } = useDataContext();
  return (
    <Backdrop
      onClick={() => {
        handleClose();
      }}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-4/12 overflow-auto max-h-[40rem]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Arrest Log Details
        </h2>
        <form>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <label>Object ID </label>
              <input
                className="rounded"
                disabled
                value={data.attributes.OBJECTID || ""}
              />
            </div>
            <div className="flex gap-2">
              <label>Date Arrested </label>
              <input
                className="rounded"
                disabled
                value={data.attributes.DATE_ARRESTED || ""}
              />
            </div>
            <div className="flex gap-2">
              <label>Arrest ID </label>
              <input
                className="rounded"
                disabled
                value={data.attributes.Arrest_ID || ""}
              />
            </div>
          </div>
        </form>
        <button
          onClick={() => {}}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </Backdrop>
  );
}
