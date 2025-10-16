import React from "react";
import SearchIcon from "../../utils/icons/SearchIcon";

interface SearchFieldProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SearchField: React.FC<SearchFieldProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search",
  ariaLabel,
  className = "",
  size = "md"
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "pl-10 pr-4 py-2 text-sm";
      case "lg":
        return "pl-12 pr-4 py-2.5 text-lg";
      default: // md
        return "pl-10 pr-4 py-2.5 text-base";
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 16;
      case "lg":
        return 20;
      default: // md
        return 18;
    }
  };

  const getIconPositionClasses = () => {
    switch (size) {
      case "sm":
        return "left-3";
      case "lg":
        return "left-3";
      default: // md
        return "left-3";
    }
  };

  return (
    <div className={`relative`}>
      <SearchIcon
        width={getIconSize()}
        height={getIconSize()}
        strokeColor="#6B7280"
        className={`absolute top-1/2 transform -translate-y-1/2 ${getIconPositionClasses()}`}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full border border-default rounded-xl focus:outline-none bg-transparent text-gray-900 placeholder-gray-500 dark:text-white dark:placeholder-gray-400 ${getSizeClasses()} ${className}`}
        aria-label={ariaLabel || placeholder}
      />
    </div>
  );
};

export default SearchField;
