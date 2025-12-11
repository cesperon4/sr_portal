"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  type DataCategory,
  type VisibleFields,
} from "@/types/openDataPortal.type";
import { CheckSquare, Columns3, Square, X } from "lucide-react";
import * as React from "react";
import { Backdrop } from "../backdrop";

// type FieldTypes =
//   | PoliceIncidentAttributes
//   | PoliceForceAttributes
//   | PolicePursuit
//   | ArrestLogType;

// type VisibleFields = Record<keyof FieldTypes, boolean>;

interface DisplayLogField {
  alias: string | null;
  defaultValue: string | null;
  domain: string | null;
  name: string;
  sqlType: string | null;
  type: string | null;
}

interface DataTableProps {
  displayLogFields: DisplayLogField[];
  handleClose: () => void;
  visibleColumns: VisibleFields;
  columnSetters: Record<
    DataCategory,
    React.Dispatch<React.SetStateAction<VisibleFields>>
  >;
  selectedCategory: DataCategory;
  checkAllVisibleColumns: (group: DataCategory) => void;
  uncheckAllVisibleColumns: (group: DataCategory) => void;
}

export function SelectColumnModal({
  displayLogFields,
  handleClose,
  visibleColumns,
  columnSetters,
  selectedCategory,
  checkAllVisibleColumns,
  uncheckAllVisibleColumns,
}: DataTableProps) {
  const selectedCount = Object.values(visibleColumns).filter(Boolean).length;
  const totalCount = displayLogFields.length;

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  return (
    <Backdrop onClick={handleClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col m-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Columns3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Select Columns
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {selectedCount} of {totalCount} selected
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 px-6 py-4 bg-gray-100 border-b border-gray-200 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              checkAllVisibleColumns(selectedCategory);
            }}
            className="flex-1 gap-2"
          >
            <CheckSquare className="w-4 h-4" />
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              uncheckAllVisibleColumns(selectedCategory);
            }}
            className="flex-1 gap-2"
          >
            <Square className="w-4 h-4" />
            Deselect All
          </Button>
        </div>

        {/* Column List - Scrollable */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          <div className="space-y-1">
            {displayLogFields.map((field) => {
              const isChecked =
                visibleColumns[field.name as keyof VisibleFields];
              return (
                <label
                  key={field.name}
                  className={`
                    flex items-center justify-between p-3 rounded-lg
                    cursor-pointer transition-all
                    hover:bg-gray-100
                    ${
                      isChecked
                        ? "bg-gray-100 border border-blue-200"
                        : "border border-transparent"
                    }
                  `}
                >
                  <span
                    className={`font-medium ${
                      isChecked ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {field.name}
                  </span>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => {
                      columnSetters[selectedCategory as DataCategory](
                        (prev) => ({
                          ...prev,
                          [field.name]:
                            !visibleColumns[field.name as keyof VisibleFields],
                        })
                      );
                    }}
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-100 rounded-b-xl flex-shrink-0 flex gap-3">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply Changes
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}
