"use client";

interface UsageBarProps {
  current: number;
  max: number;
  label: string;
}

function getBarColor(percentage: number): string {
  if (percentage < 50) return "bg-green-500";
  if (percentage < 80) return "bg-yellow-500";
  return "bg-red-500";
}

export function UsageBar({ current, max, label }: UsageBarProps) {
  const percentage = Math.min((current / max) * 100, 100);
  const colorClass = getBarColor(percentage);

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400 font-medium">
          {current} / {max}
        </span>
      </div>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-700/50">
        <div
          className={`h-full ${colorClass} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
