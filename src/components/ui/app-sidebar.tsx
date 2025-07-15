import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { UserButton } from "@clerk/nextjs";
import {  Home,  Search, CirclePlus, CreditCard } from "lucide-react";



// Menu items.
import Link from "next/link";

export function AppSidebar() {
  const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Flashcards",
        url: "/dashboard/flashcards",
        icon: CreditCard,
    },
    {
        title: "Generate",
        url: "/dashboard/generate",
        icon: CirclePlus,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <UserButton />
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
