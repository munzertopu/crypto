import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Input, Tabs } from "@material-tailwind/react";
import AmountRangeDropdown from "../../../components/AmountRangeDropdown";
import { Accordion, AccordionItem } from "../../../components/Accordion";
import useScreenSize from "../../../hooks/useScreenSize";
import MobileDrawer from "../../../components/Drawers/MobileDrawer";
import DateRangePickerPopover from "../../../components/DateRangePicker";
import SearchIcon from "../../../utils/icons/SearchIcon";
import Dropdown from "../../../components/UI/Dropdown";

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
  selectedType: string;
  setSelectedType: (type: string) => void;
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

const Filter: React.FC<FilterProps> = ({
  activeTab = "Portfolio",
  onTabChange,
  searchTerm,
  setSearchTerm,
  hideTab = false,
}) => {
  const [showWarningBanner, setShowWarningBanner] = useState(true);
  const [walletSearchTerm, setWalletSearchTerm] = useState("");
  const [selectedWallets, setSelectedWallets] = useState<string[]>([]);
  const walletDropdownRef = useRef<HTMLDivElement>(null);

  // Tag Dropdown
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Manual Dropdown
  const [selectedManuals, setSelectedManuals] = useState<string[]>([]);

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

  const filteredWalletOptions = walletOptions.filter((option) =>
    option.name.toLowerCase().includes(walletSearchTerm.toLowerCase())
  );

  const filteredTagOptions = tagOptions.filter((option) =>
    option.name.toLowerCase().includes(tagSearchTerm.toLowerCase())
  );

  const filteredResultOptions = resultOptions.filter((option) =>
    option.name.toLowerCase().includes(resultSearchTerm.toLowerCase())
  );

  const handleWalletToggle = (walletId: string) => {
    setSelectedWallets((prev) =>
      prev.includes(walletId)
        ? prev.filter((id) => id !== walletId)
        : [...prev, walletId]
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
  const removeWalletFilter = (walletId: string) => {
    setSelectedWallets((prev) => prev.filter((id) => id !== walletId));
  };

  const removeTagFilter = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((id) => id !== tagId));
  };

  const removeResultFilter = (resultId: string) => {
    setSelectedResults((prev) => prev.filter((id) => id !== resultId));
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
    setSelectedWallets([]);
    setSelectedTags([]);
    setSelectedResults([]);
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
    selectedWallets.length > 0 ||
    selectedTags.length > 0 ||
    selectedResults.length > 0 ||
    (fromSentValue !== "" && fromSentValue !== "0") ||
    (toSentValue !== "" && toSentValue !== "0") ||
    fromReceivedValue !== "0" ||
    toReceivedValue !== "0" ||
    (selectedDateRange &&
      selectedDateRange.startDate &&
      selectedDateRange.endDate);
  return (
    <div className={`p-0 sm:p-4 md:px-0 md:pt-5 md:pb-6 rounded-lg `}>
      {/* Tabs */}
      {!hideTab && (
        <div className={`border-gray-200 dark:border-gray-700`}>
          <Tabs>
            <Tabs.List className="my-2 lg:my-2 bg-white dark:bg-gray-800">
              {tabs.map((tab) => (
                <Tabs.Trigger
                  key={tab}
                  value={tab}
                  onClick={() => onTabChange?.(tab)}
                  className={`px-3 sm:px-5 md:px-2.5 py-1 sm:py-2 md:py-1.5 rounded-lg sm:rounded-xl md:rounded-xl text-sm sm:text-lg md:text-sm ${
                    activeTab === tab
                      ? "bg-[#B3E277] dark:bg-gray-0 text-gray-900 dark:text-gray-900"
                    : "text-gray-900 dark:text-gray-200"
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
          className={`my-2 px-6 py-4 rounded-lg border border-info-500 text-[#2186D7]
            dark:border-blue-600 dark:text-blue-300`}
        >
          <div className="flex items-center justify-between mx-2">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
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

      <div className="flex flex-row justify-start lg:items-center gap-5 mt-[20px] sm:mt-0">
        {/* Search */}
        <div
          className="flex flex-grow-1 sm:flex-grow-0 flex-row justify-start items-center px-4 py-3 box-border 
          border border-[rgba(225,227,229,1)] dark:border-gray-700 rounded-[12px] shadow-[0px_1px_2px_0px_rgba(20,21,26,0.05)] bg-[rgba(255,255,255,1)] dark:bg-[#0E201E]"
        >
          <div className="flex flex-row justify-start items-center gap-3">
            <SearchIcon 
              width={16}
              height={16}
              strokeColor="currentColor"
              className="text-gray-900 dark:text-gray-150 opacity-70"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`text-sm w-full  border-gray-700 text-gray-900 dark:text-gray-150 placeholder-gray-400 focus:outline-none bg-transparent
            dark:bg-transparent dark:border-[#4D5050]`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-5 mt-4 md:mt-0">
          {/* Wallet Dropdown */}
          <Dropdown
            options={[
              ...walletOptions.map(w => ({ 
                label: w.name, 
                value: w.id,
                logo: w.logo 
              }))
            ]}
            onSelect={(value) => {
              if (value === 'all') {
                setSelectedWallets([]);
              } else {
                setSelectedWallets([value]);
              }
            }}
            searchable={true}
            searchPlaceholder="Search wallet type"
            defaultValue="Type"
            className="min-w-[120px]"
          />

          {/* Tag Dropdown */}
          <Dropdown
            options={[
              { label: 'All', value: 'all' },
              { label: 'Buy', value: 'buy' },
              { label: 'Sell', value: 'sell' },
              { label: 'Swap', value: 'swap' },
              { label: 'Transfer', value: 'transfer' }
            ]}
            onSelect={(value) => {
              if (value === 'all') {
                setSelectedTags([]);
              } else {
                setSelectedTags([value]);
              }
            }}
            defaultValue="Tag"
            className="min-w-[140px]"
          />

          {/* Manual Dropdown */}
          <Dropdown
            options={[
              { label: 'All', value: 'all' }
            ]}
            onSelect={(value) => {
              if (value === 'all') {
                setSelectedManuals([]);
              } else {
                setSelectedManuals([value]);
              }
            }}
            defaultValue="Manual"
            className="min-w-[140px]"
          />

          {/* Result Dropdown */}
          <Dropdown
            options={[
              { label: 'All', value: 'all' }
            ]}
            onSelect={(value) => {
              if (value === 'all') {
                setSelectedResults([]);
              } else {
                setSelectedResults([value]);
              }
            }}
            defaultValue="Result"
            className="min-w-[140px]"
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
          <div className={`max-w-[190px] flex items-center`}>
            <DateRangePickerPopover
              selectedDateRange={selectedDateRange}
              onDateRangeChange={setSelectedDateRange}
              buttonLabel="Date"
              className="py-[13px] shadow-sm rounded-lg"
            />
          </div>

          {/* Custom Result Dropdown */}
          <div className="relative" ref={resultDropdownRef}>
            <button
              onClick={() => setResultDropdownOpen(!resultDropdownOpen)}
              className={`flex text-lg items-center px-4 py-3 space-x-4 rounded-xl border bg-white border-default text-[#0E201E] text-sm
                dark:bg-transparent dark:placeholder-[#CDCFD1] dark:border-[#4D5050] dark:text-gray-100`}
            >
              <span>Result</span>
              <FontAwesomeIcon
                icon={resultDropdownOpen ? faChevronUp : faChevronDown}
                className="w-3 h-3"
              />
            </button>

            {resultDropdownOpen && (
              <div
                className={`absolute top-full right-0 mt-1 w-64 rounded-lg 
                  border shadow-sm z-50 bg-white border-gray-150
                  dark:bg-[#0E201E]`}
              >
                {/* Search Input */}
                <div className="px-3 border-b border-gray-150">
                  <input
                    type="text"
                    placeholder="Type or paste result"
                    value={resultSearchTerm}
                    onChange={(e) => setResultSearchTerm(e.target.value)}
                    className={`w-full px-3 py-2 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none
                      dark:bg-[#0E201E] dark:text-gray-250`}
                  />
                </div>

                {/* Result Options List */}
                <div className="max-h-48 overflow-y-auto">
                  {filteredResultOptions.map((option) => {
                    const isSelected = selectedResults.includes(option.id);
                    return (
                      <div
                        key={option.id}
                        onClick={() => handleResultToggle(option.id)}
                        className={`flex items-center px-3 py-2 cursor-pointer`}
                      >
                        <div
                          className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-3 transition-colors ${
                            isSelected
                              ? "bg-[#90C853] border-[#90C853]"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="w-2.5 h-2.5 text-white"
                            />
                          )}
                        </div>
                        <span
                          className={`text-sm text-gray-900
                            dark:text-gray-250`}
                        >
                          {option.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
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
        <Accordion>
          <AccordionItem title="Wallet">
            {" "}
            <div
              className={`w-full  z-50 bg-white border-gray-300 
                dark:bg-gray-800 dark:border-gray-600`}
            >
              {/* Search Input */}
              <div className="">
                <input
                  type="text"
                  placeholder="Type or paste wallet"
                  value={walletSearchTerm}
                  onChange={(e) => setWalletSearchTerm(e.target.value)}
                  className={`text-base w-full border  border-gray-150 text-gray-900 dark:text-gray-150 placeholder-gray-400 focus:outline-none px-4 py-2 rounded-[12px] focus:border-[#90C853] bg-[rgba(255,255,255,1)] dark:bg-[#0E201E]`}
                />
              </div>

              {/* Wallet Options List */}
              <div className="max-h-48 overflow-y-auto mt-3 flex flex-col gap-4 ">
                {filteredWalletOptions.map((option) => {
                  const isSelected = selectedWallets.includes(option.id);
                  return (
                    <div
                      key={option.id}
                      onClick={() => handleWalletToggle(option.id)}
                      className={`flex items-center px-3 gap-2 cursor-pointer hover:bg-gray-100 
                        dark:hover:bg-gray-700`}
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded flex items-center justify-center  transition-colors ${
                          isSelected
                            ? "bg-[#90C853] border-[#90C853]"
                            : "border-gray-150"
                        }`}
                      >
                        {isSelected && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="w-2.5 h-2.5 text-white"
                          />
                        )}
                      </div>
                      <img
                        src={option.logo}
                        className={`w-6 h-6 rounded-full ${option.color} flex items-center justify-center text-white text-xs font-bold ml-3`}
                      ></img>
                      <span
                        className={`text-base text-gray-900 dark:text-gray-150`}
                      >
                        {option.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </AccordionItem>
          <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
          <AccordionItem title="Tag">
            {" "}
            <div
              className={`w-full z-50 bg-white border-gray-300 
                dark:bg-[#0E201E] dark:border-gray-600
                `}
            >
              {/* Search Input */}

              {/* Tag Options List */}
              <div className="max-h-48 overflow-y-auto  mt-3 flex flex-col gap-4">
                {filteredTagOptions.map((option) => {
                  const isSelected = selectedTags.includes(option.id);
                  return (
                    <div
                      key={option.id}
                      onClick={() => handleTagToggle(option.id)}
                      className={`flex items-center  cursor-pointer hover:bg-gray-100 
                        dark:hover:bg-gray-700
                      `}
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded flex mr-3 items-center justify-center  transition-colors ${
                          isSelected
                            ? "bg-[#90C853] border-[#90C853]"
                            : "border-gray-150"
                        }`}
                      >
                        {isSelected && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="w-2.5 h-2.5 text-white"
                          />
                        )}
                      </div>
                      <span
                        className={`text-base text-gray-900 dark:text-gray-150`}
                      >
                        {option.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </AccordionItem>
          <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
          <AccordionItem title="Amount Sent">
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
                      value={fromSentValue}
                      onChange={(e) => setFromSentValue(e.target.value)}
                      className={`text-base w-full border  border-gray-150 text-gray-900 dark:text-gray-150 placeholder-gray-400 focus:outline-none px-4 py-2 rounded-[12px] focus:border-[#90C853] bg-[rgba(255,255,255,1)] dark:bg-[#0E201E]`}
                    />
                    <button
                      onClick={() =>
                        setShowFromCurrencyDropdown(!showFromCurrencyDropdown)
                      }
                      className={`absolute right-0 top-0 h-full px-2    rounded-r-lg border-r border-t border-b border-gray-150 rounded-l-none`}
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-caption font-medium">
                          {fromSentCurrency}
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
                                setFromSentCurrency(currency);
                                setShowFromCurrencyDropdown(false);
                              }}
                              className={`w-full px-3 py-1 text-left text-xs ${
                                fromSentCurrency === currency
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
                      value={toSentValue}
                      onChange={(e) => setToSentValue(e.target.value)}
                      className={`text-base w-full border  border-gray-150 text-gray-900 dark:text-gray-150 placeholder-gray-400 focus:outline-none px-4 py-2 rounded-[12px] focus:border-[#90C853] bg-[rgba(255,255,255,1)] dark:bg-[#0E201E]`}
                    />
                    <button
                      onClick={() =>
                        setShowToCurrencyDropdown(!showToCurrencyDropdown)
                      }
                      className={`absolute right-0 top-0 h-full px-2    rounded-r-lg border-r border-t border-b border-gray-150 rounded-l-none`}
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-caption font-medium">
                          {toSentCurrency}
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
                                setToSentCurrency(currency);
                                setShowToCurrencyDropdown(false);
                              }}
                              className={`w-full px-3 py-1 text-left text-xs ${
                                toSentCurrency === currency
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
          <AccordionItem title="Amount Received">
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
                      value={fromSentValue}
                      onChange={(e) => setFromSentValue(e.target.value)}
                      className={`text-base w-full border  border-gray-150 text-gray-900 dark:text-gray-150 placeholder-gray-400 focus:outline-none px-4 py-2 rounded-[12px] focus:border-[#90C853] bg-[rgba(255,255,255,1)] dark:bg-[#0E201E]`}
                    />
                    <button
                      onClick={() =>
                        setShowFromCurrencyDropdown(!showFromCurrencyDropdown)
                      }
                      className={`absolute right-0 top-0 h-full px-2    rounded-r-lg border-r border-t border-b border-gray-150 rounded-l-none`}
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-caption font-medium">
                          {fromSentCurrency}
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
                                setFromSentCurrency(currency);
                                setShowFromCurrencyDropdown(false);
                              }}
                              className={`w-full px-3 py-1 text-left text-xs ${
                                fromSentCurrency === currency
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
                      value={toSentValue}
                      onChange={(e) => setToSentValue(e.target.value)}
                      className={`text-base w-full border  border-gray-150 text-gray-900 dark:text-gray-150 placeholder-gray-400 focus:outline-none px-4 py-2 rounded-[12px] focus:border-[#90C853] bg-[rgba(255,255,255,1)] dark:bg-[#0E201E]`}
                    />
                    <button
                      onClick={() =>
                        setShowToCurrencyDropdown(!showToCurrencyDropdown)
                      }
                      className={`absolute right-0 top-0 h-full px-2    rounded-r-lg border-r border-t border-b border-gray-150 rounded-l-none`}
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-caption font-medium">
                          {toSentCurrency}
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
                                setToSentCurrency(currency);
                                setShowToCurrencyDropdown(false);
                              }}
                              className={`w-full px-3 py-1 text-left text-xs ${
                                toSentCurrency === currency
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
            />
          </AccordionItem>
        </Accordion>
      </MobileDrawer>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-4 md:pt-0">
          <div className="flex flex-wrap gap-2">
            {/* Wallet Filters */}
            {selectedWallets.map((walletId) => {
              const wallet = walletOptions.find((w) => w.id === walletId);
              return wallet ? (
                <div
                  key={`wallet-${walletId}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                    bg-gray-100 text-gray-800 border border-default
                    dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
                >
                  <span>{wallet.name}</span>
                  <button
                    onClick={() => removeWalletFilter(walletId)}
                    className="transition-colors"
                    aria-label={`Remove ${wallet.name} filter`}
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
              const tag = tagOptions.find(
                (a) => a.id === tagId
              );
              return tag ? (
                <div
                  key={`tag-${tagId}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium space-x-1
                    bg-gray-100 text-gray-800 border border-default
                    dark:bg-[#2F3232] dark:border-[#4D5050] dark:text-[#B6B8BA]`}
                >
                  <span>{tag.name}</span>
                  <button
                    onClick={() => removeTagFilter(tagId)}
                    className="transition-colors"
                    aria-label={`Remove ${tag.name} filter`}
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
