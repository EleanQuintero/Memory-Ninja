import { Contact } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative flex flex-col items-center justify-center w-full p-4 bg-gradient-to-br from-[#19324a] via-[#1a365d] to-[#2d3748] overflow-hidden text-white">
      <div className="flex flex-row items-center justify-center gap-4">
        <p className="text-sm">©{currentYear} | MemoryNinja.</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <a
          href="http://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Contact us on Instagram"
        >
          <Contact />
        </a>
      </div>
    </footer>
  );
};
