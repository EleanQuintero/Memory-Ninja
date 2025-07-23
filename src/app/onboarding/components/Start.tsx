"use client";

import { Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Start() {
  return (
    <div className="flex flex-col items-center text-center space-y-8 p-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <Brain className="h-12 w-12 text-white" />
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold">
          Estudia de forma{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            ninja
          </span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Domina cualquier tema con flashcards inteligentes y técnicas de
          memorización avanzadas
        </p>
      </div>

      <div className="w-full space-y-4 pt-4">
        <Button
          asChild
          className="w-full text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          size="lg"
        >
          <Link href="/onboarding/register">
            <Zap className="mr-2 h-5 w-5" />
            Comenzar ahora
          </Link>
        </Button>

        <div className="text-sm text-muted-foreground">
          <span>¿Ya tienes cuenta? </span>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="ml-1 border-border hover:bg-accent hover:text-accent-foreground"
          >
            <Link href="/onboarding/sign-in">Inicia sesión</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
