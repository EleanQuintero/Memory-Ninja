// Landing components
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import { Footer } from "@/components/ui/layout/Footer";

export default function Home() {
  // Composición de la landing page
  return (
    <>
      {/* Header sticky y navegación */}
      <Header />
      {/* Hero principal */}
      <Hero />
      {/* Sección de cómo funciona */}
      <HowItWorks />
      <Pricing />
      {/* Footer global */}
      <Footer />
    </>
  );
}
