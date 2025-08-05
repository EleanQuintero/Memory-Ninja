"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProvidersProps) => {
  // Crear una nueva instancia de QueryClient en cada renderizado del componente
  // para evitar compartir datos entre usuarios en entornos SSR
  const [dashboardClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={dashboardClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
