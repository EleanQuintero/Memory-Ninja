import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WithoutData() {
  return (
    <section className="relative flex flex-col w-full h-screen">
      {/* Header fijo en la parte superior */}
      <div className="flex justify-center items-center py-8 px-10">
        <h1 className="text-2xl text-center font-bold text-white">
          Bienvenido a tu Espacio de MemoryNinja 🥷🏻
        </h1>
      </div>

      {/* Contenido principal centrado */}
      <div className="flex-1 flex flex-col justify-center items-center px-10">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Parece que aun no tienes ninguna tarjeta creada... ☹️
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold">
            ¡Empieza creando tu primera tarjeta ahora!
          </h3>
        </div>
      </div>

      {/* Botón en esquina inferior derecha */}
      <div className="absolute bottom-8 right-8">
        <Button variant={"CTA"} size={"xl2"}>
          <Link href={"/dashboard/generate"} className="font-extrabold">
            Crear mi primera Tarjeta
          </Link>
        </Button>
      </div>
    </section>
  );
}
