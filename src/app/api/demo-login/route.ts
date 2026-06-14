import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // ID del usuario demo en Clerk (variable de entorno segura, solo servidor)
        const demoUserId = process.env.DEMO_USER_ID;

        if (!demoUserId) {
            return NextResponse.json(
                { error: 'Demo user not configured' },
                { status: 500 }
            );
        }

        const clerk = await clerkClient();

        // Genera un sign-in token temporal
        const signInToken = await clerk.signInTokens.createSignInToken({
            userId: demoUserId,
            expiresInSeconds: 300, // 5 minutos de validez
        });

        return NextResponse.json({
            ticket: signInToken.token
        });

    } catch (error) {
        console.error('Error generating demo login ticket:', error);
        return NextResponse.json(
            { error: 'Failed to generate login ticket' },
            { status: 500 }
        );
    }
}
