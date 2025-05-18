import { z } from "zod"


export const formSchema = z.object({
    theme: z.string().min(1, "Debes seleccionar un tema"),
    pregunta: z.string().min(10, "La pregunta debe tener al menos 10 caracteres")
})

