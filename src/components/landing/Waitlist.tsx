"use client";
import React from "react";
import { Waitlist as ClerkWaitlist } from "@clerk/nextjs";

/**
 * Waitlist (Landing)
 * - Wrapper estilizado del componente `Waitlist` de Clerk.
 * - Acorde a la paleta de la landing (azules oscuros, bordes redondeados, blur) y totalmente responsive.
 */
const Waitlist: React.FC = () => {
  const appearance = {
    variables: {
      colorPrimary: "#3b82f6", // blue-500
      colorBackground: "#0a3060",
      colorText: "#ffffff",
      borderRadius: "0.75rem",
      fontSize: "15px",
    },
    elements: {
      // Hacemos el card interno transparente para evitar doble card y controlar el layout desde fuera
      card: "bg-transparent shadow-none border-0 p-0",
      header: "hidden",
      headerTitle: "hidden",
      headerSubtitle: "hidden",
      formButtonPrimary:
        "bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl h-12 px-5 w-full sm:w-auto",
      formFieldInput:
        "bg-[#061a36] border-blue-400/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400/40 rounded-xl h-12 px-4",
      formFieldLabel: "text-gray-200 mb-1",
      footer: "text-gray-400/80 text-xs mt-3",
      footerActionText: "text-gray-300",
      footerActionLink: "text-blue-300 hover:text-blue-200",
    },
  } as const;

  return (
    <section
      id="waitlist"
      className="relative py-16 sm:py-20 md:py-24 bg-transparent"
      aria-labelledby="waitlist-heading"
    >
      {/* Fondos suaves (coherentes con el Hero) */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-10 left-10 w-56 h-56 bg-blue-400/10 rounded-full blur-3xl hidden sm:block" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl hidden sm:block" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
          <h2
            id="waitlist-heading"
            className="text-[1.75rem] sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            Únete a la lista de espera
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300/90 max-w-xl mx-auto">
            Sé de los primeros en probar MemoryNinja. Te avisaremos cuando
            abramos el acceso y te enviaremos novedades clave del producto.
          </p>
        </div>

        {/* Card contenedora */}
        <div className="max-w-2xl flex flex-col justify-center items-center mx-auto bg-[#0a3060]/60 backdrop-blur-sm border border-blue-400/20 rounded-2xl shadow-xl shadow-blue-500/10 p-4 sm:p-6 md:p-8">
          {/* Clerk Waitlist embed */}
          <div className="[&_*]:!font-medium">
            <ClerkWaitlist
              appearance={appearance}
              afterJoinWaitlistUrl="/thank-you"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
