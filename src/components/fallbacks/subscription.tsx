export default function SubscriptionFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold">Acceso denegado</h1>
      <p className="mt-4 text-lg">
        Esta página requiere una suscripción Pro. Por favor, actualiza tu plan
        para acceder.
      </p>
    </div>
  );
}
