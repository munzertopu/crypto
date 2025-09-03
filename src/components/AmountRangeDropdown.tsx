import React, { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface AmountRangeDropdownProps {
  isDarkMode: boolean;
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
  isDarkMode,
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
        className={`flex text-lg items-center px-8 py-4 my-0 sm:my-4 rounded-2xl border bg-transparent border-gray-600 text-gray-300 text-sm
          dark:border-[#4D5050] dark:text-[#F3F5F7]`}
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
          className={`absolute top-full left-0 mt-1 p-4 rounded-lg border shadow-lg z-50 w-80 ${
            isDarkMode
              ? "bg-gray-800 border-gray-600"
              : "bg-white border-gray-300"
          }`}
        >
          <div className="flex gap-2">
            {/* From Input */}
            <div className="flex-1">
              <Typography
                variant="small"
                className={`mb-2 font-medium text-left ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                From:
              </Typography>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className={`w-full rounded-lg text-sm font-semibold ${
                    isDarkMode
                      ? "border-gray-500 bg-gray-700 !text-white"
                      : "border-gray-300 bg-white !text-gray-900"
                  }`}
                />
                <button
                  onClick={() =>
                    setShowFromCurrencyDropdown(!showFromCurrencyDropdown)
                  }
                  className={`absolute right-0 top-0 h-full px-2 rounded-l-none rounded-r-lg border-r border-t border-b ${
                    isDarkMode
                      ? "border-gray-500 text-gray-300 hover:bg-gray-600"
                      : "border-gray-300 text-gray-600 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">{fromCurrency}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="w-2 h-2" />
                  </div>
                </button>

                {/* Currency Dropdown */}
                {showFromCurrencyDropdown && (
                  <div
                    className={`absolute top-full right-0 mt-1 rounded-lg border shadow-lg z-20 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-600"
                        : "bg-white border-gray-200"
                    }`}
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
                              ? "bg-blue-50 text-blue-600"
                              : ""
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
                className={`mb-2 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                To:
              </Typography>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="1000"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  className={`w-full rounded-lg text-sm font-semibold ${
                    isDarkMode
                      ? "border-gray-500 bg-gray-700 !text-white"
                      : "border-gray-300 bg-white !text-gray-900"
                  }`}
                />
                <button
                  onClick={() =>
                    setShowToCurrencyDropdown(!showToCurrencyDropdown)
                  }
                  className={`absolute right-0 top-0 h-full px-2 rounded-l-none rounded-r-lg border-r border-t border-b ${
                    isDarkMode
                      ? "border-gray-500 text-gray-300 hover:bg-gray-600"
                      : "border-gray-300 text-gray-600 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">{toCurrency}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="w-2 h-2" />
                  </div>
                </button>

                {/* Currency Dropdown */}
                {showToCurrencyDropdown && (
                  <div
                    className={`absolute top-full right-0 mt-1 rounded-lg border shadow-lg z-20 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-600"
                        : "bg-white border-gray-200"
                    }`}
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
                              ? "bg-blue-50 text-blue-600"
                              : ""
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
