"use client";
import {
  Home,
  BookOpen,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut,
  PlusCircle,
  Users,
} from "lucide-react";
import { cn } from "@/utils/services/functions/helpers/cnFunction";

export const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: "Inicio", active: true },
    { icon: <BookOpen size={20} />, label: "Mis Mazos" },
    { icon: <PlusCircle size={20} />, label: "Crear Mazo" },
    { icon: <TrendingUp size={20} />, label: "Estadísticas" },
    { icon: <Users size={20} />, label: "Comunidad" },
  ];
  const bottomItems = [
    { icon: <Settings size={20} />, label: "Ajustes" },
    { icon: <HelpCircle size={20} />, label: "Ayuda" },
    { icon: <LogOut size={20} />, label: "Cerrar Sesión" },
  ];
  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 h-full flex flex-col">
      {/* Perfil de usuario */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            AM
          </div>
          <div>
            <h3 className="font-medium text-white">Ana Martínez</h3>
            <p className="text-sm text-gray-400">Estudiante</p>
          </div>
        </div>
      </div>
      {/* Navegación */}
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg",
                  item.active
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                )}
                tabIndex={0}
                aria-label={item.label}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* Menú inferior */}
      <div className="p-3 border-t border-gray-700">
        <ul className="space-y-1">
          {bottomItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white"
                tabIndex={0}
                aria-label={item.label}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
