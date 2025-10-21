import React, { useState, useRef, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import Dropdown from "../../../components/UI/Dropdown";
import DateRangePicker from "../../../components/DateRangePicker";
import OptimizationModal from "./components/OptimizationModal";
import OptimizationResults from "./components/OptimizationResults";
import RefreshIcon from "../../../components/Icons/RefreshIcon";
import Tooltip from "../../../components/UI/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const TaxWizardTab: React.FC = () => {
  // Sales Wizard state
  const [includeOnlyMode, setIncludeOnlyMode] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("Cash Target");
  const [selectedAmount, setSelectedAmount] = useState("$5,000");
  const [selectedOptimization, setSelectedOptimization] =
    useState("Minimize Tax");
  const [selectedTimeline, setSelectedTimeline] = useState("23/09/2025");
  const [maxTrades, setMaxTrades] = useState("3");

  // Custom amount state
  const [customAmount, setCustomAmount] = useState("");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Exclusion state - radio button behavior (only one selected)
  const [selectedExclusion, setSelectedExclusion] = useState("Exclude ETH");

  // Wallets & Exchanges state - radio button behavior (only one selected)
  const [selectedWallet, setSelectedWallet] = useState("Kraken");

  // Assets state - radio button behavior (only one selected)
  const [selectedAsset, setSelectedAsset] = useState("Ethereum");

  // Refs for outside click detection
  const customInputRef = useRef<HTMLDivElement>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date("2025-09-23"),
    endDate: new Date("2025-12-31"),
  });

  // Handle outside click to close custom input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        customInputRef.current &&
        !customInputRef.current.contains(event.target as Node)
      ) {
        setShowCustomInput(false);
        setShowCurrencyDropdown(false);
      }
    };

    if (showCustomInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCustomInput]);

  // Handle Enter key to close custom input
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setShowCustomInput(false);
      setShowCurrencyDropdown(false);
    }
  };

  // Constrains state
  const [isConstrainsOpen, setIsConstrainsOpen] = useState(false);

  // Modal state
  const [isOptimizationModalOpen, setIsOptimizationModalOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mode toggle component
  const ModeToggle = () => (
    <div className="md:bg-gray-100 dark:bg-gray-800 rounded-2xl md:px-5 md:py-3 flex items-center md:justify-between gap-3  md:gap-4">
      {/* Left side - Include only Mode */}
      <div
        className={`flex items-center gap-2 ${
          includeOnlyMode
            ? "text-gray-900 dark:text-gray-100"
            : "text-gray-500 dark:text-gray-300"
        }`}
      >
        <span className={`text-sm font-medium`}>Include only Mode</span>
        <Tooltip
          title={
            <>
              <strong>Include only Mode</strong> - This mode allows you to
              select specific assets, wallets, or exchanges to include in your
              tax optimization strategy. Only the selected items will be
              considered for tax calculations.
            </>
          }
          placement="bottom"
        >
          <button
            type="button"
            className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Include only mode help"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Tooltip>
      </div>

      {/* Toggle Switch */}
      <div className="relative">
        <button
          onClick={() => setIncludeOnlyMode(!includeOnlyMode)}
          className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
            includeOnlyMode ? "bg-green-700" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
              includeOnlyMode ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Right side - Exclude Mode */}
      <div
        className={`flex items-center gap-2  ${
          includeOnlyMode
            ? "text-gray-500 dark:text-gray-300"
            : "text-gray-900 dark:text-gray-100"
        }`}
      >
        <span className={`text-sm font-medium`}>Exclude Mode</span>
        <Tooltip
          title={
            <>
              <strong>Exclude Mode</strong> - This mode allows you to exclude
              specific assets, wallets, or exchanges from your tax optimization
              strategy. All items except the selected ones will be considered
              for tax calculations.
            </>
          }
          placement="bottom"
        >
          <button
            type="button"
            className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Exclude mode help"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Tooltip>
      </div>
    </div>
  );

  // Option button component
  const OptionButton: React.FC<{
    label: string;
    isSelected: boolean;
    onClick: () => void;
    className?: string;
  }> = ({ label, isSelected, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`px-2.5 py-2 w-full rounded-lg text-sm font-medium transition-colors border ${
        isSelected
          ? "bg-green-200 text-gray-900 dark:bg-green-500 dark:text-gray-900 border-green-700 dark:border-green-600"
          : "bg-white text-gray-600 dark:bg-gray-900 dark:text-gray-300 border-transparent"
      } ${className}`}
    >
      {label}
    </button>
  );

  // Timeline quick select buttons
  const timelineOptions = ["Today", "1 Week", "1 Month", "3 Months"];

  const handleFindBestPlan = () => {
    setIsOptimizationModalOpen(true);
  };

  const handleModalClose = () => {
    setIsOptimizationModalOpen(false);
    setShowResults(true);
  };

  // Show results if optimization is complete
  if (showResults) {
    return <OptimizationResults />;
  }

  return (
    <div className="space-y-5 pb-8">
      {/* Sales Wizard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
        <div className="text-left ">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pb-2 md:pb-0">
            Sales Wizard
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 md:mt-1">
            Turn portfolio into cash, tax-optimized.
          </p>
        </div>
        <ModeToggle />
      </div>

      {/* Main Card */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 md:p-8">
        <div className="text-left mb-5 md:mb-6">
          <h3 className=" text-basemd:text-h6 font-semibold text-gray-900 dark:text-gray-100 mb-1 md:mb-2">
            How much cash do you need?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            We'll help you find the most tax-efficient way to get it.
          </p>
        </div>

        {/* Six Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 text-left">
          {/* Left Section - Columns 1-2 (colspan 2) */}
          <div className="lg:col-span-2 space-y-8">
            {/* What is your goal? */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 md:mb-3 mb-2">
                What is your goal?
              </label>
              <div className="flex bg-white dark:bg-gray-900 p-1 rounded-lg justify-between">
                <OptionButton
                  label="Cash Target"
                  isSelected={selectedGoal === "Cash Target"}
                  onClick={() => setSelectedGoal("Cash Target")}
                />
                <OptionButton
                  label="Crypto Amount"
                  isSelected={selectedGoal === "Crypto Amount"}
                  onClick={() => setSelectedGoal("Crypto Amount")}
                />
              </div>
            </div>

            {/* What is your preference? (Optimization) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">
                What is your preference?
              </label>
              <div className="flex bg-white dark:bg-gray-900 p-1 rounded-lg justify-between">
                <OptionButton
                  label="Minimize Tax"
                  isSelected={selectedOptimization === "Minimize Tax"}
                  onClick={() => setSelectedOptimization("Minimize Tax")}
                />
                <OptionButton
                  label="Maximize Gain"
                  isSelected={selectedOptimization === "Maximize Gain"}
                  onClick={() => setSelectedOptimization("Maximize Gain")}
                />
              </div>
            </div>

            {/* Max Trades */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-100">
                  Max Trades
                </label>
                <div className="flex items-center gap-1">
                  <button className="text-gray-400 dark:text-gray-300">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    FIFO Method
                  </span>
                </div>
              </div>
              <Dropdown
                options={["1", "2", "3", "4", "5", "10", "15", "20"]}
                onSelect={setMaxTrades}
                defaultValue={maxTrades}
              />
            </div>
          </div>

          {/* Column 3 - Vertical Separator */}
          <div className="hidden lg:flex lg:col-span-1 justify-center pt-2 pb-6">
            <div className="w-px h-full bg-default dark:bg-gray-600"></div>
          </div>

          {/* Right Section - Columns 4-6 (colspan 3) */}
          <div className="lg:col-span-3 space-y-8">
            {/* What is your preference? (Amount) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">
                What is your preference?
              </label>
              <div className="grid grid-cols-5 gap-3">
                {["$1,000", "$5,000", "$10,000", "Custom"].map((amount) => {
                  const getCurrencySymbol = (currency: string) => {
                    switch (currency) {
                      case "USD":
                        return "$";
                      case "EUR":
                        return "€";
                      case "GBP":
                        return "£";
                      default:
                        return currency;
                    }
                  };

                  const displayLabel =
                    amount === "Custom" && customAmount
                      ? `Custom: ${getCurrencySymbol(
                          selectedCurrency
                        )}${customAmount}`
                      : amount;

                  return (
                    <OptionButton
                      key={amount}
                      label={displayLabel}
                      isSelected={selectedAmount === amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        if (amount === "Custom") {
                          setShowCustomInput(true);
                        } else {
                          setShowCustomInput(false);
                        }
                      }}
                    />
                  );
                })}
                {/* Custom Amount Input */}
                {selectedAmount === "Custom" && showCustomInput && (
                  <div className="relative" ref={customInputRef}>
                    <Input
                      type="number"
                      placeholder="0"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className={`w-full rounded-lg text-sm px-4 py-2 font-medium
                        border-default bg-white text-gray-900 dark:text-gray-100 focus:outline-none dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0`}
                      autoFocus
                    />
                    <button
                      onClick={() =>
                        setShowCurrencyDropdown(!showCurrencyDropdown)
                      }
                      className={`absolute right-0 top-0 h-full px-2 rounded-l-none rounded-r-lg border-r border-t border-b focus:outline-none
                        border-default text-gray-600 bg-white dark:bg-transparent dark:border-[#4D5050]`}
                    >
                      <div className="flex items-center gap-1">
                        {selectedCurrency === "USD"}
                        {selectedCurrency === "EUR"}
                        {selectedCurrency === "GBP"}
                        <span className="text-xs font-medium">
                          {selectedCurrency}
                        </span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="w-2 h-2"
                        />
                      </div>
                    </button>

                    {/* Currency Dropdown */}
                    {showCurrencyDropdown && (
                      <div
                        className={`absolute top-full right-0 mt-1 rounded-lg border shadow-lg z-20
                          border-default dark:border-gray-700 bg-white dark:bg-[#0E201E]`}
                      >
                        <div className="py-1 px-2">
                          {[
                            { code: "USD", symbol: "$" },
                            { code: "EUR", symbol: "€" },
                            { code: "GBP", symbol: "£" },
                          ].map((currency) => (
                            <button
                              key={currency.code}
                              onClick={() => {
                                setSelectedCurrency(currency.code);
                                setShowCurrencyDropdown(false);
                              }}
                              className={`w-full px-3 py-1 text-left text-xs rounded-md flex items-center gap-2 ${
                                selectedCurrency === currency.code
                                  ? "bg-gray-100 dark:bg-[#0E201E] dark:text-gray-500"
                                  : "dark:bg-[#0E201E] dark:text-[#A1A3A5]"
                              }`}
                            >
                              <span>{currency.code}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* What is your timeline? */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">
                What is your timeline?
              </label>
              <div className="space-y-3">
                <div className="w-max">
                  <DateRangePicker
                    selectedDateRange={dateRange}
                    onDateRangeChange={setDateRange}
                    className="dark:!border-gray-700 md:py-3 !w-full md:w-auto"
                  />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {timelineOptions.map((option) => (
                    <OptionButton
                      key={option}
                      label={option}
                      isSelected={selectedTimeline === option}
                      onClick={() => setSelectedTimeline(option)}
                      className="!text-[13px] md:py-1.5"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Constrains Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
        <button
          onClick={() => setIsConstrainsOpen(!isConstrainsOpen)}
          className="w-full p-8 flex items-center justify-between text-left"
        >
          <span className="text-h6 font-medium text-gray-900 dark:text-white">
            Constrains
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isConstrainsOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isConstrainsOpen && (
          <div className="px-8 pb-8 space-y-6">
            {/* Quick Exclusions */}
            <div className="text-left pt-5">
              <div className="flex gap-3 w-max">
                <OptionButton
                  label="Exclude BTC"
                  isSelected={selectedExclusion === "Exclude BTC"}
                  onClick={() => setSelectedExclusion("Exclude BTC")}
                  className="px-5 py-3 w-max"
                />
                <OptionButton
                  label="Exclude ETH"
                  isSelected={selectedExclusion === "Exclude ETH"}
                  onClick={() => setSelectedExclusion("Exclude ETH")}
                  className="px-5 py-3 w-max"
                />
                <OptionButton
                  label="Cold Storage"
                  isSelected={selectedExclusion === "Cold Storage"}
                  onClick={() => setSelectedExclusion("Cold Storage")}
                  className="px-5 py-3 w-max"
                />
              </div>
            </div>

            {/* Wallets & Exchanges */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Wallets & Exchanges
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    name: "Coinbase Pro",
                    amount: "$24,350",
                    status: "Synced 30 min ago",
                  },
                  {
                    name: "Kraken",
                    amount: "$12,500",
                    status: "Synced 2 h ago",
                  },
                  {
                    name: "MetaMask",
                    amount: "$8,930",
                    status: "Synced 8 h ago",
                  },
                  {
                    name: "Solana",
                    amount: "$5,900",
                    status: "Synced 1 d ago",
                  },
                ].map((wallet) => {
                  const isSelected = selectedWallet === wallet.name;
                  return (
                    <div
                      key={wallet.name}
                      onClick={() => setSelectedWallet(wallet.name)}
                      className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-default dark:border-gray-700 cursor-pointer hover:border-green-500 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {wallet.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {wallet.amount}
                            </p>
                            <div className="w-px h-4 bg-default dark:bg-gray-300"></div>
                            <p className="text-xs text-gray-700 dark:text-gray-300">
                              {wallet.status}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 border-green-500 ${
                              isSelected
                                ? "bg-transparent border-green-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-full h-full rounded-full bg-green-500 scale-75"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assets */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Assets
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Bitcoin", amount: "+$1,250", status: "Available" },
                  { name: "Ethereum", amount: "+$5,320", status: "Excluded" },
                  { name: "Solana", amount: "+$2,100", status: "Available" },
                  { name: "Polygon", amount: "+$850", status: "Available" },
                ].map((asset) => {
                  const isSelected = selectedAsset === asset.name;
                  return (
                    <div
                      key={asset.name}
                      onClick={() => setSelectedAsset(asset.name)}
                      className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-green-500 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-base">
                            {asset.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {asset.amount}
                            </p>
                            <div className="w-px h-4 bg-default dark:text-gray-300"></div>
                            <p className="text-xs text-gray-700 dark:text-gray-300">
                              {asset.status}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 border-green-500 ${
                              isSelected
                                ? "bg-transparent border-green-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-full h-full rounded-full bg-green-500 scale-75"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-5 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-900 dark:text-gray-400">
                <span className="dark:text-gray-100 font-bold">
                  Last updated:
                </span>{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  1-4h ago
                </span>
              </span>
              <button className="flex bg-white items-center gap-2 px-5 py-3 text-base font-medium text-gray-700 rounded-lg dark:text-gray-500 dark:bg-gray-900 dark:border-gray-700">
                <RefreshIcon width={16} height={16} />
                <span className="dark:text-gray-100">Refresh All</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Find Best Plan Button */}
      <div className="flex justify-end">
        <button
          onClick={handleFindBestPlan}
          className="bg-green-500 hover:bg-green-700 text-gray-900 px-5 py-3 rounded-lg font-medium"
        >
          Find Best Plan
        </button>
      </div>

      {/* Optimization Modal */}
      <OptimizationModal
        isOpen={isOptimizationModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default TaxWizardTab;
