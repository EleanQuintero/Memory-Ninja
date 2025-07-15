import { ReactScan } from "@/components/scan/ReactScan";
import type { Metadata } from "next";
import "./globals.css";
import { sfPro } from "@/utils/fonts/sfPro";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

export const metadata: Metadata = {
  title: "FlashCard Generator",
  description: "Generador de tarjetas de estudio con IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="en" className="dark">
      <ReactScan />
        <body className={` ${sfPro.className} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
