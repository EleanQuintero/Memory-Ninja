import SubscriptionFallback from "@/components/fallbacks/subscription";
import { Protect } from "@clerk/nextjs";
import Dashboard from "./components/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const dashboardClient = new QueryClient();

export default function DashboardPage() {
  return (
    <Protect plan={"pro_user"} fallback={<SubscriptionFallback />}>
      <QueryClientProvider client={dashboardClient}>
        <Dashboard />
      </QueryClientProvider>
    </Protect>
  );
}
