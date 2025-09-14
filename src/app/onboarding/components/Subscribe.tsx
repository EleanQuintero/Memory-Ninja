"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PricingTable } from "@clerk/nextjs";

export default function Subscribe() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
      <CardHeader className="text-center">
        <CardTitle>Elige tu plan</CardTitle>
        <CardDescription>
          Selecciona el plan que mejor se adapte a tus necesidades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PricingTable
          appearance={{
            variables: {
              colorPrimary: "#8b5cf6", // purple-500
              colorText: "rgb(var(--foreground))",
              colorTextSecondary: "rgb(var(--muted-foreground))",
              colorBackground: "rgb(var(--background))",
              colorDanger: "#ef4444",
              borderRadius: "0.5rem",
            },
            elements: {
              rootBox: "w-full",
              card: {
                base: "bg-muted/30 border-border hover:border-purple-500 transition-all duration-200",
                highlighted: "border-purple-500 bg-muted/70",
              },
              button: {
                base: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium",
              },
              header: {
                base: "text-foreground",
              },
              price: {
                base: "text-foreground font-bold",
                duration: "text-muted-foreground",
              },
              featuresContainer: "text-muted-foreground",
              feature: {
                included: "text-foreground",
                missing: "text-muted-foreground opacity-50",
              },
              badge: {
                base: "bg-purple-600 text-white",
              },
            },
          }}
          newSubscriptionRedirectUrl="/onboarding/finished"
        />
        <div className="flex flex-row items-end justify-end">
          <Button variant="onboarding" size={"sm"} className="mt-4">
            <a className="text-xs" href="/onboarding/finished">
              Continuar con el plan gratuito
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
