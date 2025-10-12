import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  defaultValue?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  defaultValue = options[0],
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ArrowDownSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );

  const ArrowUpSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="flex flex-row justify-between items-center px-4 py-3 box-border border border-default rounded-lg bg-transparent gap-4 md:min-w-24 min-w-[max-content] w-full dark:border-[#4D5050] focus:ring-2 focus:ring-[#E3F3C7B2] focus:outline-none"
        aria-label="Toggle dropdown"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-base text-gray-900 dark:text-white">
          {selectedValue}
        </span>
        {isOpen ? <ArrowUpSvg /> : <ArrowDownSvg />}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 px-1.5 py-2 mt-1 w-full border border-default rounded-lg shadow-lg z-50 min-w-[max-content] md:min-w-25 flex flex-col items-start justify-start max-h-[200px] overflow-y-auto bg-white dark:bg-gray-900 dark:text-white">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-1.5 py-1.5 text-sm text-gray-900 text-left hover:bg-gray-100 cursor-pointer rounded-lg w-full
               dark:text-gray-250"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
