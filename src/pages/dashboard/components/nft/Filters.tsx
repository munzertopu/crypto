import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EstimatedValueDropdown from "../../../../components/AmountRangeDropdown";
import SearchField from "../../../../components/UI/SearchField";

import {
  faChevronDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import DateRangePickerPopover from "../../../../components/DateRangePicker";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm
}) => {
  const [showEstimatedValueDropdown, setShowEstimatedValueDropdown] =
    useState(false);
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("USDT");
  const [showGainDropdown, setShowGainDropdown] = useState(false);
  const [selectedGain, setSelectedGain] = useState("Highest gain");
  const [fromValue, setFromValue] = useState("0");
  const [toValue, setToValue] = useState("0");
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  // Create shortcuts with year dropdown

  return (
    <div className="mx-8 md:mx-6 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Search Bar - 1/3 width */}
        <div>
          <SearchField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search"
            ariaLabel="Search NFTs"
            className="!py-2 border-default dark:border-[#4D5050]"
            size="lg"
          />
        </div>

        {/* Filters - 1/3 width */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <EstimatedValueDropdown
            fromValue={fromValue}
            setFromValue={setFromValue}
            toValue={toValue}
            setToValue={setToValue}
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            toCurrency={toCurrency}
            setToCurrency={setToCurrency}
            isOpen={showEstimatedValueDropdown}
            setIsOpen={setShowEstimatedValueDropdown}
            title="Estimated value"
          />
          <div className={`max-w-[190px] flex items-center`}>
            <DateRangePickerPopover
              selectedDateRange={selectedDateRange}
              onDateRangeChange={setSelectedDateRange}
              buttonLabel="Purchase date"
              className="py-3"
            />
          </div>

          <div className="flex-1 relative my-4">
            <div
              className="w-full sm:w-[200px] px-3 py-3 flex items-center justify-between cursor-pointer rounded-lg shadow-sm border text-sm bg-transparent border-[#E1E3E5] text-[#0E201E] 
                dark:border-[#4D5050] dark:text-white"
              onClick={() => setShowGainDropdown(!showGainDropdown)}
            >
              <span>{selectedGain}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-xs transition-transform ${
                  showGainDropdown ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Gain Dropdown */}
            {showGainDropdown && (
              <div className="absolute top-full md:px-1.5 md:py-0.5 left-0 right-0 mt-1 rounded-lg border shadow-lg z-20 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                <div className="py-1">
                  {["Highest gain", "Lowest gain"].map((gain) => (
                    <button
                      key={gain}
                      onClick={() => {
                        setSelectedGain(gain);
                        setShowGainDropdown(false);
                      }}
                      className={`w-full px-3 md:px-1.5 py-2 text-left text-sm flex items-center justify-between rounded-lg text-gray-900 dark:text-gray-150 hover:bg-gray-50 dark:hover:bg-[#0A0F290A] ${
                        selectedGain === gain ? "bg-[#0A0F290A]" : ""
                      }`}
                    >
                      {/* <span>#0A0F290A</span> */}
                      <span>{gain}</span>
                      {selectedGain === gain && (
                        <svg
                          className="w-4 h-4"
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
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {(fromValue !== "0" ||
        toValue !== "0" ||
        selectedDateRange ||
        selectedGain !== "Highest gain") && (
        <div className="mb-3 py-2">
          <div className="flex flex-wrap gap-2">
            {/* Currency Range Filter Tag */}
            {(fromValue !== "0" || toValue !== "0") && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 border border-[#E1E3E5] dark:bg-gray-700 rounded-full">
                <span className="text-sm font-semibold text-black-800 dark:text-white">
                  {fromValue}-{toValue} {fromCurrency}
                </span>
                <button
                  onClick={() => {
                    setFromValue("0");
                    setToValue("0");
                    setFromCurrency("USDT");
                    setToCurrency("USDT");
                  }}
                  className="text-black-600 dark:text-gray-300 text-base"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Date Range Filter Tag */}
            {selectedDateRange && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 border border-[#E1E3E5] dark:bg-gray-700 rounded-full">
                <span className="text-sm font-semibold text-black-800 dark:text-white">
                  {selectedDateRange.startDate && selectedDateRange.endDate
                    ? `${new Date(
                        selectedDateRange.startDate
                      ).toLocaleDateString("en-GB")} - ${new Date(
                        selectedDateRange.endDate
                      ).toLocaleDateString("en-GB")}`
                    : selectedDateRange.startDate
                    ? new Date(selectedDateRange.startDate).toLocaleDateString(
                        "en-GB"
                      )
                    : "Date selected"}
                </span>
                <button
                  onClick={() => setSelectedDateRange({ startDate: null, endDate: null })}
                  className="text-black dark:text-gray-300"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Gain Filter Tag */}
            {selectedGain !== "Highest gain" && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 border border-[#E1E3E5] dark:bg-gray-700 rounded-full">
                <span className="text-sm font-semibold text-black dark:text-white">
                  {selectedGain}
                </span>
                <button
                  onClick={() => setSelectedGain("Highest gain")}
                  className="text-black dark:text-gray-300"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Clear All Button */}
            <div className="flex items-center justify-between mx-2">
              <button
                onClick={() => {
                  setFromValue("0");
                  setToValue("0");
                  setSelectedDateRange({ startDate: null, endDate: null });
                  setSelectedGain("Highest gain");
                  setFromCurrency("USDT");
                  setToCurrency("USDT");
                }}
                className="flex items-center gap-1 text-[#5F9339] text-sm"
              >
                <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                <span>Clear all</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
