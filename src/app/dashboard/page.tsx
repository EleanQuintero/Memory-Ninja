"use client";
import SubscriptionFallback from "@/components/fallbacks/subscription";
import { Protect } from "@clerk/nextjs";
import Dashboard from "./components/Dashboard";

export default function DashboardPage() {
  return (
    <Protect fallback={<SubscriptionFallback />}>
      <Dashboard />;
    </Protect>
  );
}
