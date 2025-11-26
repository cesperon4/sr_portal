"use client";

import * as React from "react";
import { Backdrop } from "../backdrop";

interface DataTableProps {
  chart: { chart: React.ReactNode | null; size: "lg" | "sm" };
  handleClose: (chart: React.ReactNode | null, size: "lg" | "sm") => void;
}

export default function ChartModal({ chart, handleClose }: DataTableProps) {
  return (
    <Backdrop
      onClick={() => {
        handleClose(null, "lg");
      }}
    >
      <div
        className={`${chart.size === "sm" ? "w-4/12 h-4/12" : "w-6/12 h-6/12"}`}
      >
        {chart.chart}
      </div>
    </Backdrop>
  );
}
