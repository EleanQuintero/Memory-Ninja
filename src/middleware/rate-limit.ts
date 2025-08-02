import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

// Definir la interfaz para las opciones de límite de tasa
interface RateLimitOptions {
  requests: number;  // Número de solicitudes permitidas
  duration: string;  // Duración del periodo (ej: "60s", "10m", "1h")
  identifier?: string; // Identificador opcional para distinguir endpoints
}

// Definir las configuraciones predefinidas para diferentes tipos de endpoints
export const RATE_LIMIT_CONFIGS = {
  DEFAULT: { requests: 5, duration: "60s" },
  DASHBOARD: { requests: 20, duration: "60s" },
  AUTH: { requests: 3, duration: "60s" },
  READ: { requests: 20, duration: "60s" },
  WRITE: { requests: 10, duration: "60s" }
};

interface rateLimitterProps {
  fn: (req: NextRequest, context: unknown) => Promise<NextResponse>;
  options?: RateLimitOptions;
}

// Función para crear una instancia de Ratelimit con las opciones dadas
const createRatelimit = (options: RateLimitOptions) => {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      options.requests,
      options.duration as any // Corregir el tipo para la duración
    ),
    analytics: true,
    timeout: 10000,
  });
};

export const rateLimitter = ({ fn, options = RATE_LIMIT_CONFIGS.DEFAULT }: rateLimitterProps) => {
  // Crear una instancia de Ratelimit con las opciones proporcionadas o las predeterminadas
  const ratelimit = createRatelimit(options);

  return async (req: NextRequest, context: unknown) => {

    const user = await currentUser()

    if (!user || !user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Incluir el identificador del endpoint en la clave si está definido
    const endpointIdentifier = options.identifier ? `:${options.identifier}` : '';
    const userKey = `user:${user.id}${endpointIdentifier}`
    const { success, limit, reset, remaining } = await ratelimit.limit(userKey);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "Retry-After": String(reset),
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    return fn(req, context);
  };
};
