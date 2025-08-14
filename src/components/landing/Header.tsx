import React from "react"; // Icono hamburguesa de Lucide
import Link from "next/link";

/**
 * Header principal de la landing page.
 * - Sticky, fondo blur, responsivo.
 * - Logo + nombre, navegación y botón 'Comenzar'.
 * - Menú hamburguesa en mobile.
 */
export const Header = () => {
  return (
    <header
      className="sticky top-0 z-30 w-full backdrop-blur bg-[#05264f]/80 border-b border-blue-900/30"
      role="banner"
    >
      <nav
        className="container mx-auto flex items-center justify-between py-4 px-2 md:px-4"
        aria-label="Main navigation"
      >
        {/* Logo y nombre */}
        <div className="flex items-center gap-2">
          <img
            src="/memory-ninja-icon-2.webp"
            alt="Logo MemoryNinja"
            className="h-10 w-10 rounded-lg"
          />
          <Link href="#hero" className="text-white text-xl font-bold">
            <span className="text-white text-xl font-bold tracking-tight select-none">
              MemoryNinja
            </span>
          </Link>
        </div>
        {/* Navegación desktop */}
        <ul className="hidden md:flex gap-8 text-gray-200 text-base font-medium">
          <li>
            <a
              href="#features"
              className="hover:text-blue-300 transition-colors focus:outline-none focus:text-blue-400"
              tabIndex={0}
              aria-label="Características"
            >
              Características
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="hover:text-blue-300 transition-colors focus:outline-none focus:text-blue-400"
              tabIndex={0}
              aria-label="Precios"
            >
              Precios
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="hover:text-blue-300 transition-colors focus:outline-none focus:text-blue-400"
              tabIndex={0}
              aria-label="Preguntas frecuentes"
            >
              FAQ
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
