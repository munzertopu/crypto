import React, { useState } from "react";
import Dropdown from "../../../components/UI/Dropdown";
import DatePicker from "../../../components/DatePicker";

const TaxWizardTab: React.FC = () => {
  // Sales Wizard state
  const [includeOnlyMode, setIncludeOnlyMode] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("Cash Target");
  const [selectedAmount, setSelectedAmount] = useState("$5,000");
  const [selectedOptimization, setSelectedOptimization] = useState("Minimize Tax");
  const [selectedTimeline, setSelectedTimeline] = useState("23/09/2025");
  const [maxTrades, setMaxTrades] = useState("3");
  const [dateValue, setDateValue] = useState({
    startDate: new Date("2025-09-23"),
    endDate: null,
  });

  // Constrains state
  const [isConstrainsOpen, setIsConstrainsOpen] = useState(false);

  // Mode toggle component
  const ModeToggle = () => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIncludeOnlyMode(false)}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
          !includeOnlyMode
            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
        }`}
      >
        Include only Mode
        <svg className="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        onClick={() => setIncludeOnlyMode(true)}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
          includeOnlyMode
            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
        }`}
      >
        Exclude Mode
        <svg className="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );

  // Option button component
  const OptionButton: React.FC<{
    label: string;
    isSelected: boolean;
    onClick: () => void;
  }> = ({ label, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        isSelected
          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-700"
          : "bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
      }`}
    >
      {label}
    </button>
  );

  // Timeline quick select buttons
  const timelineOptions = ["Today", "1 Week", "1 Month", "3 Months"];

  return (
    <div className="space-y-6">
      {/* Sales Wizard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-left text-xl font-semibold text-gray-900 dark:text-white">
            Sales Wizard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Turn portfolio into cash, tax-optimized.
          </p>
        </div>
        <ModeToggle />
      </div>

      {/* Main Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
        <div className="text-left mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            How much cash do you need?
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We'll help you find the most tax-efficient way to get it.
          </p>
        </div>
      </div>

      {/* Find Best Plan Button */}
      <div className="flex justify-end">
        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm">
          Find Best Plan
        </button>
      </div>
    </div>
  );
};

export default TaxWizardTab;