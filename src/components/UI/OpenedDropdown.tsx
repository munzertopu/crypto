import React, { useState, useEffect, useRef } from "react";
import TickIcon from "../Icons/TickIcon";
import SearchField from "./SearchField";

export interface OpenedDropdownOption {
  label: string;
  value: string;
  icon?: string;
  logo?: string;
  subtitle?: string;
  multiline?: boolean;
}

interface OpenedDropdownProps {
  options: string[] | OpenedDropdownOption[];
  onSelect: (value: string) => void;
  defaultValue?: string;
  className?: string;
  inputClassName?: string;
  menuClassName?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  multiline?: boolean;
  showTickMark?: boolean;
  selectedValue?: string;
  showLogo?: boolean;
}

const OpenedDropdown: React.FC<OpenedDropdownProps> = ({
  options,
  onSelect,
  defaultValue,
  className = "",
  inputClassName = "",
  menuClassName = "",
  searchable = false,
  multiline = false,
  searchPlaceholder = "Search by name",
  showTickMark = false,
  selectedValue,
  showLogo = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Normalize options to always be objects
  const normalizedOptions: OpenedDropdownOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  // Filter options based on search term
  const filteredOptions =
    searchable && searchTerm
      ? normalizedOptions.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : normalizedOptions;

  // Set default value based on normalized options
  const initialValue = defaultValue || normalizedOptions[0]?.label || "";
  const [internalSelectedValue, setInternalSelectedValue] =
    useState(initialValue);

  // Use external selectedValue if provided, otherwise use internal state
  const currentSelectedValue =
    selectedValue !== undefined ? selectedValue : internalSelectedValue;

  // Find the current selected option object
  const currentSelectedOption = normalizedOptions.find(
    (option) => option.label === currentSelectedValue
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: OpenedDropdownOption) => {
    setInternalSelectedValue(option.label);
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

  return (
    <div
      className={`w-full  z-50 min-w-[max-content] md:min-w-25 
          bg-background-light dark:bg-background-dark dark:text-white`}
    >
      {searchable && (
        <div className=" ">
          <SearchField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={searchPlaceholder}
            className={inputClassName}
          />
        </div>
      )}

      <div
        className={`py-2 flex flex-col items-start justify-start max-h-[200px] overflow-y-auto ${menuClassName}`}
      >
        {filteredOptions.map((option, index) => (
          <div
            key={option.value + index}
            onClick={() => handleSelect(option)}
            className={`px-1.5 py-1.5 text-sm text-gray-900 text-left hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer rounded-lg w-full flex items-center gap-2 dark:text-gray-250 ${
              showTickMark && currentSelectedValue === option.label
                ? "bg-gray-100 dark:bg-gray-800"
                : ""
            }`}
          >
            {option.logo && (
              <img
                src={option.logo}
                alt={option.label}
                className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5"
              />
            )}
            {option.icon && (
              <span className="text-xs flex-shrink-0 mt-0.5">
                {option.icon}
              </span>
            )}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-medium">{option.label}</span>
              {multiline && option.subtitle && (
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {option.subtitle}
                </span>
              )}
            </div>
            {showTickMark && currentSelectedValue === option.label && (
              <TickIcon className="text-gray-500 dark:text-green-400 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenedDropdown;
