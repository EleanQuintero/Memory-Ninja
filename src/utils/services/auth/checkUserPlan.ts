import { auth, currentUser } from "@clerk/nextjs/server";

export async function isUserPro(): Promise<boolean> {
  const { has, sessionClaims } = await auth();
  const isAdmin = Boolean(sessionClaims?.publicMetadata?.isAdmin);
  const hasPro = has?.({ feature: "pro_user" }) ?? false;
  return hasPro || isAdmin;
}

export async function getUserPlanInfo() {
  const user = await currentUser();
  const isPro = await isUserPro();

  return {
    userId: user?.id ?? null,
    isPro,
  };
}
