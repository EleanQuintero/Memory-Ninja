import { StatCard } from "./StatCard";
import { SkeletonCard } from "@/components/fallbacks/SkeletonCard";

interface Stats {
  title: string;
  value: string;
  icon: React.JSX.Element;
  change: string;
  chartData: number[];
}

interface StatsProps {
  stats: Stats[];
  isLoading?: boolean;
}

export const Stats = ({ stats, isLoading }: StatsProps) => {
  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full max-w-full overflow-x-hidden md:max-w-7xl ">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
