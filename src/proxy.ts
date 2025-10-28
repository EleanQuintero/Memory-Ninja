import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard', '/dashboard/:path*'])

export default clerkMiddleware(async (auth, req) => {
    const pathname = req.nextUrl.pathname

    if (isProtectedRoute(req)) {
        await auth.protect()
    }

    const { sessionClaims } = await auth()
    const onboardingStatus = sessionClaims?.publicMetadata?.onboarding

    // Redirecciones
    if (!onboardingStatus && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/onboarding', req.url))
    }

    if (onboardingStatus && pathname.startsWith('/onboarding')) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}
