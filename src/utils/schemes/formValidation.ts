import { z } from "zod"


export const formSchema = z.object({
    pregunta: z.string().min(10, "La pregunta debe tener al menos 10 caracteres")
})

