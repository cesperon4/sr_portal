"use client";

import { createModalSection } from "@/utils/createModalSection";
import { X } from "lucide-react";
import * as React from "react";
import { type DisplayLog } from "../../types/openDataPortal.type";
import { Backdrop } from "../backdrop";

interface DataTableProps {
  data: DisplayLog;
  handleClose: () => void;
}

export function TableRowModal({ data, handleClose }: DataTableProps) {
  console.log("TableRowModal: ", data);
  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  const sections = createModalSection(data);

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
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-semibold text-gray-900">Log Details</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
