import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST() {
    try {
        const user = await currentUser()

    if (!user) {
        return new NextResponse('Usuario no encontrado', { status: 404 })
    }

    const features = user.privateMetadata?.feature
    
    const data = {
        id: user.id,
        name: user.firstName,
        lastName: user.lastName,
        userName: user.username,
        email: user.emailAddresses[0].emailAddress,
        role: features
    }

    const res = await fetch("http://localhost:4444/api/user/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if(!res.ok){
        const errorData = await res.text();
        console.error('Error al guardar el usuario:', errorData);
        return new NextResponse("Error al guardar el usuario", {status:500})
    }

    return new NextResponse("ok", {status: 200})
    } catch (error) {
        console.error(error)
    }
    
}