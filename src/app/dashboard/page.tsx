import SubscriptionFallback from "@/components/fallbacks/subscription";
import { Protect } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <Protect plan={"pro_user"} fallback={<SubscriptionFallback />}>
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold">Bienvenido a tu espacio personal</h1>
        <p className="mt-4 text-lg">
          Aquí accederás a todas tus FlashCards y podrás crear nuevas.
        </p>
        <p>
          Ademas podrás organizarlas y en el <span>futuro</span> podrás exportar
          toda la información a pdf
        </p>
      </main>
    </Protect>
  );
}
