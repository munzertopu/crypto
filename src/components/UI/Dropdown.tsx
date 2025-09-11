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
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
        stroke="#7C7C7C"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const ArrowUpSvg = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2797 10.0334L8.93306 5.68676C8.41973 5.17342 7.57973 5.17342 7.06639 5.68676L2.71973 10.0334"
        stroke="#7C7C7C"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="flex flex-row justify-between items-center px-3 py-1.5 box-border border border-gray-150 rounded-lg shadow-[0_1px_2px_0_rgba(20,21,26,0.05)] bg-white md:min-w-24 min-w-[max-content] w-full"
        aria-label="Toggle dropdown"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-sm text-primary">{selectedValue}</span>
        {isOpen ? <ArrowUpSvg /> : <ArrowDownSvg />}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 py-2 w-full bg-white border border-gray-150 rounded-lg shadow-lg z-50 min-w-[max-content] md:min-w-25 flex flex-col items-start justify-start max-h-[200px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer rounded min-w-8"
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
