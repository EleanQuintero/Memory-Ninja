export const syncUser = async () => {
    const res = await fetch("/api/user-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Puedes enviar datos adicionales si quieres
      body: JSON.stringify({}),
    });
  
    if (!res.ok) {
      console.error("❌ Error al sincronizar usuario");
    } else {
      console.log("✅ Usuario sincronizado con éxito");
    }
  };