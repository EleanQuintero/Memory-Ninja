import type { Metadata } from "next";
import "@/app/globals.css";
import { sfPro } from "@/utils/fonts/sfPro";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { LazyMotion, domAnimation } from "motion/react";

export const metadata: Metadata = {
  title: "Memory Ninja - Generador de tarjetas de estudio con IA",
  description:
    "Crea tarjetas de estudio personalizadas con IA para mejorar tu aprendizaje y retención de información.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="en" className="dark">
        <body className={` ${sfPro.className} antialiased`}>
          <LazyMotion features={domAnimation}>{children}</LazyMotion>
        </body>
      </html>
    </ClerkProvider>
  );
}
