import { useEffect, useState, useRef } from "react";
import { ChevronDownIcon, Brain, Lock } from "lucide-react";
import { useSourceStore } from "../../store/sourceStore";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { sources } from "@/utils/consts/ninjaModels";

export const SourceSelector: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const { setSource } = useSourceStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { has, sessionClaims } = useAuth();

  const hasKurayami = has ? has({ feature: "kurayami" }) : false;

  const isAdmin = sessionClaims?.publicMetadata?.isAdmin;

  const sourceSelected =
    sources.find((source) => source.id === selectedSource) || sources[0];

  function handleClick(source: { id: string; name: string }) {
    const isDisabled = source.id === "Pro" && !hasKurayami && !isAdmin;

    if (isDisabled) {
      toast.error("Mejora a Pro para usar a Kurayami", {
        description: "El modelo Kurayami esta disponible exclusivamente en el plan Pro.",
      });
      return;
    }

    setSelectedSource(source.id);
    setSource(source.name);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-[#b3bac1] hover:text-white py-2 px-3 rounded-md bg-[#24272b]/40 hover:bg-[#24272b]/70 transition-colors"
      >
        <Brain className="w-4 h-4" />
        <span className="text-sm">{sourceSelected.name}</span>
        <ChevronDownIcon className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-[#24272b] border border-[#4a525a]/20 z-50">
          <div className="py-1">
            {sources.map((source) => {
              const isLocked = source.id === "Pro" && !hasKurayami && !isAdmin;
              return (
                <button
                  key={source.id}
                  type="button"
                  className={`${
                    selectedSource === source.id
                      ? "bg-[#19324a] text-white"
                      : "text-[#b3bac1] hover:bg-[#19324a]/50"
                  } ${isLocked ? "opacity-60" : ""} flex items-center justify-between w-full text-left px-4 py-2 text-sm`}
                  onClick={() => handleClick(source)}
                >
                  <span>{source.name}</span>
                  {isLocked && <Lock className="w-3.5 h-3.5 text-purple-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
