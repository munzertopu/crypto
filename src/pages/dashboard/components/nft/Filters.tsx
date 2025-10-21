import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@material-tailwind/react";
import SearchField from "../../../../components/UI/SearchField";

import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import DateRangePickerPopover from "../../../../components/DateRangePicker";
import SecondaryButton from "../../../../components/UI/Buttons/SecondaryButton";
import FilterIcon from "../../../../components/Icons/FilterIcon";
import { Accordion, AccordionItem } from "../../../../components/Accordion";
import MobileDrawer from "../../../../components/Drawers/MobileDrawer";
import useScreenSize from "../../../../hooks/useScreenSize";
import TopBadge from "../../../../components/UI/TopBadge";
import TaxLossHarvestingRangeDropdown from "../../../taxOptimization/taxLossHarvestingTab/components/TaxLossHarvestingRangeDropdown";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ searchTerm, setSearchTerm }) => {
  const [showEstimatedValueDropdown, setShowEstimatedValueDropdown] =
    useState(false);
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("USDT");
  const [showGainDropdown, setShowGainDropdown] = useState(false);
  const [selectedGain, setSelectedGain] = useState("Highest gain");
  const [fromValue, setFromValue] = useState("0");
  const [toValue, setToValue] = useState("0");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const screenSize = useScreenSize();
  const [showFromCurrencyDropdown, setShowFromCurrencyDropdown] =
    useState(false);
  const [showToCurrencyDropdown, setShowToCurrencyDropdown] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  // Create shortcuts with year dropdown

  return (
    <div className="sm:mx-8 md:mx-6 mt-8">
      <div className="w-full flex flex-row justify-between items-start gap-2">
        {/* Search Bar - 1/3 width */}
        <SearchField
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search"
          ariaLabel="Search NFTs"
          divClassName="!w-max"
          className="border-default dark:border-[#4D5050] dark:bg-transparent"
        />

        <TopBadge
          content={1}
          max={99}
          color="green"
          className="sm:hidden"
          invisible={
            !selectedDateRange.endDate &&
            !selectedDateRange.startDate &&
            fromValue === "0" &&
            toValue === "0" &&
            selectedGain === ""
          }
        >
          <SecondaryButton
            onClick={() => setShowMobileFilters(true)}
            icon={<FilterIcon />}
            className="flex sm:hidden"
          />
        </TopBadge>

        {/* Filters - 1/3 width */}
        <div className="hidden sm:flex gap-3 flex-col sm:flex-row">
          {/* Market Value Dropdown */}
           <div className="relative z-50">
             <TaxLossHarvestingRangeDropdown
               fromValue={fromValue}
               setFromValue={setFromValue}
               toValue={toValue}
               setToValue={setToValue}
               isOpen={showEstimatedValueDropdown}
               setIsOpen={setShowEstimatedValueDropdown}
               title="Estimated value"
               className="md:py-2.5 dark:text-white dark:border-gray-700"
             />
           </div>
          
          <div className={`max-w-[190px] flex`}>
            <DateRangePickerPopover
              selectedDateRange={selectedDateRange}
              onDateRangeChange={setSelectedDateRange}
              buttonLabel="Purchase date"
              buttonLabelClassName="!text-base"
              className="md:py-2.5"
            />
          </div>

          <div className="flex-1 relative">
            <div
              className="w-full sm:w-[200px] px-3 py-2.5 flex items-center justify-between cursor-pointer rounded-lg shadow-sm border text-base bg-transparent border-default text-gray-900 
                dark:border-gray-800 dark:text-gray-100"
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
        <div className="hidden sm:flex mb-3 py-2">
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
            {!!selectedDateRange.endDate && !!selectedDateRange.startDate && (
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
                  onClick={() =>
                    setSelectedDateRange({ startDate: null, endDate: null })
                  }
                  className="text-black dark:text-gray-300"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Gain Filter Tag */}
            {selectedGain !== "" && (
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
            {(selectedDateRange.endDate ||
              selectedDateRange.startDate ||
              fromValue !== "0" ||
              toValue !== "0" ||
              selectedGain !== "") && (
              <div className="flex items-center justify-between mx-2">
                <button
                  onClick={() => {
                    setFromValue("0");
                    setToValue("0");
                    setSelectedDateRange({ startDate: null, endDate: null });
                    setSelectedGain("");
                    setFromCurrency("USDT");
                    setToCurrency("USDT");
                  }}
                  className="flex items-center gap-1 text-[#5F9339] text-sm"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                  <span>Clear all</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <MobileDrawer
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        header="Filters"
        height={screenSize.height - 100}
        leftButtonText="Clear All"
        rightButtonText="Apply"
        onLeftButtonClick={() => setShowMobileFilters(false)}
        onRightButtonClick={() => setShowMobileFilters(false)}
      >
        <Accordion>
          <AccordionItem title="Estimated Value">
            {" "}
            <div className={`w-full  z-50 mt-2`}>
              <div className="flex flex-col gap-3">
                {/* From Input */}
                <div className="flex items-center gap-3 ">
                  <span
                    className={`min-w-[50px] text-sm font-semibold text-gray-800 dark:text-[#B6B8BA] text-left`}
                  >
                    From:
                  </span>

                  <div className="relative flex-1">
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={fromValue}
                      onChange={(e) => setFromValue(e.target.value)}
                      className={`text-base w-full border  border-gray-150 text-gray-900 dark:text-gray-150 placeholder-gray-400 focus:outline-none px-4 py-2 rounded-[12px] focus:border-[#90C853] bg-[rgba(255,255,255,1)] dark:bg-[#0E201E]
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                    <button
                      onClick={() =>
                        setShowFromCurrencyDropdown(!showFromCurrencyDropdown)
                      }
                      className={`absolute right-0 top-0 h-full px-2    rounded-r-lg border-r border-t border-b border-gray-150 rounded-l-none`}
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-caption font-medium">
                          {fromCurrency}
                        </span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="w-2 h-2"
                        />
                      </div>
                    </button>

                    {/* Currency Dropdown */}
                    {showFromCurrencyDropdown && (
                      <div
                        className={`absolute top-full right-0 mt-1 rounded-lg border shadow-lg z-20 bg-white border-gray-200 
                          dark:bg-gray-800 dark:border-gray-600`}
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
                <div className="flex items-center gap-3 ">
                  <span
                    className={`min-w-[50px] text-sm font-semibold text-gray-800 dark:text-[#B6B8BA] text-left`}
                  >
                    To:
                  </span>

                  <div className="relative flex-1">
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={toValue}
                      onChange={(e) => setToValue(e.target.value)}
                      className={`text-base w-full border  border-gray-150 text-gray-900 dark:text-gray-150 placeholder-gray-400 focus:outline-none px-4 py-2 rounded-[12px] focus:border-[#90C853] bg-[rgba(255,255,255,1)] dark:bg-[#0E201E]
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                    <button
                      onClick={() =>
                        setShowToCurrencyDropdown(!showToCurrencyDropdown)
                      }
                      className={`absolute right-0 top-0 h-full px-2    rounded-r-lg border-r border-t border-b border-gray-150 rounded-l-none`}
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-caption font-medium">
                          {toCurrency}
                        </span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="w-2 h-2"
                        />
                      </div>
                    </button>

                    {/* Currency Dropdown */}
                    {showToCurrencyDropdown && (
                      <div
                        className={`absolute top-full right-0 mt-1 rounded-lg border shadow-lg z-20 bg-white border-gray-200 
                          dark:bg-gray-800 dark:border-gray-600`}
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
          </AccordionItem>
          <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
          <AccordionItem title="Date">
            {" "}
            <DateRangePickerPopover
              selectedDateRange={selectedDateRange}
              onDateRangeChange={setSelectedDateRange}
              buttonLabel="Select Date"
              className="py-2.5"
              isDrawer
              hideDateInput
              openByDefault
            />
          </AccordionItem>
          <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
          <AccordionItem title="Highest Gain">
            {" "}
            <div className=" md:px-1.5 md:py-0.5 left-0 right-0 mt-1 rounded-lg border shadow-lg z-99 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
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
          </AccordionItem>{" "}
        </Accordion>
      </MobileDrawer>
    </div>
  );
};

export default Filters;
