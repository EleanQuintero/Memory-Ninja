import { NextRequest, NextResponse } from 'next/server'

// Allowlist de rutas públicas para la rama de landing-only
const allowed = [
    /^\/$/, // home
    /^\/(favicon\.ico|robots\.txt|sitemap\.xml)$/, // archivos raíz comunes
    /^\/\.(?:well-known|clerk)(?:\/|$)/, // rutas internas (por si Clerk embebe algo)
]

export function middleware(req: NextRequest) {
    const { pathname } = new URL(req.url)

    // Permitir rutas explícitas
    if (allowed.some((re) => re.test(pathname))) {
        return NextResponse.next()
    }

    // Cualquier otra ruta (páginas internas, APIs, etc.) redirige al home
    return NextResponse.redirect(new URL('/', req.url), 308)
}

// No ejecutar el middleware para assets estáticos de Next.js y archivos estáticos comunes
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}
