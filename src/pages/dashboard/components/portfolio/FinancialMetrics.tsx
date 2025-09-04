import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faCoins,
  faWallet,
  faChevronDown,
  faBolt,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

interface MetricItemProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: any; // FontAwesome icon
  svgIcon?: React.ReactNode; // SVG icon
  showDropdown?: boolean;
  onDropdownToggle?: () => void;
  isDropdownOpen?: boolean;
  isDarkMode: boolean;
}

const MetricItem: React.FC<MetricItemProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  svgIcon,
  showDropdown = false,
  onDropdownToggle,
  isDropdownOpen = false,
  isDarkMode = false,
}) => (
  <div className="flex flex-col space-y-2">
    <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
      <div className="flex items-center justify-center">
        {svgIcon ? (
          <div
            className={`"text-[#0E201E] dark:text-[#B6B8BA] w-5 h-5 flex items-center justify-center`}
          >
            {svgIcon}
          </div>
        ) : (
          <FontAwesomeIcon
            icon={icon}
            className={`${
              isDarkMode ? "text-[#B6B8BA]" : "text-[#0E201E]"
            } text-md`}
          />
        )}
      </div>
      <div className="flex items-center space-x-1">
        <span
          className={`text-base sm:text-xl lg:text-2xl font-medium md:font-semibold "text-[#0E201E] dark:text-[#B6B8BA]`}
        >
          {title}
        </span>
        {showDropdown && (
          <button
            onClick={onDropdownToggle}
            className="flex items-center justify-center w-4 h-4 rounded transition-colors"
            aria-label="Toggle unrealized gain options"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`"text-[#0E201E] dark:text-[#B6B8BA] text-xs transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-xl sm:text-[32px] font-semibold text-[#0E201E] dark:text-[#B6B8BA]">
        {value}
      </span>
      <span
        className={`text-[13px] sm:text-sm font-medium ${
          isPositive ? "text-[#5F9339]" : "text-[#D8382C]"
        }`}
      >
        {change}
      </span>
    </div>
  </div>
);

interface FinancialMetricsProps {
  totalValue: string;
  totalValueChange: string;
  costBasic: string;
  costBasicChange: string;
  unrealizedGain: string;
  unrealizedGainChange: string;
  isDarkMode?: boolean;
}

const FinancialMetrics: React.FC<FinancialMetricsProps> = ({
  totalValue = "$1,500,876",
  totalValueChange = "+5.73%",
  costBasic = "$550,132",
  costBasicChange = "-2.38%",
  unrealizedGain = "$1,000,744",
  unrealizedGainChange = "+1.29%",
  isDarkMode = false,
}) => {
  // SVG Icons
  const totalValueSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-9"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );

  const costBasicSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
      />
    </svg>
  );

  const unrealizedGainSvg = (
    <svg
      className="w-8 h-8 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"
      />
    </svg>
  );
  const [isUnrealizedGainDropdownOpen, setIsUnrealizedGainDropdownOpen] =
    useState(false);

  const handleUnrealizedGainDropdownToggle = () => {
    setIsUnrealizedGainDropdownOpen(!isUnrealizedGainDropdownOpen);
  };

  return (
    <div className="px-2 sm:px-4 lg:px-8 mb-4 sm:mb-6">
      <div className="bg-transparent">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Left Section - Total Value */}
          <div className="lg:flex-1">
            <MetricItem
              title="Total Value"
              value={totalValue}
              change={totalValueChange}
              isPositive={totalValueChange.startsWith("+")}
              svgIcon={totalValueSvg}
              isDarkMode={isDarkMode}
            />
          </div>
          {/* Horizontal Separator */}

          <div
            className={`w-full h-px lg:hidden ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>

          {/* Right Section - Cost Basic and Unrealized Gain */}
          <div className="lg:ml-auto flex  gap-4 sm:gap-6 lg:gap-8">
            <MetricItem
              title="Cost Basic"
              value={costBasic}
              change={costBasicChange}
              isPositive={costBasicChange.startsWith("+")}
              svgIcon={costBasicSvg}
              isDarkMode={isDarkMode}
            />
            {/* Vertical Separator */}
            <div
              className={`hidden lg:block w-px bg-[#E1E3E5] dark:bg-[#2F3232]`}
            ></div>
            <div className="relative">
              <MetricItem
                title="Unrealized Gain"
                value={unrealizedGain}
                change={unrealizedGainChange}
                isPositive={unrealizedGainChange.startsWith("+")}
                svgIcon={unrealizedGainSvg}
                showDropdown={true}
                onDropdownToggle={handleUnrealizedGainDropdownToggle}
                isDropdownOpen={isUnrealizedGainDropdownOpen}
                isDarkMode={isDarkMode}
              />

              {/* Unrealized Gain Dropdown */}
              {isUnrealizedGainDropdownOpen && (
                <div className="absolute top-8 right-0 mt-1 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200 flex flex-col justify-center">
                  {/* Short Term Gain */}
                  <div className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                        />
                      </svg>
                      <span className="text-md text-gray-900 mx-2">
                        Short Term Gain
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="text-lg font-bold text-gray-900">
                        $200,744
                      </span>
                    </div>
                  </div>

                  {/* Long Term Gain */}
                  <div className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                        />
                      </svg>
                      <span className="text-sm text-gray-900 mx-2">
                        Long Term Gain
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="text-lg font-bold text-gray-900">
                        $800,000
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialMetrics;
