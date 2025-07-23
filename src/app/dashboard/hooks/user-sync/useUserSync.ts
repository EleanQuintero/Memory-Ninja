import { syncUser } from "@/utils/services/functions/api/postUserData";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export const useUserSync = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const postUserData = async () => {
      try {
        // Verificación inicial con mensaje de debu
        if (!isLoaded || !user || !user.createdAt) {
          return;
        }

        const userCreatedAt = new Date(user.createdAt).getTime();
        const now = Date.now();
        const isNewUser = now - userCreatedAt < 50000; // 50 segundos

        if (!isNewUser) {
          return;
        }

        await syncUser();
      } catch (error) {
        console.error("Error al sincronizar el usuario:", error);
      }
    };

    postUserData();
  }, [isLoaded, user]);
};