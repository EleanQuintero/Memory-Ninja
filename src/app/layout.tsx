import type { Metadata } from "next";
import "./globals.css";
import { notoSerif } from "@/utils/fonts";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Footer } from "@/components/ui/layout/Footer";
import { esES } from "@clerk/localizations";
import Link from "next/link";

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
        <body className={` ${notoSerif.className} font-extrabold antialiased`}>
          <header>
            <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
              <Link href="/" className="text-2xl font-bold">
                <h2 className="text-2xl font-bold">FlashCard Generator</h2>
              </Link>
              <div className="flex space-x-4">
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal" />
                  <SignUpButton mode="modal" />
                </SignedOut>
              </div>
            </nav>
          </header>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
