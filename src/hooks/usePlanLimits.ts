import { useAuth } from "@clerk/nextjs";
import { FREE_LIMITS, PRO_LIMITS } from "@/utils/consts/planLimits";

export function usePlanLimits() {
  const { has, sessionClaims } = useAuth();
  const isPro =
    has?.({ feature: "pro_user" }) ||
    Boolean(sessionClaims?.publicMetadata?.isAdmin);

  return {
    isPro,
    limits: isPro ? PRO_LIMITS : FREE_LIMITS,
  };
}
