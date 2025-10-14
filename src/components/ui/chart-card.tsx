import React from "react";

interface ChartCardProps {
  title: string;
  stat: number | string | null;
  color: string;
}
export function ChartCard({ title, stat, color }: ChartCardProps) {
  console.log(color);
  return (
    <div className={`data-card`}>
      <h2 className="font-medium">{title}</h2>
      <span>{stat}</span>
    </div>
  );
}
