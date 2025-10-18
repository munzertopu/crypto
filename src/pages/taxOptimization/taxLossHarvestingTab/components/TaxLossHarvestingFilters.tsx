import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import TaxLossHarvestingRangeDropdown from "./TaxLossHarvestingRangeDropdown";
import SecondaryButton from "../../../../components/UI/Buttons/SecondaryButton";
import FilterIcon from "../../../../components/Icons/FilterIcon";

interface TaxLossHarvestingFiltersProps {
  isDarkMode?: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TaxLossHarvestingFilters: React.FC<TaxLossHarvestingFiltersProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  // Market Value Dropdown
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [marketValueDropdownOpen, setMarketValueDropdownOpen] = useState(false);
  const [marketValueFromValue, setMarketValueFromValue] = useState("0");
  const [marketValueToValue, setMarketValueToValue] = useState("0");

  // Amount Held Dropdown
  const [amountHeldDropdownOpen, setAmountHeldDropdownOpen] = useState(false);
  const [amountHeldFromValue, setAmountHeldFromValue] = useState("0");
  const [amountHeldToValue, setAmountHeldToValue] = useState("0");

  // Cost Basis Dropdown
  const [costBasisDropdownOpen, setCostBasisDropdownOpen] = useState(false);
  const [costBasisFromValue, setCostBasisFromValue] = useState("0");
  const [costBasisToValue, setCostBasisToValue] = useState("0");

  // Gains/Losses Dropdown
  const [gainsLossesDropdownOpen, setGainsLossesDropdownOpen] = useState(false);
  const [gainsLossesFromValue, setGainsLossesFromValue] = useState("0");
  const [gainsLossesToValue, setGainsLossesToValue] = useState("0");

  // Potential Loss Dropdown
  const [potentialLossDropdownOpen, setPotentialLossDropdownOpen] =
    useState(false);
  const [potentialLossFromValue, setPotentialLossFromValue] = useState("0");
  const [potentialLossToValue, setPotentialLossToValue] = useState("0");

  // Helper functions to remove individual filters
  const removeMarketValueFilter = () => {
    setMarketValueFromValue("0");
    setMarketValueToValue("0");
  };

  const removeAmountHeldFilter = () => {
    setAmountHeldFromValue("0");
    setAmountHeldToValue("0");
  };

  const removeCostBasisFilter = () => {
    setCostBasisFromValue("0");
    setCostBasisToValue("0");
  };

  const removeGainsLossesFilter = () => {
    setGainsLossesFromValue("0");
    setGainsLossesToValue("0");
  };

  const removePotentialLossFilter = () => {
    setPotentialLossFromValue("0");
    setPotentialLossToValue("0");
  };

  const clearAllFilters = () => {
    setMarketValueFromValue("0");
    setMarketValueToValue("0");
    setAmountHeldFromValue("0");
    setAmountHeldToValue("0");
    setCostBasisFromValue("0");
    setCostBasisToValue("0");
    setGainsLossesFromValue("0");
    setGainsLossesToValue("0");
    setPotentialLossFromValue("0");
    setPotentialLossToValue("0");
  };

  // Check if any filters are active
  const hasActiveFilters =
    marketValueFromValue !== "0" ||
    marketValueToValue !== "0" ||
    amountHeldFromValue !== "0" ||
    amountHeldToValue !== "0" ||
    costBasisFromValue !== "0" ||
    costBasisToValue !== "0" ||
    gainsLossesFromValue !== "0" ||
    gainsLossesToValue !== "0" ||
    potentialLossFromValue !== "0" ||
    potentialLossToValue !== "0";

