import { RATE_LIMIT_CONFIGS, rateLimitter } from "@/middleware/rate-limit";
import { getUserToken } from "@/utils/services/auth/getToken";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



async function saveUser() {
    const token = await getUserToken()
    const user = await currentUser()
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    try {

        const features = user.privateMetadata?.feature
        let userRole: number
        if (features === "kurayami") {
            userRole = 1;
        } else {
            userRole = 2;
        }



        const data = {
            id: user.id,
            name: user.firstName,
            lastName: user.lastName,
            userName: user.username,
            email: user.emailAddresses[0].emailAddress,
            role: userRole
        }

        console.log("Guardando usuario:", data);

        const res = await fetch("http://localhost:4444/api/user/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {

            const errorData = await res.text();
            console.error('Error al guardar el usuario:', errorData);
            return NextResponse.json({ error: 'Error al guardar el usuario' }, { status: 500 })
        }

        return NextResponse.json({ ok: true }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
    }
}

export const POST = rateLimitter({ fn: saveUser, options: RATE_LIMIT_CONFIGS.WRITE })