import React, { useEffect, useState, useRef } from 'react'
import { ChevronDownIcon, LayersIcon } from 'lucide-react'
interface SourceSelectorProps {
  selected: string
  onSelect: (source: string) => void
}
export const SourceSelector: React.FC<SourceSelectorProps> = ({
  selected,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const sources = [
    {
      id: 'all',
      name: 'All sources',
    },
    {
      id: 'textbooks',
      name: 'Textbooks',
    },
    {
      id: 'notes',
      name: 'My notes',
    },
    {
      id: 'custom',
      name: 'Custom data',
    },
  ]
  const selectedSource =
    sources.find((source) => source.id === selected) || sources[0]
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-[#b3bac1] hover:text-white py-2 px-3 rounded-md bg-[#24272b]/40 hover:bg-[#24272b]/70 transition-colors"
      >
        <LayersIcon className="w-4 h-4" />
        <span className="text-sm">{selectedSource.name}</span>
        <ChevronDownIcon className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-[#24272b] border border-[#4a525a]/20 z-50">
          <div className="py-1">
            {sources.map((source) => (
              <button
                key={source.id}
                className={`${selected === source.id ? 'bg-[#19324a] text-white' : 'text-[#b3bac1] hover:bg-[#19324a]/50'} block w-full text-left px-4 py-2 text-sm`}
                onClick={() => {
                  onSelect(source.id)
                  setIsOpen(false)
                }}
              >
                {source.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
