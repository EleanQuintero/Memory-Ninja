import { Organization, WebSite, WithContext } from "schema-dts";

/**
 * Genera el schema JSON-LD de Organization para SEO
 * Mejora la visibilidad en Google con información estructurada de la empresa
 */
export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Memory Ninja",
    url: "https://www.memoryninja.es",
    logo: "https://res.cloudinary.com/dygwnv56x/image/upload/v1755253453/favicon_dim9e8.png",
    description:
      "Generador de tarjetas de estudio con inteligencia artificial para optimizar el aprendizaje.",
    sameAs: [
      "https://twitter.com/memoryninja_app",
      "https://www.instagram.com/memoryninja_app",
      "https://www.facebook.com/memoryninja",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contacto@memoryninja.es",
      contactType: "customer service",
    },
  };
}

/**
 * Genera el schema JSON-LD de WebSite para SEO
 * Habilita el search box en los resultados de Google
 */
export function generateWebsiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Memory Ninja",
    url: "https://www.memoryninja.es",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.memoryninja.es/search?q={search_term_string}",
      },
      query: "required name=search_term_string",
    },
  };
}
