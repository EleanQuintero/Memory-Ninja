
import { NextResponse } from "next/server";

export async function GET() {
    const userId = "user_2wxsX1D1xIWc9uLFZAg9bKgzgBu"
    
    if (!userId) {
        return new NextResponse('Usuario no encontrado', { status: 404 })
    }
    
    const data = ""
    console.log(data)
    if (!data) {
        return new NextResponse('Datos de usuario no encontrados', { status: 404 })
    }
    
    return NextResponse.json(data)
}