import React from "react";

interface ChartCardProps {
  title: string;
  stat: number | string | null;
  color: string; // expects tailwind color class like "bg-blue-500"
}

export function ChartCard({ title, stat, color }: ChartCardProps) {
  return (
    <div
      className={`flex flex-col justify-between p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 bg-white border border-gray-200 min-w-[150px]`}
    >
      {/* Title */}
      <h2 className="text-sm font-medium text-gray-600">{title}</h2>

      {/* Stat */}
      <span
        className={`mt-2 text-2xl font-bold ${color} truncate`}
        title={stat?.toString()}
      >
        {stat ?? "-"}
      </span>
    </div>
  );
}
