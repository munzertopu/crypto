import React, { useState, useEffect, useRef } from "react";

export interface DropdownOption {
  label: string;
  value: string;
  icon?: string;
  logo?: string;
}

interface DropdownProps {
  options: string[] | DropdownOption[];
  onSelect: (value: string) => void;
  defaultValue?: string;
  className?: string;
  inputClassName?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  defaultValue,
  className = "",
  inputClassName = "",
  searchable = false,
  searchPlaceholder = "Search...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Normalize options to always be objects
  const normalizedOptions: DropdownOption[] = options.map(opt => 
    typeof opt === 'string' 
      ? { label: opt, value: opt } 
      : opt
  );
  
  // Filter options based on search term
  const filteredOptions = searchable && searchTerm
    ? normalizedOptions.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : normalizedOptions;
  
  // Set default value based on normalized options
  const initialValue = defaultValue || normalizedOptions[0]?.label || '';
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: DropdownOption) => {
    setSelectedValue(option.label);
    onSelect(option.value);
    setIsOpen(false);
    setSearchTerm(""); // Clear search when selecting
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
        className={`flex flex-row justify-between items-center px-4 py-3 box-border border border-default rounded-lg bg-white gap-4 md:min-w-24 min-w-[max-content] w-full dark:border-[#4D5050] focus:ring-2 focus:ring-[#E3F3C7B2] focus:outline-none ${inputClassName}`}
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
        <div className="absolute top-full left-0 mt-1 w-full border border-default rounded-lg shadow-lg z-50 min-w-[max-content] md:min-w-25 bg-white dark:bg-gray-900 dark:text-white">
          {searchable && (
            <div className="px-3 border-b border-gray-150 dark:border-gray-700">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 rounded text-sm text-gray-900 dark:text-gray-150 placeholder-gray-500 focus:outline-none dark:bg-[#0E201E] dark:text-gray-50"
              />
            </div>
          )}
          <div className="px-1.5 py-2 flex flex-col items-start justify-start max-h-[200px] overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={option.value + index}
                onClick={() => handleSelect(option)}
                className="px-1.5 py-1.5 text-sm text-gray-900 text-left hover:bg-gray-100 cursor-pointer rounded-lg w-full flex items-center gap-2
                 dark:text-gray-250"
              >
                {option.logo && (
                  <img src={option.logo} alt={option.label} className="w-5 h-5 rounded-full" />
                )}
                {option.icon && (
                  <span className="text-xs">{option.icon}</span>
                )}
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