  return (
    <div className="">
      <div className="flex flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search */}
        <div className="w-full md:w-auto flex gap-2 items-center w-full md:w-auto md:gap-0">
          <div className="w-full md:w-auto relative  max-w-md">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-12 pr-4 text-lg py-2.5 border border-default rounded-xl focus:outline-none bg-white text-gray-900 
              dark:bg-transparent dark:text-gray-250 dark:border-gray-600`}
            />
          </div>
          <SecondaryButton
            icon={<FilterIcon />}
            className="flex sm:hidden"
            onClick={() => {
              setShowMobileFilters(true);
            }}
          />
        </div>
        <div className="hidden md:flex flex-row items-center space-x-4">
          {/* Market Value Dropdown */}
          <TaxLossHarvestingRangeDropdown
            fromValue={marketValueFromValue}
            setFromValue={setMarketValueFromValue}
            toValue={marketValueToValue}
            setToValue={setMarketValueToValue}
            isOpen={marketValueDropdownOpen}
            setIsOpen={setMarketValueDropdownOpen}
            title="Market value"
          />

          {/* Amount Held Dropdown */}
          <TaxLossHarvestingRangeDropdown
            fromValue={amountHeldFromValue}
            setFromValue={setAmountHeldFromValue}
            toValue={amountHeldToValue}
            setToValue={setAmountHeldToValue}
            isOpen={amountHeldDropdownOpen}
            setIsOpen={setAmountHeldDropdownOpen}
            title="Amount held"
          />

          {/* Cost Basis Dropdown */}
          <TaxLossHarvestingRangeDropdown
            fromValue={costBasisFromValue}
            setFromValue={setCostBasisFromValue}
            toValue={costBasisToValue}
            setToValue={setCostBasisToValue}
            isOpen={costBasisDropdownOpen}
            setIsOpen={setCostBasisDropdownOpen}
            title="Cost basis"
          />

          {/* Gains/Losses Dropdown */}
          <TaxLossHarvestingRangeDropdown
            fromValue={gainsLossesFromValue}
            setFromValue={setGainsLossesFromValue}
            toValue={gainsLossesToValue}
            setToValue={setGainsLossesToValue}
            isOpen={gainsLossesDropdownOpen}
            setIsOpen={setGainsLossesDropdownOpen}
            title="Gains/losses"
            isRight={true}
          />

          {/* Potential Loss Dropdown */}
          <TaxLossHarvestingRangeDropdown
            fromValue={potentialLossFromValue}
            setFromValue={setPotentialLossFromValue}
            toValue={potentialLossToValue}
            setToValue={setPotentialLossToValue}
            isOpen={potentialLossDropdownOpen}
            setIsOpen={setPotentialLossDropdownOpen}
            title="Potential Loss"
            isRight={true}
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="hidden md:block pt-4">
          <div className="flex flex-wrap gap-2">
            {/* Market Value Filter */}
            {(marketValueFromValue !== "0" || marketValueToValue !== "0") && (
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#F3F5F7] text-[#2F3232] border border-[#E1E3E5] border
                  dark:bg-gray-700 dark:text-white dark:border-gray-600`}
              >
                <span className="text-[#666868]">Market Value:</span>
                <span>
                  {" "}
                  {marketValueFromValue} - {marketValueToValue}
                </span>
                <button
                  onClick={removeMarketValueFilter}
                  className="ml-1 hover:text-red-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Amount Held Filter */}
            {(amountHeldFromValue !== "0" || amountHeldToValue !== "0") && (
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#F3F5F7] text-[#2F3232] border border-[#E1E3E5]
                  dark:bg-gray-700 dark:text-white dark:border-gray-600`}
              >
                <span className="text-[#666868]">Amount Held:</span>
                <span>
                  {" "}
                  {amountHeldFromValue} - {amountHeldToValue}
                </span>
                <button
                  onClick={removeAmountHeldFilter}
                  className="ml-1 hover:text-red-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Cost Basis Filter */}
            {(costBasisFromValue !== "0" || costBasisToValue !== "0") && (
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#F3F5F7] text-[#2F3232] border border-[#E1E3E5]
                  dark:bg-gray-700 dark:text-white dark:border-gray-600
                `}
              >
                <span className="text-[#666868]">Cost Basis:</span>
                <span>
                  {" "}
                  {costBasisFromValue} - {costBasisToValue}
                </span>
                <button
                  onClick={removeCostBasisFilter}
                  className="ml-1 hover:text-red-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Gains/Losses Filter */}
            {(gainsLossesFromValue !== "0" || gainsLossesToValue !== "0") && (
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#F3F5F7] text-[#2F3232] border border-[#E1E3E5]
                  dark:bg-gray-700 dark:text-white dark:border-gray-600`}
              >
                <span className="text-[#666868]">Gain/Losses:</span>
                <span>
                  {" "}
                  {gainsLossesFromValue} - {gainsLossesToValue}
                </span>
                <button
                  onClick={removeGainsLossesFilter}
                  className="ml-1 hover:text-red-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Potential Loss Filter */}
            {(potentialLossFromValue !== "0" ||
              potentialLossToValue !== "0") && (
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#F3F5F7] text-[#2F3232] border border-[#E1E3E5]
                  dark:bg-gray-700 dark:text-white dark:border-gray-600
                `}
              >
                <span className="text-[#666868]">Potential Loss:</span>
                <span>
                  {" "}
                  {potentialLossFromValue} - {potentialLossToValue}
                </span>
                <button
                  onClick={removePotentialLossFilter}
                  className="ml-1 hover:text-red-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Clear All Button */}
            <div className="flex items-center justify-between mx-3">
              <button
                onClick={clearAllFilters}
                className={`text-xs text-[#5F9339] font-medium transition-colors`}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="w-3 h-3 mx-2"
                  aria-hidden="true"
                />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxLossHarvestingFilters;
