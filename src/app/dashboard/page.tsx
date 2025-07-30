"use client";
import SubscriptionFallback from "@/components/fallbacks/subscription";
import { Protect } from "@clerk/nextjs";
import Dashboard from "./components/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function DashboardPage() {
  const dashboardClient = new QueryClient();

  return (
    <Protect plan={"pro_user"} fallback={<SubscriptionFallback />}>
      <QueryClientProvider client={dashboardClient}>
        <Dashboard />
      </QueryClientProvider>
    </Protect>
  );
}
