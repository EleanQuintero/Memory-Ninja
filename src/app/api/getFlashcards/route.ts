import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const user_id = req.headers.get('x-user-id');

        if (!user_id) {
            return new NextResponse("Se requiere un user_id en los headers", { status: 400 });
        }

        const response = await fetch(`http://localhost:4444/api/user/flashcard/getByID/${user_id}`);

        if(!response.ok){
            const errorData = await response.text();
            console.error(errorData);
            return new NextResponse("Error al obtener las flashcards", {status:404})
        }

        const flashCardData = await response.json()
        return new NextResponse(JSON.stringify(flashCardData))
        
    } catch (error) {
        console.error(error)
        return new NextResponse("Error interno del servidor", {status: 500})
    }
}