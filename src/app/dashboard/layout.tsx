import type { Metadata } from "next";
import "@/app/globals.css";
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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export const metadata: Metadata = {
  title: "FlashCard Generator",
  description: "Generador de tarjetas de estudio con IA",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <section className="grid grid-cols-[auto,1fr] min-h-screen">
        <SidebarProvider>
          <aside>
            <AppSidebar />
          </aside>
          <main
            className={` ${notoSerif.className} font-extrabold antialiased dark flex flex-col w-full p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}
          >
            <div>
              <SidebarTrigger />
            </div>
            {children}
          </main>
        </SidebarProvider>
      </section>
    </ClerkProvider>
  );
}
