"use client";

import SubscriptionFallback from "@/components/fallbacks/subscription";
import { Generator } from "@/app/dashboard/generate/components/generator/Generator";
import { Protect } from "@clerk/nextjs";

export default function GeneratorPage() {
  return (
    <Protect plan={"pro_user"} fallback={<SubscriptionFallback />}>
      <section className="flex flex-col items-center justify-center gap-27  min-h-screen">
        <Generator />
      </section>

    </Protect>
  );
}
