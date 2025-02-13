"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";

import { Backdrop } from "../backdrop";
import { useDataContext } from "../../context/DataContext";

interface ArrestLogField {
  alias: string | null;
  defaultValue: string | null;
  domain: string | null;
  name: string;
  sqlType: string | null;
  type: string | null;
}

interface DataTableProps {
  arrestLogFields: ArrestLogField[];
  handleClose: () => void;
}

export function SelectColumnModal({
  arrestLogFields,
  handleClose,
}: DataTableProps) {
  const {
    setVisibleColumns,
    visibleColumns,
    uncheckAllVisibleColumns,
    checkAllVisibleColumns,
  } = useDataContext();
  return (
    <Backdrop onClick={handleClose}>
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md overflow-auto max-h-[40rem]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Select Columns
        </h2>
        <div className="flex gap-2 my-8 text-white text-sm ">
          <div
            className="rounded bg-yellow-400 p-2 ml-auto cursor-pointer hover:bg-yellow-300"
            onClick={() => {
              uncheckAllVisibleColumns();
            }}
          >
            uncheck all
          </div>
          <div
            className="rounded bg-green-400 text-white p-2 cursor-pointer hover:bg-green-300"
            onClick={() => {
              checkAllVisibleColumns();
            }}
          >
            check all
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {arrestLogFields.map((field) => {
            return (
              <div
                className="flex items-center justify-between py-2"
                key={field.name}
              >
                <span className="text-gray-700">{field.name}</span>
                <Checkbox
                  checked={visibleColumns[field.name]}
                  onCheckedChange={() => {
                    setVisibleColumns((prev) => ({
                      ...prev,
                      [field.name]: !visibleColumns[field.name],
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={handleClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </Backdrop>
  );
}
