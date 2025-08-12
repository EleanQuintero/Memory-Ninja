import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Para la rama production-landing, este middleware queda simplificado
// ya que las redirecciones se manejan en next.config.ts y en las páginas
export default clerkMiddleware(() => {
    // En la rama production-landing, simplemente dejamos pasar todo
    // Las redirecciones están manejadas a nivel de Next.js config y componentes
    const res = NextResponse.next();
    res.headers.set('x-mw-mode', 'landing-only');
    return res;
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
