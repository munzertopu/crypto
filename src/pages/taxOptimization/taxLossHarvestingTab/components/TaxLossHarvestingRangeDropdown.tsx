import React from "react";
import { Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface TaxLossHarvestingRangeDropdownProps {
  fromValue: string;
  setFromValue: (value: string) => void;
  toValue: string;
  setToValue: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  isRight?: boolean;
  className?: string;
}

const TaxLossHarvestingRangeDropdown: React.FC<
  TaxLossHarvestingRangeDropdownProps
> = ({
  fromValue,
  setFromValue,
  toValue,
  setToValue,
  isOpen,
  setIsOpen,
  title,
  isRight,
  className = ""
}) => {
  // Generate display value for the main input
  const getDisplayValue = () => {
    if (fromValue && toValue) {
      return `$${fromValue} - $${toValue}`;
    }
    return "Select market value";
  };

  return (
    <div className="relative">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Main Input Field */}
        <div className="mb-2">
          <Typography
            variant="small"
            className="text-gray-700 text-sm dark:text-gray-100 mb-2 text-left"
          >
            {title}
          </Typography>
          <button
            className={`w-full flex items-center justify-between px-4 py-2.5 border rounded-[12px] text-sm 
              border-gray-150 text-gray-900 bg-white
              dark:border-gray-600 dark:text-gray-100 dark:bg-gray-800`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={
                fromValue && toValue
                  ? "text-gray-900 dark:text-gray-100"
                  : "text-gray-500 dark:text-gray-400 text-base"
              }
            >
              {getDisplayValue()}
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown Content */}
        {isOpen && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-150 dark:border-gray-600 shadow-sm p-4">
            <div className="flex gap-3">
              {/* From Input */}
              <div className="flex-1">
                <Typography
                  variant="small"
                  className="mb-2 font-medium text-gray-700 dark:text-gray-100 text-left"
                >
                  From:
                </Typography>
                <Input
                  type="number"
                  placeholder="$ Amount"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className="w-full rounded-lg text-sm border-gray-150 bg-white text-gray-900
                    dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              {/* To Input */}
              <div className="flex-1">
                <Typography
                  variant="small"
                  className="mb-2 font-medium text-gray-700 dark:text-gray-100 !text-left"
                >
                  To:
                </Typography>
                <Input
                  type="number"
                  placeholder="$ Amount"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  className="w-full rounded-lg text-sm border-gray-150 bg-white text-gray-900
                    dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <button
          className={`flex items-center space-x-8 px-4 py-3 border rounded-xl text-base ${className}
            border-default text-primary 
            dark:text-gray-300 dark:border-gray-600`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{title}</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`w-3 h-3 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Desktop Dropdown Content */}
        {isOpen && (
          <div
            className={`absolute top-full mt-1 p-4 rounded-lg border shadow-lg w-80 border-gray-150
            bg-background-light dark:bg-background-dark 
            dark:border-gray-600
            ${isRight ? "right-0" : "left-0"} 
            `}
          >
            <div className="flex gap-2">
              {/* From Input */}
              <div className="flex-1">
                <Typography
                  variant="small"
                  className={`mb-2 font-medium text-left text-gray-700 dark:text-gray-300`}
                >
                  From:
                </Typography>
                <Input
                  type="number"
                  placeholder="$ Amount"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className={`w-full rounded-lg text-sm font-semibold border-gray-150 !text-gray-900
                    bg-background-light dark:bg-background-dark
                   dark:border-gray-500 dark:!text-gray-400
                   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
              </div>

              {/* To Input */}
              <div className="flex-1">
                <Typography
                  variant="small"
                  className={`mb-2 font-medium text-gray-700  dark:text-gray-300 text-left`}
                >
                  To:
                </Typography>
                <Input
                  type="number"
                  placeholder="$ Amount"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  className={`w-full rounded-lg text-sm font-semibold border-gray-150 !text-gray-900
                    bg-background-light dark:bg-background-dark
                   dark:border-gray-500 dark:!text-gray-400
                   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxLossHarvestingRangeDropdown;
