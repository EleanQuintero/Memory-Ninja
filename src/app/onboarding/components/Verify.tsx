"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";

export default function Verify() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { emailAddresses } = user || {};
  const { signOut } = useClerk();

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
    <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl text-center">
      <CardHeader>
        <CardTitle>Verificación de Email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            Por favor, verifica tu email para continuar.
            {emailAddresses?.[0]?.emailAddress && (
              <span className="block text-blue-400 font-medium mt-1">
                ({emailAddresses[0].emailAddress})
              </span>
            )}
          </p>
        </div>

        <Button
          onClick={handleSignOut}
          variant="ghost"
          size="sm"
          className="w-full text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-3 w-3" />
          Cambiar correo electrónico
        </Button>
      </CardContent>
    </Card>
  );
}
