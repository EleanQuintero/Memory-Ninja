import { PROCESS_PATERN } from "@/utils/consts";

export const processToArray = (data: Record<string, FormDataEntryValue>) => {
    const preguntasRaw = data.pregunta as string;
    const preguntas: string[] = preguntasRaw
        .split(PROCESS_PATERN)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);


    return preguntas;
}