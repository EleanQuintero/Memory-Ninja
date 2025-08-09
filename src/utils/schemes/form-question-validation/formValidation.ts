import { z } from "zod";

export const formSchema = z.object({
    pregunta: z
        .string()
        .trim()
        .min(10, "Cada pregunta debe tener al menos 10 caracteres")
        .max(100, "Cada pregunta debe tener menos de 100 caracteres"),
});

export const validatePregunta = (value: string): string | null => {
    // Evita validar mientras el usuario empieza a escribir (opcional)
    if (!value) return "La pregunta no puede estar vacía";

    const result = formSchema.safeParse({ pregunta: value });
    if (!result.success) {
        // issues siempre tiene al menos un elemento en caso de error
        return result.error.issues[0]?.message ?? "Pregunta inválida";
    }
    return null;
};