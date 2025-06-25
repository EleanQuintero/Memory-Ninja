"use client";
import { Button } from "@/components/ui/button";
import { CallToAction } from "@/components/ui/CallToAction";
import { Footer } from "@/components/ui/layout/Footer";
import { syncUser } from "@/utils/services/functions/api/postUserData";
import {
  PricingTable,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
export default function Home() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const postUserData = async () => {
      if (!isLoaded || !user || !user.createdAt) return;

      const userCreatedAt = new Date(user.createdAt).getTime();
      const now = Date.now();
      const isNewUser = now - userCreatedAt < 5000;

      if (!isNewUser) return;

      syncUser();
      alert("Usuario sincronizado con exito");
    };

    postUserData();
  }, [isLoaded, user]);

  return (
    <>
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
      <main className="grid grid-rows-[20px, 1fr, 1fr] gap-[32px] items-center sm:items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Bienvenido FlashCard Generator: tu solución para el aprendizaje
          optimizado con IA
        </h1>
        <section className="flex flex-row gap-4 p-4 text-center sm:text-left">
          <CallToAction
            title="Con IA FlashCard Generator"
            description="¡Llevaras tu aprendizaje al siguiente nivel!"
            showButton={true}
            url="#start-section"
          />
          <div className="with-[300px] h-[300px] sm:w-[600px] sm:h-[400px] ">
            <img
              src="/dashboardPreview.png"
              alt="FlashCard Generator Preview"
              className="w-full solid rounded-3xl"
              aspect-ratio="3/2"
            />
          </div>
        </section>
        <section
          id="start-section"
          className="flex flex-col items-center justify-center gap-4 p-4 text-center"
        >
          <h2 className="text-2xl font-bold">¿Cómo funciona?</h2>
          <p className="text-lg">
            Con Flashcard Generator conseguirás un flujo de estudio optimizado y
            mas rápido. Integrando toda la magia de la IA en el proceso de
            aprendizaje.
          </p>
          <p className="text-lg">
            Puedes establecer distintos temas, seleccionar el que mas te guste y
            empezar a generar tus flashcards! La IA te dará las respuestas para
            que aprendas al máximo, asi obtendrás los conceptos clave de esas
            dudas y podrás profundizar fácilmente
          </p>
        </section>
        <section className="flex flex-col items-center justify-center gap-4 p-4 text-center">
          <h1 className="text-2xl">¿Como empezar?</h1>
          <p className="text-xl">
            <span>Crea tu cuenta</span>, Elige un plan de suscripción y listo!
            Empieza a crear tus flashcards mientras optimizas al máximo tu
            aprendizaje
          </p>

          <div className="flex flex-col items-center justify-center gap-4 p-4 text-center">
            <h2 className="text-2xl font-bold">Planes de suscripción</h2>
            <PricingTable
              appearance={{
                variables: {
                  colorPrimary: "#4f46e5",
                  colorText: "#111827",
                },
                elements: {
                  card: "shadow-lg rounded-md",
                  header: "text-xl font-semibold",
                },
              }}
            />
          </div>
        </section>
        <div className="flex flex-row gap-5">
          <SignedOut>
            <div className=" bg-blue-500 p-4 rounded-lg hover:cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out">
              <SignUpButton mode="modal" />
            </div>
            <div className=" bg-blue-500 p-4 rounded-lg hover:cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out">
              <SignInButton mode="modal" />
            </div>
          </SignedOut>
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button className="hover:cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out">
                Ver mis FlashCards
              </Button>
            </Link>
            <Link href={"/trial"}>
              <Button className="hover:cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out">
                Version de prueba
              </Button>
            </Link>
            <Link href={"/pricing"}>
              <Button className="hover:cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out">
                Pricing
              </Button>
            </Link>
          </SignedIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
