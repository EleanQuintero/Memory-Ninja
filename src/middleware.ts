import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isDashboardRoute = createRouteMatcher(['/dashboard', '/dashboard/:path*']);

// Allowlist cuando sólo queremos la landing
const allowedForLandingOnly: RegExp[] = [
    /^\/$/, // home
    /^\/(favicon\.ico|robots\.txt|sitemap\.xml)$/,
    /^\/_next\/image/,
    /^\/_next\/static/,
    /^\/images(\/|$)/,
    /^\/assets(\/|$)/,
    /^\/memory-ninja-icon-2\.png$/,
];

export default clerkMiddleware(async (auth, req) => {
    const url = req.nextUrl;
    const { pathname } = url;

    const isLandingOnly =
        process.env.LANDING_ONLY === '1' || process.env.NEXT_PUBLIC_LANDING_ONLY === '1';

    // Modo "landing-only": bloquea todo excepto la home y estáticos
    if (isLandingOnly) {
        const isAllowed = allowedForLandingOnly.some((re) => re.test(pathname));
        if (!isAllowed) {
            const res = NextResponse.redirect(new URL('/', url), 308);
            res.headers.set('x-mw-mode', 'landing-only');
            res.headers.set('x-mw-reason', 'blocked-non-allowed-route');
            return res;
        }
        const res = NextResponse.next();
        res.headers.set('x-mw-mode', 'landing-only');
        res.headers.set('x-mw-reason', 'allowed-route');
        return res;
    }

    // Modo normal (master): protege dashboard y orquesta onboarding
    if (isDashboardRoute(req)) {
        await auth.protect(); // si no hay sesión, Clerk redirige a /sign-in
    }

    const { sessionClaims } = await auth();
    const onboardingDone = Boolean(sessionClaims?.publicMetadata?.onboarding);

    // Si NO terminó onboarding y va al dashboard, redirige a /onboarding
    if (!onboardingDone && pathname.startsWith('/dashboard')) {
        const res = NextResponse.redirect(new URL('/onboarding', req.url), 307);
        res.headers.set('x-mw-mode', 'normal');
        res.headers.set('x-mw-reason', 'needs-onboarding');
        return res;
    }

    // Si SÍ terminó onboarding y va a /onboarding, envía al dashboard
    if (onboardingDone && pathname.startsWith('/onboarding')) {
        const res = NextResponse.redirect(new URL('/dashboard', req.url), 307);
        res.headers.set('x-mw-mode', 'normal');
        res.headers.set('x-mw-reason', 'onboarding-completed');
        return res;
    }

    const res = NextResponse.next();
    res.headers.set('x-mw-mode', 'normal');
    res.headers.set('x-mw-reason', 'pass-through');
    return res;
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
