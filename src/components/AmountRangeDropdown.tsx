import React, { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface AmountRangeDropdownProps {
  fromValue: string;
  setFromValue: (value: string) => void;
  toValue: string;
  setToValue: (value: string) => void;
  fromCurrency: string;
  setFromCurrency: (currency: string) => void;
  toCurrency: string;
  setToCurrency: (currency: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
}

const AmountRangeDropdown: React.FC<AmountRangeDropdownProps> = ({
  fromValue,
  setFromValue,
  toValue,
  setToValue,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  isOpen,
  setIsOpen,
  title,
}) => {
  const [showFromCurrencyDropdown, setShowFromCurrencyDropdown] =
    useState(false);
  const [showToCurrencyDropdown, setShowToCurrencyDropdown] = useState(false);

  return (
    <div className="relative">
      <div
        className={`flex items-center px-4 py-3 my-0 sm:my-4 md:my-4 space-x-4 rounded-lg shadow-sm border bg-white border-default text-primary text-sm
          dark:bg-transparent dark:placeholder-[#CDCFD1] dark:border-[#4D5050] dark:text-[#F3F5F7]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`w-3 h-3 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 md:-mt-3 p-4 rounded-lg 
            border shadow-sm z-50 w-80 bg-white border-gray-150
            dark:bg-[#0E201E]`}
        >
          <div className="flex gap-4">
            {/* From Input */}
            <div className="flex-1">
              <Typography
                variant="small"
                className={`mb-2 font-medium text-sm text-left text-gray-700
                  dark:text-[#F3F5F7]`}
              >
                From:
              </Typography>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className={`w-full rounded-lg text-sm font-semibold border-default bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-border-gray-300
                    dark:bg-transparent dark:border-[#4D5050]  dark:text-gray-250
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
                <button
                  onClick={() =>
                    setShowFromCurrencyDropdown(!showFromCurrencyDropdown)
                  }
                  className={`absolute right-0 top-0 h-full px-2 rounded-l-none rounded-r-lg border-r border-t border-b border-default text-gray-600 bg-white focus:outline-none
                    dark:bg-[#0E201E] dark:border-[#4D5050]`}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">{fromCurrency}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="w-2 h-2" />
                  </div>
                </button>

                {/* Currency Dropdown */}
                {showFromCurrencyDropdown && (
                  <div
                    className={`absolute top-full right-0 mt-1 rounded-lg border shadow-lg z-20 bg-white border-default
                      dark:bg-[#0E201E]`}
                  >
                    <div className="py-1">
                      {["USD", "EUR", "USDT"].map((currency) => (
                        <button
                          key={currency}
                          onClick={() => {
                            setFromCurrency(currency);
                            setShowFromCurrencyDropdown(false);
                          }}
                          className={`w-full px-3 py-1 text-left text-xs ${
                            fromCurrency === currency
                              ? "bg-gray-100 dark:text-[#A1A3A5]"
                              : "dark:bg-[#0E201E] dark:text-[#A1A3A5]"
                          }`}
                        >
                          {currency}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* To Input */}
            <div className="flex-1">
              <Typography
                variant="small"
                className={`mb-2 font-medium text-left text-sm text-gray-700
                  dark:text-[#F3F5F7]`}
              >
                To:
              </Typography>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="1000"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  className={`w-full rounded-lg text-sm font-semibold border-default bg-white text-gray-900
                    dark:bg-transparent dark:border-[#4D5050] dark:text-gray-250
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
                <button
                  onClick={() =>
                    setShowToCurrencyDropdown(!showToCurrencyDropdown)
                  }
                  className={`absolute right-0 top-0 h-full px-2 rounded-l-none rounded-r-lg border-r border-t border-b border-default text-gray-600 bg-white
                    dark:bg-[#0E201E] dark:border-[#4D5050]`}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">{toCurrency}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="w-2 h-2" />
                  </div>
                </button>

                {/* Currency Dropdown */}
                {showToCurrencyDropdown && (
                  <div
                    className={`absolute top-full right-0 mt-1 rounded-lg border shadow-lg z-20 bg-white border-default
                      dark:bg-[#0E201E] dark:border-[#4D5050]`}
                  >
                    <div className="py-1">
                      {["USD", "EUR", "USDT"].map((currency) => (
                        <button
                          key={currency}
                          onClick={() => {
                            setToCurrency(currency);
                            setShowToCurrencyDropdown(false);
                          }}
                          className={`w-full px-3 py-1 text-left text-xs ${
                            toCurrency === currency
                              ? "bg-blue-50 text-blue-600 dark:bg-[#0E201E] dark:text-[#A1A3A5]"
                              : "dark:bg-[#0E201E] dark:text-[#A1A3A5]"
                          }`}
                        >
                          {currency}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmountRangeDropdown;
