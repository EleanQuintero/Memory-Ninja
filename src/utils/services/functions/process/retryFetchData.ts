
/**
 * Reintenta ejecutar una función asíncrona hasta que retorne un valor "truthy" o se agoten los intentos.
 * El tipo de retorno es inferido automáticamente.
 * @param fn Función asíncrona a ejecutar.
 * @returns El resultado de la función si es exitoso.
 * @throws El último error si todos los intentos fallan.
 */
export async function retryFetchData<T>(fn: () => Promise<T>): Promise<T> {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  let retries = 2;
  console.log("retryFetchData: intento de llamada");

  while (retries > 0) {
    try {
      const data = await fn();
      if (data) {
        return data;
      }
    } catch (error) {
      retries -= 1;
      if (retries > 0) {
        console.log(`Ejecutando el intento: ${retries}`);
        await delay(5000);
      } else {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw error;
      }
    }
  }
  throw new Error("No se pudo obtener un resultado válido tras varios intentos.");
}
