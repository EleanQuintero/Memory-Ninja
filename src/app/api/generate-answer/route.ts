import { rateLimitter } from '@/middleware/rate-limit';
import { NextRequest, NextResponse } from 'next/server'
interface AnswerData {
  answer: string[];
}


async function generateAnswer(req: NextRequest) {
 
  try {
    const { tema, questions, userLevel } = await req.json()
    console.log('Datos recibidos:', { tema, questions, userLevel });
    const response = await fetch("http://localhost:4444/api/questions/ask", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tema, questions, userLevel })
    })

    if (!response.ok) {
      console.error('Error en la respuesta de la API:', response.status);
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data: AnswerData = await response.json()
    console.log('Respuesta de la API:', data);

    const answers = Array.isArray(data.answer) ? data.answer : [data.answer];
    return NextResponse.json({ answer: answers })
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error interno:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      // Manejar errores que no son instancias de Error
      console.error('Error interno desconocido:', error)
      return NextResponse.json({ error: 'Error interno desconocido' }, { status: 500 })
    }
  }
}

export const POST = rateLimitter({ fn: generateAnswer })