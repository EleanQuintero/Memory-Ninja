"use server"

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';


export async function getUserToken() {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
        return NextResponse.json(
            { error: "No se pudo obtener el token de usuario" },
            { status: 401 }
        );
    }

    return token;
}