import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { sfPro } from "@/utils/fonts/sfPro";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import SchemaScripts from "@/lib/schema-scripts";

export const metadata: Metadata = {
  title:
    "Memory Ninja - Generador de tarjetas de estudio con IA | Aprende más rápido",
  description:
    "Crea tarjetas de estudio personalizadas con inteligencia artificial para mejorar tu aprendizaje y retención de información. Optimiza tu tiempo de estudio y mejora tus resultados académicos.",
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
    "técnicas de memorización",
    "spaced repetition",
    "repetición espaciada",
    "aprendizaje efectivo",
    "estudiantes",
    "universidad",
    "exámenes",
    "herramienta educativa",
  ],
  authors: [{ name: "Memory Ninja", url: "https://www.memoryninja.es" }],
  creator: "Memory Ninja",
  publisher: "Memory Ninja",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://www.memoryninja.es"),
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
    },
  },
  openGraph: {
    title: "Memory Ninja - Generador de tarjetas de estudio con IA",
    description:
      "Crea tarjetas de estudio personalizadas con inteligencia artificial para mejorar tu aprendizaje y retención de información.",
    url: "https://www.memoryninja.es",
    siteName: "Memory Ninja",
    images: [
      {
        url: "https://res.cloudinary.com/dygwnv56x/image/upload/v1755253453/favicon_dim9e8.png",
        width: 1200,
        height: 630,
        alt: "Memory Ninja - Generador de tarjetas de estudio con IA",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memory Ninja - Generador de tarjetas de estudio con IA",
    description:
      "Crea tarjetas de estudio personalizadas con inteligencia artificial para mejorar tu aprendizaje y retención de información.",
    images: [
      "https://res.cloudinary.com/dygwnv56x/image/upload/v1755253453/favicon_dim9e8.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verificación-google", // Reemplazar con tu código de verificación
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <Analytics />
      <html lang="es" className="dark">
        <head>
          <link rel="canonical" href="https://www.memoryninja.es" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#111827" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            httpEquiv="Content-Security-Policy"
            content="frame-ancestors 'self' https://clerk.clerk.app https://*.clerk.accounts.dev;"
          />
          <SchemaScripts />
        </head>
        <body className={` ${sfPro.className} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
