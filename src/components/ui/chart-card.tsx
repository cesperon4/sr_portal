const colorMap: Record<string, string> = {
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-emerald-600 dark:text-emerald-400",
  orange: "text-amber-600 dark:text-amber-400",
  yellow: "text-amber-500 dark:text-amber-400",
};

interface ChartCardProps {
  title: string;
  stat: number | string | null;
  color: string;
}

export function ChartCard({ title, stat, color }: ChartCardProps) {
  const colorClass = colorMap[color] ?? "text-gray-900 dark:text-white";

  return (
    <div className="chart-card flex flex-col gap-1 rounded-xl bg-gray-50/80 dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-700/50 p-3.5 min-w-0">
      <p className="text-caption text-gray-500 dark:text-gray-400 truncate">
        {title}
      </p>
      <span
        className={`text-xl font-semibold tabular-nums ${colorClass} truncate`}
        title={stat != null ? String(stat) : undefined}
      >
        {stat ?? "—"}
      </span>
    </div>
  );
}
