export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-center w-full p-4 bg-gray-800 text-white">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">¡Gracias por visitar!</h2>
        <p className="text-lg">Desarrollado por Eleqful</p>
        <p className="text-sm">
          ©{currentYear} -FlashCard Generator. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
