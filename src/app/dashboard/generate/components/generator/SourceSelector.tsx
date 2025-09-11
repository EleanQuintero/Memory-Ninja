import React, { useEffect, useState, useRef } from "react";
import { ChevronDownIcon, Brain } from "lucide-react";
import { useSourceStore } from "../../store/sourceStore";
import { useAuth } from "@clerk/nextjs";

export const SourceSelector: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const { setSource } = useSourceStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { has } = useAuth();

  const hasKurayami = has ? has({ feature: "kurayami" }) : false;

  const sources = [
    {
      id: "all",
      name: "All sources",
    },
    {
      id: "Basic",
      name: "Kōga (甲賀)",
    },
    {
      id: "Pro",
      name: "Kurayami (暗闇)",
    },
  ];
  const sourceSelected =
    sources.find((source) => source.id === selectedSource) || sources[0];

  function handleClick(source: { id: string; name: string }) {
    const isDisabled = source.id === "Pro" && !hasKurayami;

    if (isDisabled) {
      alert("You need to upgrade to paid plan to select this source.");
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
            {sources.map((source) => (
              <button
                key={source.id}
                className={`${
                  selectedSource === source.id
                    ? "bg-[#19324a] text-white"
                    : "text-[#b3bac1] hover:bg-[#19324a]/50"
                } block w-full text-left px-4 py-2 text-sm`}
                onClick={() => handleClick(source)}
              >
                {source.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
