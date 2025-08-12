import { ReactScan } from "@/components/scan/ReactScan";
import type { Metadata } from "next";
import "./globals.css";
import { sfPro } from "@/utils/fonts/sfPro";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

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
      <html lang="es" className="dark">
        <ReactScan />
        <body className={` ${sfPro.className} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
