import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../../utils/icons/SearchIcon";

export interface CheckboxDropdownOption {
  label: string;
  value: string;
  icon?: string;
  logo?: string;
}

interface CheckboxDropdownProps {
  options: string[] | CheckboxDropdownOption[];
  onSelect: (values: string[]) => void;
  selectedValues?: string[];
  defaultValue?: string;
  className?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}

const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({
  options,
  onSelect,
  selectedValues = [],
  defaultValue,
  className = "",
  searchable = false,
  searchPlaceholder = "Search...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [internalSelectedValues, setInternalSelectedValues] = useState<string[]>(selectedValues);
  
  // Normalize options to always be objects
  const normalizedOptions: CheckboxDropdownOption[] = options.map(opt => 
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
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: CheckboxDropdownOption) => {
    // Multi-select with checkboxes
    const newSelectedValues = internalSelectedValues.includes(option.value)
      ? internalSelectedValues.filter(v => v !== option.value)
      : [...internalSelectedValues, option.value];
    
    setInternalSelectedValues(newSelectedValues);
    onSelect(newSelectedValues);
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

  // Sync external selectedValues with internal state
  useEffect(() => {
    setInternalSelectedValues(selectedValues);
  }, [selectedValues]);

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

  const getButtonText = () => {
    if (internalSelectedValues.length > 0) {
      return `${internalSelectedValues.length} selected`;
    }
    return defaultValue || "Select...";
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="flex flex-row justify-between items-center px-4 py-3 box-border border border-default rounded-lg bg-white gap-4 md:min-w-24 min-w-[max-content] w-full dark:border-[#4D5050] focus:ring-2 focus:ring-[#E3F3C7B2] focus:outline-none"
        aria-label="Toggle dropdown"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-base text-gray-900 dark:text-white">
          {getButtonText()}
        </span>
        {isOpen ? <ArrowUpSvg /> : <ArrowDownSvg />}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full border border-default rounded-lg shadow-lg z-50 min-w-[max-content] md:min-w-25 bg-white dark:bg-gray-900 dark:text-white">
          {searchable && (
            <div className="flex px-3 items-center border-b border-gray-150 dark:border-gray-700">
              <SearchIcon 
              />
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
            {filteredOptions.map((option, index) => {
              const isSelected = internalSelectedValues.includes(option.value);
              
              return (
                <div
                  key={option.value + index}
                  onClick={() => handleSelect(option)}
                  className="px-1.5 py-1.5 text-sm text-gray-900 text-left hover:bg-gray-100 cursor-pointer rounded-lg w-full flex items-center gap-2
                   dark:text-gray-250 dark:hover:bg-gray-800"
                >
                  <div
                    className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-green-600 border-green-600"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  {option.logo && (
                    <img src={option.logo} alt={option.label} className="w-5 h-5 rounded-full" />
                  )}
                  {option.icon && (
                    <span className="text-xs">{option.icon}</span>
                  )}
                  {option.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
