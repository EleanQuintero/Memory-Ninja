"use client";

import { SignIn } from "@clerk/nextjs";
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
        <CardTitle className="text-2xl text-center">Inicia Sesion</CardTitle>
        <CardDescription className="text-center">
          Accede a tu comunidad de ninjas del estudio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
              card: "bg-transparent shadow-none",
              footer: "hidden",
            },
          }}
          afterSignInUrl="/dashboard"
        />
      </CardContent>
    </Card>
  );
}
