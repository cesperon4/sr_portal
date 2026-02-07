"use client";

import * as React from "react";
import { Backdrop } from "../backdrop";
import { X } from "lucide-react";

interface ChartModalProps {
  chart: { chart: React.ReactNode | null; size: "lg" | "sm" };
  handleClose: (chart: React.ReactNode | null, size: "lg" | "sm") => void;
}

export default function ChartModal({ chart, handleClose }: ChartModalProps) {
  return (
    <Backdrop onClick={() => handleClose(null, "lg")}>
      <div
        role="dialog"
        aria-label="Expanded chart"
        onClick={(e) => e.stopPropagation()}
        className={`relative rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden ${
          chart.size === "sm"
            ? "w-[90vw] max-w-md h-[70vh] max-h-[400px]"
            : "w-[90vw] max-w-4xl h-[80vh] max-h-[600px]"
        }`}
      >
        <div className="absolute top-3 right-3 z-10">
          <button
            type="button"
            onClick={() => handleClose(null, "lg")}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="p-6 pt-14 h-full flex flex-col">
          {chart.chart}
        </div>
      </div>
    </Backdrop>
  );
}
