import { Toggle } from "@radix-ui/react-toggle";

interface DatatoggleProps {
  option: string;
  setSelectedOption(option: string): void;
  selectedOption: string;
}

export const DataToggle: React.FC<DatatoggleProps> = ({
  option,
  setSelectedOption,
  selectedOption,
}) => {
  const handleToggle = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Toggle
        className={` data-[state=on]:hover:border-red-800 data-[state=off]:hover:border-green-800 data-[state=on]:bg-green-800 data-[state=off]:bg-gray-500 data-[state=on]:text-white p-1.5 rounded-lg border-3 border-black`}
        onPressedChange={() => handleToggle(option)}
        pressed={selectedOption === option}
        name={option}
      >
        {option}
      </Toggle>
      {selectedOption === option && (
        <input type="hidden" name="theme" value={option} />
      )}
    </>
  );
};
