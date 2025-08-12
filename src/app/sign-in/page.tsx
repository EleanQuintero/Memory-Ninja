import { redirect } from "next/navigation";

export default function BlockedSignInPage() {
  redirect("/");
  return null;
}
