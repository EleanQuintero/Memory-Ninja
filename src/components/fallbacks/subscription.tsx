import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";

export default function SubscriptionFallback() {
  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <Button>
          <Link href="/" className="text-2xl font-bold">
            ir a inicio
          </Link>
        </Button>

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
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold">Acceso denegado</h1>
        <p className="mt-4 text-lg">
          Esta página requiere una suscripción Pro. Por favor, actualiza tu plan
          para acceder.
        </p>
        <a href="/pricing">
          <Button>Ir al planes de pago</Button>
        </a>
      </div>
    </>
  );
}
