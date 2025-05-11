import { Button } from "@/components/ui/button";
import { CallToAction } from "@/components/ui/CallToAction";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
export default function Home() {
  return (
    <div className="">
      <main className="grid grid-rows-[20px, 1fr, 1fr] gap-[32px] items-center sm:items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Bienvenido a la página de inicio de FlashCard Generator
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
        </section>
      </main>
    </div>
  );
}
