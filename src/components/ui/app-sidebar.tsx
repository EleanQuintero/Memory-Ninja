"use client";
import Link from "next/link";

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
import { Home, CirclePlus, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  sidebarMenuContainerVariants,
  sidebarMenuItemVariants,
  sidebarIconVariants,
  userButtonVariants,
  sidebarMenuTextVariants,
} from "@/animations/utils";
import { useReducedMotion } from "@/animations/hooks/useReducedMotion";
import { usePathname } from "next/navigation";

// Menu items.

export function AppSidebar() {
  const shouldReduceMotion = useReducedMotion();
  const { state } = useSidebar();
  const pathname = usePathname();

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
                  <div className="flex flex-row items-center justify-center gap-3">
                    <h3>Mi perfil</h3>
                    <UserButton />
                  </div>
                </motion.div>

                {/* Menu Items con stagger */}
                {items.map((item, index) => {
                  const isActive = pathname === item.url;

                  return (
                    <motion.div
                      key={item.title}
                      variants={menuItemVariants}
                      custom={index}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link
                            href={item.url}
                            className={isActive ? "text-chart-1" : ""}
                          >
                            {/* Icono animado */}
                            <motion.div
                              variants={iconVariants}
                              initial="idle"
                              whileHover="hover"
                              whileTap="tap"
                              className={isActive ? "text-chart-1" : ""}
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
                                  className={
                                    isActive ? "text-chart-1 font-semibold" : ""
                                  }
                                >
                                  {item.title}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </motion.div>
                  );
                })}
              </SidebarMenu>
            </motion.div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
