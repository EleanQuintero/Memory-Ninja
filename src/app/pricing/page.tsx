"use client";

import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  PricingTable,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Sparkles, Zap, Home } from "lucide-react";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  onboardingCardVariants,
  onboardingContentVariants,
} from "@/animations/onboardingVariants";

export default function PricingPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto max-w-5xl flex items-center justify-between p-4">
          <Button variant="ghost" asChild className="hover:bg-muted/50">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="font-semibold">Inicio</span>
            </Link>
          </Button>

          <div className="flex items-center gap-3">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                    userButtonPopoverCard: "shadow-xl",
                    userButtonPopoverActionButton: "hover:bg-muted",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Iniciar sesión
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Registrarse
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <motion.div
          variants={onboardingCardVariants}
          initial="hidden"
          animate="visible"
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
                <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Actualiza tu plan
                </CardTitle>
              </motion.div>
              <motion.div variants={onboardingContentVariants}>
                <CardDescription className="text-base md:text-lg mt-2">
                  Desbloquea todo el potencial de Flashcards Gen con el plan Pro
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
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional info section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center space-y-3"
        >
          <SignedOut>
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <SignInButton mode="modal">
                <button className="text-purple-500 hover:text-purple-600 underline underline-offset-2 font-medium">
                  Inicia sesión aquí
                </button>
              </SignInButton>
            </p>
          </SignedOut>
          <p className="text-sm text-muted-foreground">
            ¿Tienes preguntas? Contáctanos en{" "}
            <a
              href="mailto:support@memoryninja.es"
              className="text-purple-500 hover:text-purple-600 underline underline-offset-2"
            >
              support@memoryninja.es
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
