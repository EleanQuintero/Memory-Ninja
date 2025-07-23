import React from "react";
import { Menu } from "lucide-react"; // Icono hamburguesa de Lucide
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
            src="/memory-ninja-card-logo.png"
            alt="Logo MemoryNinja"
            className="h-10 w-10 rounded-lg"
          />
          <span className="text-white text-xl font-bold tracking-tight select-none">
            MemoryNinja
          </span>
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
              href="/pricing"
              className="hover:text-blue-300 transition-colors focus:outline-none focus:text-blue-400"
              tabIndex={0}
              aria-label="Precios"
            >
              Precios
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="hover:text-blue-300 transition-colors focus:outline-none focus:text-blue-400"
              tabIndex={0}
              aria-label="Testimonios"
            >
              Testimonios
            </a>
          </li>
          <li>
            <Link
              href="/sign-in"
              className="bg-blue-500 hover:bg-blue- 600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              tabIndex={0}
              aria-label="Iniciar sesión"
            >
              Iniciar sesión
            </Link>
          </li>
        </ul>
        {/* Botón Comenzar (solo desktop) */}
        <div className="hidden md:block">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            tabIndex={0}
            aria-label="Comenzar"
          >
            Comenzar
          </button>
        </div>
        {/* Menú hamburguesa en mobile */}
        <button
          className="md:hidden text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Abrir menú de navegación"
          tabIndex={0}
        >
          <Menu size={28} />
        </button>
      </nav>
    </header>
  );
};
