"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  onboardingCardVariants,
  onboardingContentVariants,
} from "@/animations/onboardingVariants";

export default function Register() {
  return (
    <motion.div
      variants={onboardingCardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
        <CardHeader className="space-y-1">
          <motion.div variants={onboardingContentVariants}>
            <CardTitle className="text-2xl text-center">
              Crea tu cuenta
            </CardTitle>
          </motion.div>
          <motion.div variants={onboardingContentVariants}>
            <CardDescription className="text-center">
              Únete a la comunidad de ninjas del estudio
            </CardDescription>
          </motion.div>
        </CardHeader>
        <motion.div variants={onboardingContentVariants}>
          <CardContent>
            <SignUp
              fallbackRedirectUrl={"/onboarding/subscribe"}
              oauthFlow="popup"
              appearance={{
                layout: {
                  animations: true,
                  socialButtonsVariant: "iconButton",
                  socialButtonsPlacement: "bottom",
                },
                variables: {
                  colorPrimary: "#6366F1",
                  colorText: "#FFFFFF",
                  colorBackground: "#1F2937",
                },
                baseTheme: dark,
                elements: {
                  formButtonPrimary:
                    "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30",
                  card: "bg-transparent shadow-none",
                  footer: "hidden",
                  socialButtonsIconButton:
                    "hover:scale-105 transition-transform duration-200",
                  formFieldInput:
                    "transition-all duration-200 focus:ring-2 focus:ring-blue-400/50",
                },
              }}
            />
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}
