import { redirect } from "next/navigation";

export default function BlockedOnboardingPage() {
  redirect("/");
  return null;
}
