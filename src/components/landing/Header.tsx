"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "motion/react";
import {
  headerVariants,
  menuItemVariants,
  mobileMenuVariants,
} from "@/animations/utils";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";

/**
 * Header principal de la landing page.
 * - Sticky, fondo blur, responsivo.
 * - Logo + nombre, navegación y botón 'Comenzar'.
 * - Menú hamburguesa en mobile.
 */
export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Datos de navegación
  const navItems = [
    { href: "#features", label: "Características" },
    { href: "#pricing", label: "Precios" },
  ];

  // Adaptar variants según accesibilidad
  const currentHeaderVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : headerVariants;

  const currentMenuVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : menuItemVariants;

  return (
    <motion.header
      variants={currentHeaderVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-30 w-full backdrop-blur bg-[#05264f]/80 border-b border-blue-900/30"
      role="banner"
    >
      <nav
        className="container mx-auto flex items-center justify-between py-4 px-2 md:px-4"
        aria-label="Main navigation"
      >
        {/* Logo y nombre - ANIMADO */}
        <motion.div
          variants={currentMenuVariants}
          className="flex items-center gap-2"
        >
          <motion.img
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 5 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            src="/memory-ninja-icon-2.png"
            alt="Logo MemoryNinja"
            className="h-10 w-10 rounded-lg"
            transition={{ duration: 0.2 }}
          />
          <Link href="#hero" className="text-white text-xl font-bold">
            <motion.span
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              className="text-white text-xl font-bold tracking-tight select-none"
              transition={{ duration: 0.2 }}
            >
              MemoryNinja
            </motion.span>
          </Link>
        </motion.div>

        {/* Navegación desktop con stagger - ANIMADA */}
        <motion.ul
          variants={currentHeaderVariants}
          className="hidden md:flex gap-8 text-gray-200 text-base font-medium"
        >
          {navItems.map((item, index) => (
            <motion.li key={item.href} variants={currentMenuVariants}>
              <motion.a
                href={item.href}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.05,
                        color: "#93c5fd",
                        transition: { duration: 0.2 },
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="hover:text-blue-300 transition-colors focus:outline-none focus:text-blue-400"
                tabIndex={0}
                aria-label={item.label}
              >
                {item.label}
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Botones desktop - ANIMADOS */}
        <motion.div
          variants={currentMenuVariants}
          className="hidden gap-x-5 md:flex"
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            <Button
              size={"lg"}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              tabIndex={0}
              aria-label="Comenzar"
            >
              <Link href="/onboarding" tabIndex={0} aria-label="Iniciar sesión">
                Comenzar
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            <Button
              size={"lg"}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              asChild
            >
              <Link href="/sign-in" tabIndex={0} aria-label="Iniciar sesión">
                Iniciar sesión
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Menú hamburguesa en mobile - ANIMADO */}
        <motion.button
          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Abrir menú de navegación"
          tabIndex={0}
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    rotate: isMobileMenuOpen ? 45 : 0,
                  }
            }
            transition={{ duration: 0.2 }}
          >
            <Menu size={28} />
          </motion.div>
        </motion.button>
      </nav>

      {/* Mobile menu overlay - NUEVO */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              variants={shouldReduceMotion ? {} : mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-full right-0 w-64 bg-[#05264f] border-l border-blue-900/30 z-50 md:hidden"
            >
              <motion.div className="p-6 space-y-6">
                {/* Navigation Items */}
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={currentMenuVariants}
                    custom={index}
                  >
                    <motion.a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={shouldReduceMotion ? {} : { x: 5 }}
                      className="block text-white text-lg font-medium hover:text-blue-300 transition-colors"
                    >
                      {item.label}
                    </motion.a>
                  </motion.div>
                ))}

                {/* Mobile Buttons */}
                <motion.div
                  variants={currentMenuVariants}
                  className="space-y-4 pt-4"
                >
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    asChild
                  >
                    <Link href="/onboarding">Comenzar</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/sign-in">Iniciar sesión</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
