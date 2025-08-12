/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

// Tipos de configuración
interface RateLimitOptions {
  requests: number;
  duration: string;
  identifier?: string;
}

// Configuraciones predeterminadas
export const RATE_LIMIT_CONFIGS = {
  DEFAULT: { requests: 5, duration: "60s" },
  DASHBOARD: { requests: 20, duration: "60s" },
  AUTH: { requests: 3, duration: "60s" },
  READ: { requests: 20, duration: "60s" },
  WRITE: { requests: 10, duration: "60s" }
};

// Props del limitador
interface RateLimiterProps {
  fn: (
    req: NextRequest,
    context: { params?: Record<string, string> }
  ) => Promise<NextResponse>;
  options?: RateLimitOptions;
}

// Crear instancia de Ratelimit
const createRatelimit = (options: RateLimitOptions) => {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      options.requests,
      options.duration as any
    ),
    analytics: true,
    timeout: 10000,
  });
};

// Middleware de rate limit
export const rateLimitter = ({
  fn,
  options = RATE_LIMIT_CONFIGS.DEFAULT,
}: RateLimiterProps) => {
  const ratelimit = createRatelimit(options);

  return async (
    req: NextRequest,
    context: { params?: Record<string, string> }
  ) => {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const endpointIdentifier = options.identifier
      ? `:${options.identifier}`
      : "";
    const userKey = `user:${user.id}${endpointIdentifier}`;
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
