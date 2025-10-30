"use client";
import SubscriptionFallback from "@/components/fallbacks/subscription";
import { Protect, useUser } from "@clerk/nextjs";
import Dashboard from "./components/Dashboard";

export default function DashboardPage() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.isAdmin;

  return (
    <Protect
      condition={(has) => has({ feature: "pro_user" }) || Boolean(isAdmin)}
      fallback={<SubscriptionFallback />}
    >
      <Dashboard />
    </Protect>
  );
}
