// Landing components
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import { Footer } from "@/components/ui/layout/Footer";
import Value from "@/components/landing/Value";
import FAQ from "@/components/landing/FAQ";
import type { Metadata } from "next";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/schema";

/**
 * Metadatos SEO optimizados para la landing page
 * Incluye schemas JSON-LD para rich snippets en Google
 */
export function generateMetadata(): Metadata {
  return {
    title:
      "Memory Ninja - Crea tarjetas de estudio con IA | La forma más rápida de aprender",
    description:
      "Genera tarjetas de estudio personalizadas con inteligencia artificial. Optimiza tu tiempo de estudio con Memory Ninja, la herramienta definitiva para estudiantes.",
    keywords: [
      "tarjetas de estudio",
      "generador de tarjetas",
      "IA",
      "aprendizaje",
      "educación",
      "memoria",
      "estudio",
      "flashcards",
      "inteligencia artificial",
    ],
    other: {
      "organization-schema": JSON.stringify(generateOrganizationSchema()),
      "website-schema": JSON.stringify(generateWebsiteSchema()),
    },
  };
}

export default function Home() {
  // Composición de la landing page con estructura semántica mejorada
  return (
    <main itemScope itemType="https://schema.org/WebPage">
      <Header />
      <article>
        <section id="hero" aria-label="Introducción a Memory Ninja">
          <Hero />
        </section>
        <section id="valor" aria-label="El valor de Memory Ninja">
          <Value />
        </section>
        <section id="como-funciona" aria-label="Cómo funciona Memory Ninja">
          <HowItWorks />
        </section>
        <section id="precios" aria-label="Planes y precios">
          <Pricing />
        </section>
        <section id="faq" aria-label="Preguntas frecuentes">
          <FAQ />
        </section>
      </article>
      <Footer />
    </main>
  );
}
