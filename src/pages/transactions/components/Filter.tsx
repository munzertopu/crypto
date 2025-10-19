import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheck,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Input, Tabs } from "@material-tailwind/react";
import AmountRangeDropdown from "../../../components/AmountRangeDropdown";
import { Accordion, AccordionItem } from "../../../components/Accordion";
import useScreenSize from "../../../hooks/useScreenSize";
import MobileDrawer from "../../../components/Drawers/MobileDrawer";
import DateRangePickerPopover from "../../../components/DateRangePicker";
import SearchIcon from "../../../components/Icons/SearchIcon";
import Dropdown from "../../../components/UI/Dropdown";
import CheckboxDropdown from "../../../components/UI/CheckboxDropdown";
import BlueCheckedIcon from "../../../components/Icons/BlueCheckedIcon";
import CloseIcon from "../../../components/Icons/CloseIcon";
import SecondaryButton from "../../../components/UI/Buttons/SecondaryButton";
import FilterIcon from "../../../components/Icons/FilterIcon";
import EyeIcon from "../../../components/Icons/EyeIcon";
import { set } from "date-fns";
import { tr } from "date-fns/locale";

interface WalletOption {
  id: string;
  name: string;
  logo: string;
  color: string;
}

interface TagOption {
  id: string;
  name: string;
}

interface FilterProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string[];
  setSelectedType: (type: string[] | ((prev: string[]) => string[])) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[] | ((prev: string[]) => string[])) => void;
  selectedManuals: string[];
  setSelectedManuals: (
    manuals: string[] | ((prev: string[]) => string[])
  ) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  hideTab?: boolean;
}
const tabs = ["All", "Uncategorized", "Warnings"];

const walletOptions: WalletOption[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    logo: "crypto/bitcoin-btc-logo.png",
    color: "bg-orange-500",
  },
  {
    id: "metamask",
    name: "MetaMask",
    logo: "crypto/metamask.png",
    color: "bg-orange-400",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    logo: "crypto/ethereum-eth-logo.png",
    color: "bg-blue-500",
  },
  {
    id: "gemini",
    name: "Gemini",
    logo: "crypto/gemini.png",
    color: "bg-black",
  },
  {
    id: "avalanche",
    name: "Avalanche Avax",
    logo: "crypto/kraken.png",
    color: "bg-red-500",
  },
  {
    id: "bldget",
    name: "Bldget",
    logo: "crypto/theta-fuel-tfuel-logo.png",
    color: "bg-cyan-500",
  },
  {
    id: "coinbase",
    name: "Coinbase",
    logo: "crypto/coinbase.png",
    color: "bg-blue-600",
  },
];

const tagOptions: TagOption[] = [
  { id: "all", name: "All" },
  { id: "buy", name: "Buy" },
  { id: "sell", name: "Sell" },
  { id: "swap", name: "Swap" },
  { id: "transfer", name: "Transfer" },
];

const resultOptions: TagOption[] = [
  { id: "completed", name: "Completed" },
  { id: "pending", name: "Pending" },
  { id: "failed", name: "Failed" },
];

const typeOptions = [
  { label: "All trades", value: "all_trades" },
  { label: "Withdrawals", value: "withdrawals" },
  { label: "Deposit", value: "deposit" },
  { label: "Trade: Fiat-Crypto", value: "trade_fiat_crypto" },
  { label: "Trade: Crypto-Fiat", value: "trade_crypto_fiat" },
  { label: "Trade: Crypto-Crypto", value: "trade_crypto_crypto" },
  { label: "Transfer", value: "transfer" },
];

const tagOptionsData = [
  { label: "Token Migration", value: "token_migration" },
  { label: "Capital Contribution", value: "capital_contribution" },
  { label: "Collateral Deposit", value: "collateral_deposit" },
  { label: "Collateral Withdrawal", value: "collateral_withdrawal" },
  { label: "Spend", value: "spend" },
  { label: "Stolen", value: "stolen" },
  { label: "Reward", value: "reward" },
];

const manualOptionsData = [
  { label: "All", value: "all" },
  { label: "Receive", value: "receive" },
  { label: "Sent", value: "sent" },
  { label: "Transfer", value: "transfer" },
  { label: "Simulate", value: "simulate" },
  { label: "Deploy", value: "deploy" },
];

const resultOptionsData = [
  { label: "All", value: "all" },
  { label: "Receive", value: "receive" },
  { label: "Sent", value: "sent" },
  { label: "Transfer", value: "transfer" },
  { label: "Simulate", value: "simulate" },
  { label: "Deploy", value: "deploy" },
];

