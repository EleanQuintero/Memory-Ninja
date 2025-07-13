import { rateLimitter } from "@/middleware/rate-limit"
import {  NextResponse} from "next/server"


 async function ping() {
  
    try {
      const response = await fetch("http://localhost:4444/api/health/health", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Timeout para evitar esperas largas
        signal: AbortSignal.timeout(1000)
      })
  
      if (response.ok) {
        return NextResponse.json({ status: 'alive' })
      } else {
        return NextResponse.json({ status: 'error' }, { status: response.status })
      }
    } catch (error) {
      console.error('Error en ping:', error)
      return NextResponse.json({ status: 'error' }, { status: 503 })
    }
}

export const GET = rateLimitter({fn: ping})