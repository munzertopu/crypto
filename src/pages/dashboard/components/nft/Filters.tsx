import React, { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Datepicker from "react-tailwindcss-datepicker";
import EstimatedValueDropdown from "../../../../components/AmountRangeDropdown";

import {
  faSearch,
  faChevronDown,
  faCross,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  isDarkMode: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  isDarkMode,
}) => {
  const [showEstimatedValueDropdown, setShowEstimatedValueDropdown] =
    useState(false);
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("USDT");
  const [purchaseDateValue, setPurchaseDateValue] = useState<any>({
    startDate: null,
    endDate: null,
  });
  const [showGainDropdown, setShowGainDropdown] = useState(false);
  const [selectedGain, setSelectedGain] = useState("Highest gain");
  const [fromValue, setFromValue] = useState("0");
  const [toValue, setToValue] = useState("0");
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);

  // Create shortcuts with year dropdown
  const createShortcuts = () => {
    const shortcuts: any = {
      today: "Today",
      last7Days: {
        text: "Last 7 days",
        period: {
          start: new Date(new Date().setDate(new Date().getDate() - 7)),
          end: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
      last30Days: {
        text: "Last 30 days",
        period: {
          start: new Date(new Date().setDate(new Date().getDate() - 30)),
          end: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
      last6Months: {
        text: "Last 6 months",
        period: {
          start: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          end: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
      last12Months: {
        text: "Last 12 months",
        period: {
          start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          end: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
      byYear: {
        text: "By Year",
        period: {
          start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          end: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
    };

    return shortcuts;
  };

  return (
    <div className="mx-8 my-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Search Bar - 1/3 width */}
        <div className="">
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className={`absolute left-3 top-1/2 transform text-xl -translate-y-1/2 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 text-lg border rounded-2xl focus:outline-none ${
                isDarkMode
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-[#14151A2F] text-[#0E201E] placeholder-gray-500"
              }`}
              aria-label="Search NFTs"
            />
          </div>
        </div>

        {/* Gap - 1/3 width */}

        {/* Filters - 1/3 width */}
        <div className="flex gap-2 flex-col sm:flex-row">
          <EstimatedValueDropdown
            isDarkMode={isDarkMode}
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
          <div
            className={`flex items-center space-x-2 rounded-lg border p-0 shadow-sm ${
              isDarkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-300"
            }`}
          >
            <Datepicker
              displayFormat="DD MMM YYYY"
              inputClassName={`text-md ml-4 text-[#0E201E]`}
              useRange={true}
              value={null}
              onChange={(newValue: any) => setSelectedDateRange(newValue)}
              showShortcuts={true}
              configs={{
                shortcuts: createShortcuts(),
              }}
              primaryColor="green"
              placeholder="Purchase date"
            />
          </div>

          <div className="flex-1 relative">
            <div
              className={`px-3 py-4 rounded-lg border text-md ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-[#0E201E]"
              } flex items-center justify-between cursor-pointer hover:border-gray-400 transition-colors`}
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
              <div
                className={`absolute top-full left-0 right-0 mt-1 rounded-lg border shadow-lg z-20 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="py-1">
                  {["Highest gain", "Lowest gain"].map((gain) => (
                    <button
                      key={gain}
                      onClick={() => {
                        setSelectedGain(gain);
                        setShowGainDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between ${
                        isDarkMode
                          ? "text-white hover:bg-[#0A0F290A]"
                          : "text-gray-900 hover:bg-gray-50"
                      } ${selectedGain === gain ? "bg-[#0A0F290A]" : ""}`}
                    >
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
        <div className="mt-4 py-2">
          <div className="flex flex-wrap gap-2">
            {/* Currency Range Filter Tag */}
            {(fromValue !== "0" || toValue !== "0") && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full">
                <span className="text-md font-semibold text-black-800">
                  {fromValue}-{toValue} {fromCurrency}
                </span>
                <button
                  onClick={() => {
                    setFromValue("0");
                    setToValue("0");
                    setFromCurrency("USDT");
                    setToCurrency("USDT");
                  }}
                  className="text-black-600 text-md"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Date Range Filter Tag */}
            {selectedDateRange && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full">
                <span className="text-md font-semibold text-black-800">
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
                  onClick={() => setSelectedDateRange(null)}
                  className="text-black"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Gain Filter Tag */}
            {selectedGain !== "Highest gain" && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full">
                <span className="text-md font-semibold text-black">
                  {selectedGain}
                </span>
                <button
                  onClick={() => setSelectedGain("Highest gain")}
                  className="text-black"
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
                  setSelectedDateRange(null);
                  setSelectedGain("Highest gain");
                  setFromCurrency("USDT");
                  setToCurrency("USDT");
                }}
                className="flex items-center gap-1 text-green-700 text-md"
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
