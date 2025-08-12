import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lista de rutas de API permitidas para la landing page
const ALLOWED_API_ROUTES = [
    '/api/health',
    // Agrega aquí cualquier ruta de API que necesite la landing page
];

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Si la ruta de API no está en la lista de permitidas, redireccionar a la home
    if (!ALLOWED_API_ROUTES.some(route => path.startsWith(route))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'],
};
