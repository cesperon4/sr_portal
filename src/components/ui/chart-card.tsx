import React from "react";

interface ChartCardProps {
  title: string;
  stat: number | string | null;
  color: string;
}
export function ChartCard({ title, stat, color }: ChartCardProps) {
  return (
    <div
      className={`shadow rounded flex flex-col justify-center items-center border-4 border-${color}-50 h-[5rem]`}
    >
      <h2>{title}</h2>
      <span>{stat}</span>
    </div>
  );
}
