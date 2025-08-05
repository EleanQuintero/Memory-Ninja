"use client";
import SubscriptionFallback from "@/components/fallbacks/subscription";
import { Protect } from "@clerk/nextjs";
import Dashboard from "./components/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function DashboardPage() {
  const [dashboardClient] = useState(() => new QueryClient());

  return (
    <Protect plan={"pro_user"} fallback={<SubscriptionFallback />}>
      <QueryClientProvider client={dashboardClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Dashboard />
      </QueryClientProvider>
    </Protect>
  );
}
