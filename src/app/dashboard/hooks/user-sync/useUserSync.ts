import { syncUser } from "@/utils/services/functions/api/postUserData";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export const useUserSync = () => {
    const { user, isLoaded } = useUser();

  useEffect(() => {
    const postUserData = async () => {
      if (!isLoaded || !user || !user.createdAt) return;

      const userCreatedAt = new Date(user.createdAt).getTime();
      const now = Date.now();
      const isNewUser = now - userCreatedAt < 5000;

      if (!isNewUser) return;

      syncUser();
      alert("Usuario sincronizado con exito");
    };

    postUserData();
  }, [isLoaded, user]);
}