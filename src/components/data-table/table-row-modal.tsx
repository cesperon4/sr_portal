"use client";

import * as React from "react";
import { Backdrop } from "../backdrop";
import { TABLE_ROW_CLASSES } from "@/lib/constants";

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

interface DataTableProps {
  data: ArrestLogType;
  handleClose: () => void;
}

export function TableRowModal({ data, handleClose }: DataTableProps) {
  return (
    <Backdrop
      onClick={() => {
        handleClose();
      }}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-[70rem] overflow-auto max-h-[40rem]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b">
          Arrest Log Details
        </h2>
        <form>
          <div className="grid grid-cols-1 items-center gap-4 px-4">
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>Object ID </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.OBJECTID || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>Arrest ID </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.Arrest_ID || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                Arrest Status{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.ARREST_STATUS || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                Arrest Location Apartment Floor{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.ArrestLocationAptFlr || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                Arrest Location City{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.ArrestLocationCity || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>Age </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.AGE || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                Arrest Location Street{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.ArrestLocationStreet || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                Date Arrested{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.DATE_ARRESTED || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                Arrest Location Street Number{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.ArrestLocationStreetNBR || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                Arrest Charge{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.Arrest_Charge || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                Case Number{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.Case_Number || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                Case Number{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.Charge_Description || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                Charge Sequence{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.Charge_Sequence || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>D.O.B </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.DOB || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>Degree </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.Degree || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                First Name{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.FIRSTNAME || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>
                Middle Name{" "}
              </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.MIDDLENAME || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>Last Name </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.LASTNAME || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>Suffix </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.SUFFIX || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>Race </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.RACE || "n/a"}
              />
            </div>
            <div className={TABLE_ROW_CLASSES.form_row}>
              <label className={TABLE_ROW_CLASSES.form_label}>Sex </label>
              <input
                className={TABLE_ROW_CLASSES.form_input}
                disabled
                value={data.attributes.SEX || "n/a"}
              />
            </div>
          </div>
        </form>
        <button
          onClick={() => {
            handleClose();
          }}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </Backdrop>
  );
}
