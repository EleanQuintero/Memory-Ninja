import { NextResponse } from "next/server"

export async function GET() {
    try {
      const response = await fetch("http://localhost:4444/api/health/health", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Puedes agregar headers adicionales si tu API los requiere
          // 'Authorization': 'Bearer your-token',
        },
        // Timeout para evitar esperas largas
        signal: AbortSignal.timeout(5000)
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