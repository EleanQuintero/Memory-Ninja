"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { UserButton } from "@clerk/nextjs";
import { Home, Search, CirclePlus, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  sidebarMenuContainerVariants,
  sidebarMenuItemVariants,
  sidebarIconVariants,
  userButtonVariants,
  sidebarMenuTextVariants,
} from "@/animations/utils";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";

// Menu items.
import Link from "next/link";

export function AppSidebar() {
  const shouldReduceMotion = useReducedMotion();
  const { state } = useSidebar();

  // Adaptar animaciones según accesibilidad
  const menuContainerVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : sidebarMenuContainerVariants;

  const menuItemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : sidebarMenuItemVariants;

  const iconVariants = shouldReduceMotion ? {} : sidebarIconVariants;

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
            <motion.div
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <SidebarMenu>
                {/* UserButton con animación especial */}
                <motion.div
                  variants={shouldReduceMotion ? {} : userButtonVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-row ml-2.5 mb-4"
                >
                  <UserButton />
                </motion.div>

                {/* Menu Items con stagger */}
                {items.map((item, index) => (
                  <motion.div
                    key={item.title}
                    variants={menuItemVariants}
                    custom={index}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          {/* Icono animado */}
                          <motion.div
                            variants={iconVariants}
                            initial="idle"
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <item.icon />
                          </motion.div>

                          {/* Texto con AnimatePresence para collapsed state */}
                          <AnimatePresence mode="wait">
                            {state === "expanded" && (
                              <motion.span
                                variants={sidebarMenuTextVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                              >
                                {item.title}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </motion.div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
