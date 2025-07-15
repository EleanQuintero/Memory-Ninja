export const processToArray = (data: Record<string, FormDataEntryValue>) => {

    // Divide por salto de línea, punto y coma, coma, o DOS O MÁS espacios/tabulaciones
    const PROCESS_PATTERN = /[\n;,]+| {2,}|\t{2,}/;

    const preguntasRaw = data.pregunta.toString();
    const preguntas = preguntasRaw
        .split(PROCESS_PATTERN)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);


    return preguntas;
}