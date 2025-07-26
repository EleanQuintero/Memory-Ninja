import { PricingTable } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Pricing() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#19324a] via-[#1a365d] to-[#2d3748] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col w-full justify-center items-center px-6 py-20 md:py-28">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Elige tu{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Plan Perfecto
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Desbloquea todo el potencial de tus flashcards con planes diseñados
            para cada necesidad
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Sin compromiso
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Cancela cuando quieras
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Soporte Frecuente
            </span>
          </div>
        </div>

        {/* Pricing Table Container */}
        <div className="w-full max-w-7xl">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
            <PricingTable
              collapseFeatures={false}
              appearance={{
                baseTheme: dark,
                variables: {
                  colorPrimary: "#3b82f6",
                  colorBackground: "transparent",
                  colorText: "#ffffff",
                  fontFamily: '"Inter", sans-serif',
                  borderRadius: "12px",
                },
                elements: {
                  pricingTableRoot: {
                    "& .cl-pricingTable-plan": {
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "16px",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        transform: "translateY(-4px)",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                      },
                    },
                    "& .cl-pricingTable-planName": {
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#ffffff",
                    },
                    "& .cl-pricingTable-planPrice": {
                      fontSize: "2.5rem",
                      fontWeight: "800",
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                      backgroundClip: "text",
                      color: "transparent",
                    },
                    "& .cl-pricingTable-planFeature": {
                      color: "#d1d5db",
                      fontSize: "0.95rem",
                    },
                    "& .cl-pricingTable-button": {
                      backgroundColor: "#3b82f6",
                      borderRadius: "12px",
                      fontWeight: "600",
                      padding: "12px 24px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#2563eb",
                        transform: "scale(1.02)",
                      },
                    },
                  },
                },
              }}
              fallback={
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                  <p className="text-gray-300 text-lg">Cargando planes...</p>
                </div>
              }
              newSubscriptionRedirectUrl="/dashboard"
            />
          </div>
        </div>

        {/* Bottom trust badges */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span>✓ Garantía de 30 días</span>
            <span>✓ Datos seguros</span>
            <span>✓ Sin configuración compleja</span>
          </div>
        </div>
      </div>
    </section>
  );
}
