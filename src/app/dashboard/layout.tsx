import type { Metadata } from "next";
import "@/app/globals.css";
import { sfPro } from "@/utils/fonts";

import { ClerkProvider, Protect } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import SubscriptionFallback from "@/components/fallbacks/subscription";

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
       <Protect plan={"pro_user"} fallback={<SubscriptionFallback />}>
       
      <section className="grid grid-cols-[auto,1fr] min-h-screen">
        <SidebarProvider>
          <aside>
            <AppSidebar />
          </aside>
          <main
            className={` ${sfPro.className} antialiased dark flex flex-col w-full p-4 bg-gray-100 dark:bg-gradient-to-br from-[#05264f] to-[#19324a] text-gray-900 dark:text-white`}
          >
            <div>
              <SidebarTrigger />
            </div>
            {children}
          </main>
        </SidebarProvider>
      </section>
      </Protect>
    </ClerkProvider>
  );
}
