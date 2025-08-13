import { Organization, WebSite, WithContext } from "schema-dts";

export function generateOrganizationSchema(): WithContext<Organization> {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Memory Ninja",
        url: "https://www.memoryninja.es",
        logo: "https://www.memoryninja.es/memory-ninja-icon-2.webp",
        description: "Generador de tarjetas de estudio con inteligencia artificial para optimizar el aprendizaje.",
        sameAs: [
            "https://twitter.com/memoryninja_app",
            "https://www.instagram.com/memoryninja_app",
            "https://www.facebook.com/memoryninja"
        ],
        contactPoint: {
            "@type": "ContactPoint",
            email: "contacto@memoryninja.es",
            contactType: "customer service"
        }
    };
}

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
                urlTemplate: "https://www.memoryninja.es/search?q={search_term_string}"
            },
            query: "required name=search_term_string"
        }
    };
}
