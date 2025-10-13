import type { Metadata } from "next";
import "@/app/globals.css";
import { sfPro } from "@/utils/fonts/sfPro";

import { ClerkProvider, Protect } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import SubscriptionFallback from "@/components/fallbacks/subscription";
import { Provider } from "@/components/provider/Provider";
import { Toaster } from "sonner";
import { LazyMotion, domAnimation } from "motion/react";
import { PageTransition } from "@/components/ui/page-transition";

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
      <Protect fallback={<SubscriptionFallback />}>
        <section className="grid grid-cols-[auto,1fr]">
          <Provider>
            <SidebarProvider>
              <aside>
                <AppSidebar />
              </aside>
              <main
                className={` ${sfPro.className} antialiased dark  w-full h-full  bg-gray-100 dark:bg-gradient-to-br from-[#05264f] to-[#19324a] text-gray-900 dark:text-white`}
              >
                <div>
                  <SidebarTrigger />
                </div>
                <LazyMotion features={domAnimation}>
                  <PageTransition>{children}</PageTransition>
                </LazyMotion>
              </main>
              <Toaster />
            </SidebarProvider>
          </Provider>
        </section>
      </Protect>
    </ClerkProvider>
  );
}
