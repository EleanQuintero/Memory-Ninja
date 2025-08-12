import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "¡Gracias por unirte! | MemoryNinja",
  description:
    "¡Gracias por unirte a la lista de espera de MemoryNinja! Te notificaremos cuando estemos listos para lanzar.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#030a17] via-[#051530] to-[#072554] text-white">
      {/* Fondos suaves (coherentes con el Hero) */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-10 left-10 w-56 h-56 bg-blue-400/10 rounded-full blur-3xl hidden sm:block" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl hidden sm:block" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            {/* Logo o icono */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/memory-ninja-icon-2.png"
              alt="MemoryNinja Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            ¡Gracias por unirte a MemoryNinja!
          </h1>

          <div className="max-w-2xl bg-[#0a3060]/60 backdrop-blur-sm border border-blue-400/20 rounded-2xl shadow-xl shadow-blue-500/10 p-6 sm:p-8 md:p-10 mx-auto mb-8">
            <p className="text-base sm:text-lg text-gray-300/90 mb-6">
              Has sido añadido a nuestra lista de espera. Te notificaremos tan
              pronto como abramos el acceso y te mantendremos informado sobre
              las novedades de MemoryNinja.
            </p>

            <p className="text-base sm:text-lg text-gray-300/90 mb-8">
              Mientras tanto, si tienes alguna pregunta, no dudes en
              contactarnos.
            </p>

            <Link href="/">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl h-12 px-5">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a la página principal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
