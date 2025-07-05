import { useEffect } from "react";

export const usePing = () => {
  useEffect(() => {
    const ping = async () => {
      if (process.env.NODE_ENV === "development") {
        const PING_INTERVAL_MS = 10 * 60 * 1000;

        const lastPìng = localStorage.getItem("lastPing");
        const now = Date.now();

        if (!lastPìng || now - Number(lastPìng) > PING_INTERVAL_MS) {
          try {
            const response = await fetch("/api/health");
            if (!response.ok) {
              throw new Error("Respuesta no valida");
            }

            console.log("ALIVE")
            localStorage.setItem('lastPing', now.toString())
          } catch (error) {
            console.warn('[PING] Falló la conexión con la API ❌', error);
          }
        }
      }

    };
    ping()
  }, []);
};
