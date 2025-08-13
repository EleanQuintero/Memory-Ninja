// Landing components
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import { Footer } from "@/components/ui/layout/Footer";
import Waitlist from "@/components/landing/Waitlist";
import type { Metadata } from "next";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/schema";

// Función unificada de metadatos para SEO
export function generateMetadata(): Metadata {
  return {
    title:
      "Memory Ninja - Crea tarjetas de estudio con IA | La forma más rápida de aprender",
    description:
      "Genera tarjetas de estudio personalizadas con inteligencia artificial. Optimiza tu tiempo de estudio con Memory Ninja, la herramienta definitiva para estudiantes.",
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
        <section id="como-funciona" aria-label="Cómo funciona Memory Ninja">
          <HowItWorks />
        </section>
        <section id="precios" aria-label="Planes y precios">
          <Pricing />
        </section>
        <section id="lista-espera" aria-label="Únete a nuestra lista de espera">
          <Waitlist />
        </section>
      </article>
      <Footer />
    </main>
  );
}
