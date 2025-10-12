"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  onboardingCardVariants,
  onboardingContentVariants,
} from "@/animations/onboardingVariants";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";

export default function Verify() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { emailAddresses } = user || {};
  const { signOut } = useClerk();
  const shouldReduceMotion = useReducedMotion();

  // Redirigir si ya está verificado
  if (
    isLoaded &&
    user?.emailAddresses?.[0]?.verification?.status === "verified"
  ) {
    router.push("/onboarding/subscribe");
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/onboarding/register");
  };

  return (
    <motion.div
      variants={onboardingCardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl text-center">
        <CardHeader>
          <motion.div variants={onboardingContentVariants}>
            <motion.div
              className="flex justify-center mb-4"
              animate={
                !shouldReduceMotion
                  ? {
                      y: [0, -5, 0],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                <Mail className="w-16 h-16 text-blue-500" />
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 15, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                )}
              </div>
            </motion.div>
            <CardTitle className="text-2xl">Verificación de Email</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            className="p-4 bg-muted/50 rounded-lg border border-border relative overflow-hidden"
            variants={onboardingContentVariants}
          >
            {!shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
            <p className="text-sm text-muted-foreground relative z-10">
              Por favor, verifica tu email para continuar.
              {emailAddresses?.[0]?.emailAddress && (
                <motion.span
                  className="block text-blue-400 font-medium mt-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  📧 {emailAddresses[0].emailAddress}
                </motion.span>
              )}
            </p>
          </motion.div>

          <motion.div
            variants={onboardingContentVariants}
            className="space-y-2"
          >
            <motion.p
              className="text-xs text-muted-foreground flex items-center justify-center gap-1.5"
              animate={
                !shouldReduceMotion
                  ? {
                      opacity: [0.5, 1, 0.5],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.span
                animate={
                  !shouldReduceMotion
                    ? {
                        rotate: [0, 360],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                ⏳
              </motion.span>
              Esperando verificación...
            </motion.p>
          </motion.div>

          <motion.div variants={onboardingContentVariants}>
            <motion.div
              whileHover={
                !shouldReduceMotion
                  ? {
                      scale: 1.02,
                      x: -5,
                    }
                  : {}
              }
              whileTap={
                !shouldReduceMotion
                  ? {
                      scale: 0.98,
                    }
                  : {}
              }
            >
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cambiar correo electrónico
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
