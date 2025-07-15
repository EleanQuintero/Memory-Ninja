import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
interface rateLimitterProps {
  fn: (req: NextRequest, context: unknown) => Promise<NextResponse>;
}

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60s"),
  analytics: true,
  timeout: 10000,
});

export const rateLimitter = ({ fn }: rateLimitterProps) => {
  return async (req: NextRequest, context: unknown) => {

    const user = await currentUser()

    if (!user || !user.id) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }

    const userKey = `user: ${user.id}`
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