const searchOptions = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    logo: "crypto/bitcoin-btc-logo.png",
    color: "bg-orange-500",
  },
  {
    id: "bybit",
    name: "Bybit",
    logo: "crypto/bybit.png",
    color: "bg-blue-600",
  },
  {
    id: "bldget",
    name: "Bldget",
    logo: "crypto/theta-fuel-tfuel-logo.png",
    color: "bg-cyan-500",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    logo: "crypto/ethereum-eth-logo.png",
    color: "bg-blue-500",
  },
  {
    id: "metamask",
    name: "MetaMask",
    logo: "crypto/metamask.png",
    color: "bg-orange-400",
  },
];

const Filter: React.FC<FilterProps> = ({
  activeTab = "Portfolio",
  onTabChange,
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  selectedTags,
  setSelectedTags,
  selectedManuals,
  setSelectedManuals,
  hideTab = false,
}) => {
  const [showWarningBanner, setShowWarningBanner] = useState(true);
  const [walletSearchTerm, setWalletSearchTerm] = useState("");
  const [enabledManual, setEnabledManual] = useState(false);
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);

  // Tag Dropdown
  const [tagSearchTerm, setTagSearchTerm] = useState("");

  // Result Dropdown
  const [resultDropdownOpen, setResultDropdownOpen] = useState(false);
  const [resultSearchTerm, setResultSearchTerm] = useState("");
  const [selectedResults, setSelectedResults] = useState<string[]>([]);
  const resultDropdownRef = useRef<HTMLDivElement>(null);

  // Amount Sent Dropdown
  const [amountSentDropdownOpen, setAmountSentDropdownOpen] = useState(false);
  const [fromSentCurrency, setFromSentCurrency] = useState("USD");
  const [toSentCurrency, setToSentCurrency] = useState("USD");
  const [fromSentValue, setFromSentValue] = useState("");
  const [toSentValue, setToSentValue] = useState("");

  // Amount Received Dropdown
  const [amountReceivedDropdownOpen, setAmountReceivedDropdownOpen] =
    useState(false);
  const [fromReceivedCurrency, setFromReceivedCurrency] = useState("USD");
  const [toReceivedCurrency, setToReceivedCurrency] = useState("USD");
  const [fromReceivedValue, setFromReceivedValue] = useState("0");
  const [toReceivedValue, setToReceivedValue] = useState("0");

  // Date
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  // Advanced Filter
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState([
    { account: "", condition: "", value: "" },
  ]);
  const advancedFilterRef = useRef<HTMLDivElement>(null);

  // View Options
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [showDeleted, setShowDeleted] = useState(true);
  const [showSoftDeletedOnly, setShowSoftDeletedOnly] = useState(false);
  const viewDropdownRef = useRef<HTMLDivElement>(null);

  // Search Suggestions
  const [isSearchSuggestionsOpen, setIsSearchSuggestionsOpen] = useState(false);
  const [searchSuggestionsRef, setSearchSuggestionsRef] =
    useState<HTMLDivElement | null>(null);
  const [selectedSearchItems, setSelectedSearchItems] = useState<string[]>([]);

  // Count active advanced filters
  const activeAdvancedFiltersCount = advancedFilters.filter(
    (filter) => filter.account && filter.condition && filter.value
  ).length;

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const screenSize = useScreenSize();
  const [showFromCurrencyDropdown, setShowFromCurrencyDropdown] =
    useState(false);
  const [showToCurrencyDropdown, setShowToCurrencyDropdown] = useState(false);
  // Helper function to format dates
  const formatDate = (date: Date | string) => {
    if (typeof date === "string") {
      return date;
    }
    if (date instanceof Date) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return "";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultDropdownRef.current &&
        !resultDropdownRef.current.contains(event.target as Node)
      ) {
        setResultDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close advanced filter when clicking outside
  useEffect(() => {
    const handleAdvancedFilterClickOutside = (event: MouseEvent) => {
      if (
        advancedFilterRef.current &&
        !advancedFilterRef.current.contains(event.target as Node)
      ) {
        setIsAdvancedFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleAdvancedFilterClickOutside);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleAdvancedFilterClickOutside
      );
    };
  }, []);

  // Close view dropdown when clicking outside
  useEffect(() => {
    const handleViewDropdownClickOutside = (event: MouseEvent) => {
      if (
        viewDropdownRef.current &&
        !viewDropdownRef.current.contains(event.target as Node)
      ) {
        setIsViewDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleViewDropdownClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleViewDropdownClickOutside);
    };
  }, []);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleSearchSuggestionsClickOutside = (event: MouseEvent) => {
      if (
        searchSuggestionsRef &&
        !searchSuggestionsRef.contains(event.target as Node)
      ) {
        setIsSearchSuggestionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleSearchSuggestionsClickOutside);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleSearchSuggestionsClickOutside
      );
    };
  }, [searchSuggestionsRef]);

  const filteredTypeOptions = typeOptions.filter((option) =>
    option.label.toLowerCase().includes(walletSearchTerm.toLowerCase())
  );

  const filteredSearchOptions = searchOptions.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearchSuggestionsOpen(value.length > 0);
  };

  const handleSearchItemToggle = (itemId: string) => {
    setSelectedSearchItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredTagOptions = tagOptionsData.filter((option) =>
    option.label.toLowerCase().includes(tagSearchTerm.toLowerCase())
  );

  const filteredResultOptions = resultOptions.filter((option) =>
    option.name.toLowerCase().includes(resultSearchTerm.toLowerCase())
  );

  const handleTypeToggle = (typeId: string) => {
    setSelectedType((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleResultToggle = (resultId: string) => {
    setSelectedResults((prev) =>
      prev.includes(resultId)
        ? prev.filter((id) => id !== resultId)
        : [...prev, resultId]
    );
  };

  // Helper functions to remove individual filters
  const removeTypeFilter = (typeId: string) => {
    setSelectedType((prev) => prev.filter((id) => id !== typeId));
  };

  const removeTagFilter = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((id) => id !== tagId));
  };

  const removeManualFilter = (manualId: string) => {
    setSelectedManuals((prev) => prev.filter((id) => id !== manualId));
  };

  const removeResultFilter = (resultId: string) => {
    setSelectedResults((prev) => prev.filter((id) => id !== resultId));
  };

  const removeSearchFilter = (searchId: string) => {
    setSelectedSearchItems((prev) => prev.filter((id) => id !== searchId));
  };

  const removeAmountSentFilter = () => {
    setFromSentValue("0");
    setToSentValue("0");
    setFromSentCurrency("USD");
    setToSentCurrency("USD");
  };

  const removeAmountReceivedFilter = () => {
    setFromReceivedValue("0");
    setToReceivedValue("0");
    setFromReceivedCurrency("USD");
    setToReceivedCurrency("USD");
  };

  const removeDateFilter = () => {
    setSelectedDateRange({ startDate: null, endDate: null });
  };

  const clearAllFilters = () => {
    setSelectedType([]);
    setSelectedTags([]);
    setSelectedManuals([]);
    setSelectedResults([]);
    setSelectedSearchItems([]);
    setAdvancedFilters([{ account: "", condition: "", value: "" }]);
    setFromSentValue("0");
    setToSentValue("0");
    setFromSentCurrency("USD");
    setToSentCurrency("USD");
    setFromReceivedValue("0");
    setToReceivedValue("0");
    setFromReceivedCurrency("USD");
    setToReceivedCurrency("USD");
    setSelectedDateRange({ startDate: null, endDate: null });
  };

  // Check if any filters are active
  const hasActiveFilters =
    selectedType.length > 0 ||
    selectedTags.length > 0 ||
    selectedManuals.length > 0 ||
    selectedResults.length > 0 ||
    selectedSearchItems.length > 0 ||
    activeAdvancedFiltersCount > 0 ||
    (fromSentValue !== "" && fromSentValue !== "0") ||
    (toSentValue !== "" && toSentValue !== "0") ||
    fromReceivedValue !== "0" ||
    toReceivedValue !== "0" ||
    (selectedDateRange &&
      selectedDateRange.startDate &&
      selectedDateRange.endDate);
  const howManyFilters =
    Object.values({
      selectedType,
      selectedTags,
      selectedManuals,
      selectedResults,
      selectedSearchItems,
      activeAdvancedFiltersCount,
      fromSentValue,
      toSentValue,
      fromReceivedValue,
      toReceivedValue,
      selectedDateRange: selectedDateRange ? 1 : 0,
    }).filter((filter) => filter !== "" && filter !== 0 && filter !== null)
      .length / 2;

  return (
    <div className={`p-0 sm:p-4 md:px-0 md:pt-5 md:pb-6 rounded-lg `}>
      {/* Tabs */}
      {!hideTab && (
        <div className={`border-gray-200 dark:border-gray-700`}>
          <Tabs>
            <Tabs.List className="my-0 mt-3 lg:my-2 bg-white dark:bg-gray-800  w-full sm:w-[fit-content]">
              {tabs.map((tab) => (
                <Tabs.Trigger
                  key={tab}
                  value={tab}
                  onClick={() => onTabChange?.(tab)}
                  className={`w-full sm:w-[inherit] px-2.5 sm:px-5 md:px-2.5 py-1.5 sm:py-2 md:py-1.5 rounded-lg sm:rounded-xl md:rounded-xl text-sm sm:text-lg md:text-sm ${
                    activeTab === tab
                      ? "bg-green-400 dark:bg-gray-0 text-primary dark:text-gray-900"
                      : "text-gray-600 dark:text-gray-200"
                  }`}
                >
                  {tab}
                </Tabs.Trigger>
              ))}
              <Tabs.TriggerIndicator />
            </Tabs.List>
          </Tabs>
        </div>
      )}

      {/* Blue Alert Banner for Warnings Tab */}
      {activeTab === "Warnings" && showWarningBanner && (
        <div
          className={`sm:my-2 px-4 py-3 sm:px-6 sm:py-4 rounded-lg border border-info-500 text-[#2186D7]
            dark:border-blue-600 dark:text-blue-300`}
        >
          <div className="sm:hidden">
            <div className="flex justify-between items-start">
              <div className="w-5 h-5">
                <BlueCheckedIcon />
              </div>
              <button
                className={`text-sm font-medium text-[#4D5050] 
                  dark:text-gray-400`}
                onClick={() => setShowWarningBanner(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="mt-1.5 flex justify-start items-center">
              <span className="text-base font-medium text-gray-900 text-left">
                You have 10 missing pricing, match them at the setting
              </span>
            </div>
            <div className="flex justify-end items-center mt-1.5 ">
              <button
                className={`text-sm font-medium text-[#5F9339] 
                  dark:text-green-400`}
              >
                Match price
              </button>
            </div>
          </div>
          <div className="hidden sm:flex items-center justify-between mx-2">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5">
                <BlueCheckedIcon />
              </div>

              <span className="text-base font-medium">
                You have 10 missing pricing, match them at the setting
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                className={`text-sm font-medium text-[#5F9339] 
                  dark:text-green-400`}
              >
                Match price
              </button>
              <button
                className={`text-sm font-medium text-[#4D5050] 
                  dark:text-gray-400`}
                onClick={() => setShowWarningBanner(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row md:justify-between lg:items-center gap-5 mt-[20px] sm:mt-0">
        <div className="w-full md:w-auto flex flex-row justify-start md:items-center md:space-x-5 mt-4 gap-2 md:gap-0 md:mt-0">
          {/* Search Input with Suggestions */}
          <div
            className="relative w-full md:w-auto"
            ref={setSearchSuggestionsRef}
          >
            <div className="w-full md:w-auto flex flex-row justify-start items-center px-4 py-3 box-border border border-[rgba(225,227,229,1)] dark:border-gray-700 rounded-[12px] shadow-[0px_1px_2px_0px_rgba(20,21,26,0.05)] bg-[rgba(255,255,255,1)] dark:bg-[#0E201E]">
              <div className="w-full md:w-auto flex flex-row justify-start items-center gap-3">
                <SearchIcon
                  width={16}
                  height={16}
                  strokeColor="currentColor"
                  className="text-gray-900 dark:text-gray-150 opacity-70"
                />
                <input
                  type="text"
                  placeholder={
                    selectedSearchItems.length > 0
                      ? `${selectedSearchItems.length} selected`
                      : "Search"
                  }
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  onFocus={() => setIsSearchSuggestionsOpen(true)}
                  className="text-sm w-full border-gray-700 text-gray-900 dark:text-gray-150 placeholder-gray-400 focus:outline-none bg-transparent dark:bg-transparent dark:border-[#4D5050]"
                />
              </div>
            </div>

            {/* Search Suggestions */}
            {isSearchSuggestionsOpen && filteredSearchOptions.length > 0 && (
              <div className="hidden md:block absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-900 border border-default dark:border-gray-700 rounded-lg shadow-sm z-50">
                <div className="max-h-48 overflow-y-auto">
                  {filteredSearchOptions.map((option) => {
                    const isSelected = selectedSearchItems.includes(option.id);
                    return (
                      <div
                        key={option.id}
                        onClick={() => handleSearchItemToggle(option.id)}
                        className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <div
                          className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-3 transition-colors ${
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
                        <img
                          src={option.logo}
                          alt={option.name}
                          className={`w-6 h-6 rounded-full ${option.color} flex items-center justify-center text-white text-xs font-bold mr-3`}
                        />
                        <span className="text-sm text-gray-900 dark:text-gray-250">
                          {option.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <SecondaryButton
            onClick={() => setShowMobileFilters(true)}
            icon={<FilterIcon />}
            className="flex sm:hidden"
          />
          <SecondaryButton icon={<EyeIcon />} className="flex sm:hidden" />
          {/* Type Dropdown */}
          <CheckboxDropdown
            options={typeOptions}
            onSelect={(values) => {
              setSelectedType(values);
            }}
            selectedValues={selectedType}
            defaultValue="Type"
            className="min-w-[120px] hidden md:block"
          />

          {/* Tag Dropdown */}
          <CheckboxDropdown
            options={tagOptionsData}
            onSelect={(values) => {
              setSelectedTags(values);
            }}
            searchable={true}
            searchPlaceholder="search tag"
            selectedValues={selectedTags}
            defaultValue="Tag"
            className="min-w-[140px] hidden md:block"
          />

          {/* Manual Dropdown */}
          <CheckboxDropdown
            options={manualOptionsData}
            onSelect={(values) => {
              setSelectedManuals(values);
            }}
            selectedValues={selectedManuals}
            defaultValue="Manual"
            className="min-w-[140px] hidden md:block"
          />

          {/* Result Dropdown */}

          {/* Manual Dropdown */}
          <CheckboxDropdown
            options={resultOptionsData}
            onSelect={(values) => {
              setSelectedResults(values);
            }}
            selectedValues={selectedResults}
            defaultValue="Result"
            className="min-w-[140px] hidden md:block"
          />

          {/* Amount Sent Dropdown */}
          {/* <AmountRangeDropdown
            fromValue={fromSentValue}
            setFromValue={setFromSentValue}
            toValue={toSentValue}
            setToValue={setToSentValue}
            fromCurrency={fromSentCurrency}
            setFromCurrency={setFromSentCurrency}
            toCurrency={toSentCurrency}
            setToCurrency={setToSentCurrency}
            isOpen={amountSentDropdownOpen}
            setIsOpen={setAmountSentDropdownOpen}
            title="Amount sent"
          /> */}

          {/* Amount Received Dropdown */}
          {/* <AmountRangeDropdown
            fromValue={fromReceivedValue}
            setFromValue={setFromReceivedValue}
            toValue={toReceivedValue}
            setToValue={setToReceivedValue}
            fromCurrency={fromReceivedCurrency}
            setFromCurrency={setFromReceivedCurrency}
            toCurrency={toReceivedCurrency}
            setToCurrency={setToReceivedCurrency}
            isOpen={amountReceivedDropdownOpen}
            setIsOpen={setAmountReceivedDropdownOpen}
            title="Amount received"
          /> */}
          <div className={`max-w-[190px] flex items-center hidden md:block`}>
            <DateRangePickerPopover
              selectedDateRange={selectedDateRange}
              onDateRangeChange={setSelectedDateRange}
              iconPosition="right"
              buttonLabel="Date"
              className="md:px-4 md:py-3 shadow-sm rounded-lg w-max"
              buttonClassName="md:text-base md:font-normal"
            />
          </div>

          {/* Advanced Filter Dropdown */}
          <div className="hidden md:block relative" ref={advancedFilterRef}>
            <button
              onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
              className="flex items-center justify-between px-4 py-3 rounded-lg border border-transparent bg-transparent text-gray-700 hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none dark:border-gray-700 dark:bg-[#0E201E] dark:text-gray-300 min-w-[140px]"
            >
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-medium">Advanced Filter</span>
                {activeAdvancedFiltersCount > 0 && (
                  <div className="flex items-center justify-center w-4 h-4 bg-green-600 border border-white rounded-full">
                    <span className="text-[10px] font-medium text-white">
                      {activeAdvancedFiltersCount}
                    </span>
                  </div>
                )}
              </div>
            </button>

            {/* Advanced Filter Dropdown Content */}
            {isAdvancedFilterOpen && (
              <div className="absolute top-full right-0 mt-1 w-min bg-white dark:bg-gray-900 border border-default dark:border-gray-700 rounded-lg shadow-sm z-50 p-4">
                <div className="space-y-3">
                  {advancedFilters.map((filter, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Dropdown
                        options={[
                          { label: "Account", value: "account" },
                          { label: "Wallet", value: "wallet" },
                        ]}
                        onSelect={(value) => {
                          const newFilters = [...advancedFilters];
                          newFilters[index].account = value;
                          setAdvancedFilters(newFilters);
                        }}
                        defaultValue={filter.account || "Account"}
                      />

                      <Dropdown
                        options={[
                          { label: "Is", value: "is" },
                          { label: "Is not", value: "is_not" },
                          { label: "Contains", value: "contains" },
                          { label: "Greater than", value: "gt" },
                          { label: "Less than", value: "lt" },
                        ]}
                        onSelect={(value) => {
                          const newFilters = [...advancedFilters];
                          newFilters[index].condition = value;
                          setAdvancedFilters(newFilters);
                        }}
                        defaultValue={filter.condition || "Is"}
                      />

                      <Dropdown
                        options={[
                          { label: "BTC", value: "btc" },
                          { label: "ETH", value: "eth" },
                          { label: "USD", value: "usd" },
                        ]}
                        onSelect={(value) => {
                          const newFilters = [...advancedFilters];
                          newFilters[index].value = value;
                          setAdvancedFilters(newFilters);
                        }}
                        defaultValue={filter.value || "Set Value"}
                        className="w-max"
                      />

                      {advancedFilters.length > 1 && (
                        <button
                          onClick={() => {
                            const newFilters = advancedFilters.filter(
                              (_, i) => i !== index
                            );
                            setAdvancedFilters(newFilters);
                          }}
                          className="ml-auto p-3 border border-default rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 6L6 18M6 6L18 18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center justify-between dark:border-gray-700">
                    <button
                      onClick={() => {
                        setAdvancedFilters([
                          ...advancedFilters,
                          { account: "", condition: "", value: "" },
                        ]);
                      }}
                      className="flex items-center gap-2 px-2.5 py-1.5 text-gray-600 rounded-lg border border-default hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm font-medium">Add Filter</span>
                    </button>

                    <button
                      onClick={() => {
                        setAdvancedFilters([
                          { account: "", condition: "", value: "" },
                        ]);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm font-medium">Clear all</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* View Dropdown - Right End */}
        <div className="hidden md:block relative" ref={viewDropdownRef}>
          <button
            onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
            className="flex items-center justify-between px-4 py-3 rounded-lg border border-default bg-white text-gray-700 hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none dark:border-gray-700 dark:bg-[#0E201E] dark:text-gray-300 min-w-[100px]"
          >
            <span className="text-sm font-medium">View</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transform transition-transform ${
                isViewDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* View Dropdown Content */}
          {isViewDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-64 bg-white dark:bg-gray-900 border border-default dark:border-gray-700 rounded-lg shadow-sm z-50 p-4">
              <div className="space-y-4">
                {/* Show deleted toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show deleted
                  </span>
                  <button
                    onClick={() => setShowDeleted(!showDeleted)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showDeleted
                        ? "bg-green-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showDeleted ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Show soft deleted only toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show soft deleted only
                  </span>
                  <button
                    onClick={() => setShowSoftDeletedOnly(!showSoftDeletedOnly)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showSoftDeletedOnly
                        ? "bg-green-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showSoftDeletedOnly ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
        {/* Type Dropdown */}
        <div className="flex flex-col gap-2 items-start">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
            Type
          </span>
          <CheckboxDropdown
            options={typeOptions}
            onSelect={(values) => {
              setSelectedType(values);
            }}
            selectedValues={selectedType}
            defaultValue="Select Type"
            className="w-full"
          />
          {/* Tag Dropdown */}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
            Tag
          </span>
          <CheckboxDropdown
            options={tagOptionsData}
            onSelect={(values) => {
              setSelectedTags(values);
            }}
            searchable={true}
            searchPlaceholder="search tag"
            selectedValues={selectedTags}
            defaultValue="Select Tag"
            className="w-full"
          />

          {/* Result Dropdown */}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
            Result
          </span>
          <CheckboxDropdown
            options={resultOptionsData}
            onSelect={(values) => {
              setSelectedResults(values);
            }}
            selectedValues={selectedResults}
            defaultValue="Select Result"
            className="w-full"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
            Date
          </span>
          <div className="w-full">
            <DateRangePickerPopover
              selectedDateRange={selectedDateRange}
              onDateRangeChange={setSelectedDateRange}
              buttonLabel="Set Date"
              className="shadow-sm rounded-lg w-full !py-3"
              buttonLabelClassName="!text-base  w-full "
              openByDefault
              isDrawer
              popOverClassName="!p-0"
            />
          </div>
          <div className="flex justify-between px-4 py-2.5 border border-gray-150 dark:border-gray-700 rounded-[12px] w-full">
            <span className={`text-base  text-gray-900 dark:text-gray-150`}>
              Manual
            </span>
            <button
              onClick={() => setEnabledManual(!enabledManual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enabledManual ? "bg-[#90C853]" : "bg-[#CDCFD1] dark:bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  enabledManual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {showAdvanceFilter && (
            <div className="w-full">
              <div className="flex justify-between items-center py-6">
                <span className="text-base font-semibold text-gray-700 dark:text-gray-300 text-left">
                  Advanced Filters
                </span>
                <button
                  onClick={() => {
                    setShowAdvanceFilter(false);
                    setAdvancedFilters([
                      { account: "", condition: "", value: "" },
                    ]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-medium">Clear all</span>
                </button>
              </div>
              <div className="space-y-3 w-full">
                {advancedFilters.map((filter, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start gap-3 w-full"
                  >
                    <div className="flex w-full gap-2">
                      <Dropdown
                        options={[
                          { label: "Account", value: "account" },
                          { label: "Wallet", value: "wallet" },
                        ]}
                        onSelect={(value) => {
                          const newFilters = [...advancedFilters];
                          newFilters[index].account = value;
                          setAdvancedFilters(newFilters);
                        }}
                        defaultValue={filter.account || "Account"}
                        className="!w-full"
                      />

                      <Dropdown
                        options={[
                          { label: "Is", value: "is" },
                          { label: "Is not", value: "is_not" },
                          { label: "Contains", value: "contains" },
                          { label: "Greater than", value: "gt" },
                          { label: "Less than", value: "lt" },
                        ]}
                        onSelect={(value) => {
                          const newFilters = [...advancedFilters];
                          newFilters[index].condition = value;
                          setAdvancedFilters(newFilters);
                        }}
                        defaultValue={filter.condition || "Is"}
                      />
                    </div>
                    <div className="flex w-full gap-2">
                      <Dropdown
                        options={[
                          { label: "BTC", value: "btc" },
                          { label: "ETH", value: "eth" },
                          { label: "USD", value: "usd" },
                        ]}
                        onSelect={(value) => {
                          const newFilters = [...advancedFilters];
                          newFilters[index].value = value;
                          setAdvancedFilters(newFilters);
                        }}
                        defaultValue={filter.value || "Set Value"}
                        className="w-full"
                      />
                      {advancedFilters.length > 1 && (
                        <button
                          onClick={() => {
                            const newFilters = advancedFilters.filter(
                              (_, i) => i !== index
                            );
                            setAdvancedFilters(newFilters);
                          }}
                          className="ml-auto p-3 border border-default rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 6L6 18M6 6L18 18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* <div className="flex items-center justify-between dark:border-gray-700">
                  <button
                    onClick={() => {
                      setAdvancedFilters([
                        ...advancedFilters,
                        { account: "", condition: "", value: "" },
                      ]);
                    }}
                    className="flex items-center gap-2 px-2.5 py-1.5 text-gray-600 rounded-lg border border-default hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm font-medium">Add Filter</span>
                  </button>
                </div> */}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              setShowAdvanceFilter(true);

              if (showAdvanceFilter) {
                setAdvancedFilters([
                  ...advancedFilters,
                  { account: "", condition: "", value: "" },
                ]);
              }
            }}
            className="flex items-center justify-center md:justify-start space-x-2 px-5 py-3 rounded-lg border border-[#E1E3E5] text-[#0E201E] dark:border-gray-600 dark:text-green-400"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Add Filter</span>
          </button>
        </div>
      </MobileDrawer>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="hidden md:block pt-4 md:pt-2">
          <div className="flex flex-wrap gap-2">
            {/* Type Filters */}
            {selectedType.map((typeId) => {
              const type = typeOptions.find((t) => t.value === typeId);
              return type ? (
                <div
                  key={`type-${typeId}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                    bg-gray-100 text-gray-800 border border-default
                    dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
                >
                  <span>{type.label}</span>
                  <button
                    onClick={() => removeTypeFilter(typeId)}
                    className="transition-colors"
                    aria-label={`Remove ${type.label} filter`}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="w-3 h-3"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : null;
            })}

            {/* Tag Filters */}
            {selectedTags.map((tagId) => {
              const tag = tagOptionsData.find((a) => a.value === tagId);
              return tag ? (
                <div
                  key={`tag-${tagId}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                    bg-gray-100 text-gray-800 border border-default
                    dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
                >
                  <span>{tag.label}</span>
                  <button
                    onClick={() => removeTagFilter(tagId)}
                    className="transition-colors"
                    aria-label={`Remove ${tag.label} filter`}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="w-3 h-3"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : null;
            })}

            {/* Manual Filters */}
            {selectedManuals.map((manualId) => {
              const manual = manualOptionsData.find(
                (m) => m.value === manualId
              );
              return manual ? (
                <div
                  key={`manual-${manualId}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                    bg-gray-100 text-gray-800 border border-default
                    dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
                >
                  <span>{manual.label}</span>
                  <button
                    onClick={() => removeManualFilter(manualId)}
                    className="transition-colors"
                    aria-label={`Remove ${manual.label} filter`}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="w-3 h-3"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : null;
            })}

            {/* Result Filters */}
            {selectedResults.map((resultId) => {
              const result = resultOptionsData.find(
                (r) => r.value === resultId
              );
              return result ? (
                <div
                  key={`result-${resultId}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                    bg-gray-100 text-gray-800 border border-default
                    dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
                >
                  <span>{result.label}</span>
                  <button
                    onClick={() => removeResultFilter(resultId)}
                    className="transition-colors"
                    aria-label={`Remove ${result.label} filter`}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="w-3 h-3"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : null;
            })}

            {/* Search Filters */}
            {selectedSearchItems.map((searchId) => {
              const searchItem = searchOptions.find((s) => s.id === searchId);
              return searchItem ? (
                <div
                  key={`search-${searchId}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                    bg-gray-100 text-gray-800 border border-default
                    dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
                >
                  <img
                    src={searchItem.logo}
                    alt={searchItem.name}
                    className={`w-4 h-4 rounded-full ${searchItem.color} flex items-center justify-center text-white text-xs font-bold`}
                  />
                  <span>{searchItem.name}</span>
                  <button
                    onClick={() => removeSearchFilter(searchId)}
                    className="transition-colors"
                    aria-label={`Remove ${searchItem.name} filter`}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="w-3 h-3"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : null;
            })}

            {/* Advanced Filters */}
            {advancedFilters.map((filter, index) => {
              if (filter.account && filter.condition && filter.value) {
                const getConditionLabel = (condition: string) => {
                  switch (condition) {
                    case "is":
                      return "Is";
                    case "is_not":
                      return "Is not";
                    case "gt":
                      return "Greater than";
                    case "lt":
                      return "Less than";
                    default:
                      return condition;
                  }
                };

                const getAccountLabel = (account: string) => {
                  switch (account) {
                    case "account":
                      return "Account";
                    case "wallet":
                      return "Wallet";
                    default:
                      return account;
                  }
                };

                return (
                  <div
                    key={`advanced-${index}`}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                      bg-gray-100 text-gray-800 border border-default
                      dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
                  >
                    <span>
                      {getAccountLabel(filter.account)}{" "}
                      {getConditionLabel(filter.condition)}{" "}
                      {filter.value.toUpperCase()}
                    </span>
                    <button
                      onClick={() => {
                        const newFilters = advancedFilters.filter(
                          (_, i) => i !== index
                        );
                        setAdvancedFilters(newFilters);
                      }}
                      className="transition-colors"
                      aria-label={`Remove advanced filter`}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="w-3 h-3"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                );
              }
              return null;
            })}

            {/* Amount Sent Filter */}
            {(fromSentValue !== "0" || toSentValue !== "0") && (
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                    bg-gray-100 text-gray-800 border border-default
                    dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
              >
                <span>
                  {fromSentValue} - {toSentValue} {fromSentCurrency}
                </span>
                <button
                  onClick={removeAmountSentFilter}
                  className="transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Amount Received Filter */}
            {(fromReceivedValue !== "0" || toReceivedValue !== "0") && (
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                    bg-gray-100 text-gray-800 border border-default
                    dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
              >
                <span>
                  {fromReceivedValue} - {toReceivedValue} {fromReceivedCurrency}
                </span>
                <button
                  onClick={removeAmountReceivedFilter}
                  className="transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Date Filter */}
            {selectedDateRange &&
              selectedDateRange.startDate &&
              selectedDateRange.endDate && (
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                    bg-gray-100 text-gray-800 border border-default
                    dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
                >
                  <span>
                    {formatDate(selectedDateRange.startDate)} -{" "}
                    {formatDate(selectedDateRange.endDate)}
                  </span>
                  <button
                    onClick={removeDateFilter}
                    className="transition-colors"
                  >
                    <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                  </button>
                </div>
              )}

            {/* Result Filters */}
            {selectedResults.map((resultId) => {
              const result = resultOptions.find((r) => r.id === resultId);
              return result ? (
                <div
                  key={`result-${resultId}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                    bg-gray-100 text-gray-800 border border-default
                    dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
                >
                  <span>{result.name}</span>
                  <button
                    onClick={() => removeResultFilter(resultId)}
                    className="transition-colors"
                    aria-label={`Remove ${result.name} filter`}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="w-3 h-3"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : null;
            })}
            <div className="flex items-center justify-between">
              <button
                onClick={clearAllFilters}
                className={`text-sm md:mx-2.5 md:my-1.5 text-[#5F9339] font-medium transition-colors`}
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

export default Filter;
