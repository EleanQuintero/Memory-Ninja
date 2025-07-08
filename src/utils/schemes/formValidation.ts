import { z } from "zod"


export const formSchema = z.object({
    pregunta: z.string().min(10, "Cada pregunta debe tener al menos 10 caracteres").max(100, "Cada pregunta debe tener menos de 40 caracteres")
})

export const validatePregunta = (value: string) => {
    const result = formSchema.safeParse({pregunta: value})
    if (!result.success) {return result.error.errors[0].message}
    return null
  }