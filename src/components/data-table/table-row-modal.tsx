"use client";

import * as React from "react";
import { Backdrop } from "../backdrop";
// import { TABLE_ROW_CLASSES } from "@/lib/constants";
import { X } from "lucide-react";

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
  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  const sections = [
    {
      title: "Identification",
      fields: [
        { label: "Object ID", value: data.attributes.OBJECTID },
        { label: "Arrest ID", value: data.attributes.Arrest_ID },
        { label: "Unique Key", value: data.attributes.UNIQUEKEY },
        { label: "Case Number", value: data.attributes.Case_Number },
      ],
    },
    {
      title: "Personal Information",
      fields: [
        { label: "First Name", value: data.attributes.FIRSTNAME },
        { label: "Middle Name", value: data.attributes.MIDDLENAME },
        { label: "Last Name", value: data.attributes.LASTNAME },
        { label: "Suffix", value: data.attributes.SUFFIX },
        { label: "Date of Birth", value: data.attributes.DOB },
        { label: "Age", value: data.attributes.AGE },
        { label: "Sex", value: data.attributes.SEX },
        { label: "Race", value: data.attributes.RACE },
      ],
    },
    {
      title: "Arrest Details",
      fields: [
        { label: "Date Arrested", value: data.attributes.DATE_ARRESTED },
        { label: "Time of Arrest", value: data.attributes.TIME_ARREST },
        { label: "Arrest Status", value: data.attributes.ARREST_STATUS },
        { label: "Arrest Charge", value: data.attributes.Arrest_Charge },
        {
          label: "Charge Description",
          value: data.attributes.Charge_Description,
        },
        { label: "Charge Sequence", value: data.attributes.Charge_Sequence },
        { label: "Degree", value: data.attributes.Degree },
      ],
    },
    {
      title: "Location Information",
      fields: [
        {
          label: "Street Number",
          value: data.attributes.ArrestLocationStreetNBR,
        },
        { label: "Street", value: data.attributes.ArrestLocationStreet },
        {
          label: "Apartment/Floor",
          value: data.attributes.ArrestLocationAptFlr,
        },
        { label: "City", value: data.attributes.ArrestLocationCity },
      ],
    },
  ];

  return (
    <Backdrop
      onClick={() => {
        handleClose();
      }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col m-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-semibold text-gray-900">
            Arrest Log Details
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          <div className="space-y-8">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.fields.map((field, fieldIdx) => (
                    <div key={fieldIdx} className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                        {field.label}
                      </label>
                      <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
                        {field.value || (
                          <span className="text-gray-400 italic">N/A</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0">
          <button
            onClick={handleClose}
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </Backdrop>
  );
}
