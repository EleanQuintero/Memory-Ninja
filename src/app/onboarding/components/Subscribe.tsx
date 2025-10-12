"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PricingTable } from "@clerk/nextjs";
import { Sparkles, Zap } from "lucide-react";
import {
  onboardingCardVariants,
  onboardingContentVariants,
} from "@/animations/onboardingVariants";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";

export default function Subscribe() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={onboardingCardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl relative overflow-hidden">
        {/* Decorative animated gradient */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </>
        )}

        <CardHeader className="text-center relative z-10">
          <motion.div variants={onboardingContentVariants}>
            <motion.div
              className="flex justify-center mb-3"
              animate={
                !shouldReduceMotion
                  ? {
                      rotate: [0, 5, -5, 0],
                    }
                  : {}
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                <Sparkles className="w-10 h-10 text-purple-500" />
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                )}
              </div>
            </motion.div>
            <CardTitle className="text-2xl">Elige tu plan</CardTitle>
          </motion.div>
          <motion.div variants={onboardingContentVariants}>
            <CardDescription>
              Selecciona el plan que mejor se adapte a tus necesidades
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="relative z-10">
          <motion.div variants={onboardingContentVariants}>
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
                    base: "bg-muted/30 border-border hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02]",
                    highlighted:
                      "border-purple-500 bg-muted/70 shadow-lg shadow-purple-500/30",
                  },
                  button: {
                    base: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105",
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
                    base: "bg-purple-600 text-white shadow-lg shadow-purple-500/50",
                  },
                },
              }}
              newSubscriptionRedirectUrl="/onboarding/finished"
            />
          </motion.div>

          <motion.div
            variants={onboardingContentVariants}
            className="flex flex-row items-end justify-end"
          >
            <motion.div
              whileHover={
                !shouldReduceMotion
                  ? {
                      scale: 1.05,
                      x: 5,
                    }
                  : {}
              }
              whileTap={
                !shouldReduceMotion
                  ? {
                      scale: 0.95,
                    }
                  : {}
              }
            >
              <Button
                variant="onboarding"
                size={"sm"}
                className="mt-4 relative group overflow-hidden"
              >
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />
                )}
                <a
                  className="text-xs relative z-10"
                  href="/onboarding/finished"
                >
                  Continuar con el plan gratuito →
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
