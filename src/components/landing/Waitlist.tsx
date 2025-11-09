"use client";
import React from "react";

/**
 * Waitlist (Landing)
 * - Mensaje de agradecimiento indicando que la waitlist está cerrada
 * - Acorde a la paleta de la landing (azules oscuros, bordes redondeados, blur) y totalmente responsive.
 */
const Waitlist: React.FC = () => {
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
          <div className="flex justify-center mb-6">
            {/* Logo o icono */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dygwnv56x/image/upload/v1755253305/memory-ninja-icon-2_peisgm.webp"
              alt="MemoryNinja Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
          </div>

          <h2
            id="waitlist-heading"
            className="text-[1.75rem] sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            ¡Gracias por tu interés en MemoryNinja!
          </h2>
        </div>

        {/* Card contenedora */}
        <div className="max-w-2xl mx-auto bg-[#0a3060]/60 backdrop-blur-sm border border-blue-400/20 rounded-2xl shadow-xl shadow-blue-500/10 p-6 sm:p-8 md:p-10">
          <p className="text-base sm:text-lg text-gray-300/90 mb-6 text-center">
            La lista de espera está cerrada. Hemos alcanzado la capacidad
            esperada y estamos trabajando arduamente para perfeccionar cada
            detalle de MemoryNinja.
          </p>

          <p className="text-base sm:text-lg text-gray-300/90 mb-6 text-center">
            <strong className="text-white">
              El proyecto pronto estará disponible para todos.
            </strong>{" "}
            Mantente atento a nuestras actualizaciones y prepárate para
            revolucionar tu forma de estudiar.
          </p>

          <p className="text-base sm:text-lg text-gray-300/90 text-center">
            Si tienes alguna pregunta, no dudes en contactarnos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
