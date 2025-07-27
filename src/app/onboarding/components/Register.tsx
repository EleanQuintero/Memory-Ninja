"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Register() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Crea tu cuenta</CardTitle>
        <CardDescription className="text-center">
          Únete a la comunidad de ninjas del estudio
        </CardDescription>
      </CardHeader>
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
              colorPrimary: "#6366F1", // Color primario
              colorText: "#FFFFFF", // Color del texto
              colorBackground: "#1F2937", // Fondo oscuro
            },
            baseTheme: dark,
            elements: {
              formButtonPrimary:
                "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
              card: "bg-transparent shadow-none",
              footer: "hidden",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
