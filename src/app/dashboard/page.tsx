import { redirect } from "next/navigation";

export default function BlockedDashboardPage() {
  redirect("/");
  return null;
}
