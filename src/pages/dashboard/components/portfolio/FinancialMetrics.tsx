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
import useScreenSize from "../../../../hooks/useScreenSize";

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
  isRowDirection?: boolean;
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
  isRowDirection = false,
}) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-1.5">
      <div className="flex items-center justify-center">
        {svgIcon ? (
          <div
            className={`"text-gray-900 dark:text-[#B6B8BA] w-5 h-5 md:h-6 md:w-6 flex items-center justify-center`}
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
      <div className="flex items-center ">
        <span
          className={`text-base md:text-lg font-medium md:font-semibold text-gray-900 dark:text-[#B6B8BA] opacity-80`}
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

    <div
      className={`flex ${
        isRowDirection
          ? "flex-row gap-2 justify-start items-center"
          : "flex-col gap-1 sm:flex-row"
      }  items-start  sm:items-end sm:gap-2  `}
    >
      <span className="text-xl md:text-[32px] font-semibold text-gray-900 dark:text-[#B6B8BA]">
        {value}
      </span>
      <span
        className={`text-caption sm:text-sm font-semibold ${
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
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 md:h-6 md:w-6"
      fill="none"
      stroke="none"
    >
      <rect
        id="Property 2=dollar-circle"
        width="20.000000"
        height="20.000000"
        x="0.000000"
        y="0.000000"
      />
      <g id="vuesax/linear/dollar-circle">
        <g id="dollar-circle">
          <path
            id="Vector"
            d="M7.22656 11.9417C7.22656 13.0167 8.05156 13.8834 9.07656 13.8834L11.1682 13.8834C12.0599 13.8834 12.7849 13.125 12.7849 12.1917C12.7849 11.175 12.3432 10.8167 11.6849 10.5834L8.32656 9.4167C7.66823 9.18337 7.22656 8.82503 7.22656 7.80837C7.22656 6.87503 7.95156 6.1167 8.84323 6.1167L10.9349 6.1167C11.9599 6.1167 12.7849 6.98337 12.7849 8.05837"
            fill-rule="nonzero"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.20000005"
          />
          <path
            id="Vector"
            d="M0 0L10 0"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.20000005"
            transform="matrix(0,1,-1,0,10,5)"
          />
          <path
            id="Vector"
            d="M10.0003 18.3332C5.39795 18.3332 1.66699 14.6022 1.66699 9.99984C1.66699 5.39746 5.39795 1.6665 10.0003 1.6665C14.6027 1.6665 18.3337 5.39746 18.3337 9.99984C18.3337 14.6022 14.6027 18.3332 10.0003 18.3332Z"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.20000005"
          />
          <path id="Vector" opacity="0" />
        </g>
      </g>
    </svg>
  );

  const costBasicSvg = (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 md:h-6 md:w-6"
      fill="none"
      stroke="none"
    >
      <rect id="Property 2=coin" x="0.000000" y="0.000000" />
      <g id="vuesax/linear/coin">
        <path
          id="Vector"
          d="M18.5 16.3499C18.5 19.4699 15.59 21.9999 12 21.9999C8.41 21.9999 5.5 19.4699 5.5 16.3499L5.5 12.6499C5.5 15.7699 8.41 17.9999 12 17.9999C15.59 17.9999 18.5 15.7699 18.5 12.6499L18.5 16.3499Z"
          fill-rule="nonzero"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <path
          id="Vector"
          d="M17.81 10.12C16.74 11.88 14.54 13 12 13C9.46 13 7.26 11.88 6.19 10.12C5.75 9.4 5.5 8.56 5.5 7.65C5.5 6.09 6.22999 4.68 7.39999 3.66C8.57999 2.63 10.2 2 12 2C13.8 2 15.42 2.63 16.6 3.65C17.77 4.68 18.5 6.09 18.5 7.65C18.5 8.56 18.25 9.4 17.81 10.12Z"
          fill-rule="nonzero"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <path
          id="Vector"
          d="M18.5 12.65C18.5 15.77 15.59 18 12 18C8.41 18 5.5 15.77 5.5 12.65L5.5 7.65C5.5 4.53 8.41 2 12 2C13.8 2 15.42 2.63 16.6 3.65C17.77 4.68 18.5 6.09 18.5 7.65L18.5 12.65Z"
          fill-rule="nonzero"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <path id="Vector" opacity="0" />
      </g>
    </svg>
  );

  const unrealizedGainSvg = (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 md:h-6 md:w-6"
      fill="none"
      stroke="none"
    >
      <rect id="Property 2=wallet-add" x="0.000000" y="0.000000" />
      <g id="vuesax/linear/wallet-add">
        <path
          id="Vector"
          d="M17.0014 6.99998L7.00141 6.99998C6.72141 6.99998 6.45141 7.01998 6.19141 7.05998C6.33141 6.77998 6.53141 6.52001 6.77141 6.28001L10.0214 3.02C11.3914 1.66 13.6114 1.66 14.9814 3.02L16.7314 4.78996C17.3714 5.41996 17.7114 6.21997 17.7514 7.04997C17.5114 7.00997 17.2614 6.99998 17.0014 6.99998Z"
          fill-rule="nonzero"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <g id="Group">
          <path
            id="Vector"
            d="M8.42 21.06C7.73 22.22 6.46 23 5 23C3.54 23 2.27 22.22 1.58 21.06C1.21 20.46 1 19.75 1 19C1 16.79 2.79 15 5 15C7.21 15 9 16.79 9 19C9 19.75 8.79 20.46 8.42 21.06Z"
            fill-rule="nonzero"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <g id="Group">
            <path
              id="Vector"
              d="M6.49172 18.9795L3.51172 18.9795"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
            <path
              id="Vector"
              d="M0 0L2.98999 0"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              transform="matrix(0,1,-1,0,5,17.5195)"
            />
          </g>
        </g>
        <path id="Vector" opacity="0" />
        <path
          id="Vector"
          d="M22 17C22 20 20 22 17 22L7.63 22C7.94 21.74 8.21 21.42 8.42 21.06C8.79 20.46 9 19.75 9 19C9 16.79 7.21 15 5 15C3.8 15 2.73 15.53 2 16.36L2 12C2 9.28 3.64 7.38 6.19 7.06C6.45 7.02 6.72 7 7 7L17 7C17.26 7 17.51 7.00999 17.75 7.04999C20.33 7.34999 22 9.26 22 12L22 17Z"
          fill-rule="nonzero"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <path
          id="Vector"
          d="M22 12.5L19 12.5C17.9 12.5 17 13.4 17 14.5C17 15.6 17.9 16.5 19 16.5L22 16.5"
          fill-rule="nonzero"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </g>
    </svg>
  );
  const [isUnrealizedGainDropdownOpen, setIsUnrealizedGainDropdownOpen] =
    useState(false);

  const screenSize = useScreenSize();

  const handleUnrealizedGainDropdownToggle = () => {
    setIsUnrealizedGainDropdownOpen(!isUnrealizedGainDropdownOpen);
  };

  return (
    <div className="md:px-2 mb-4 sm:mb-6 pt-4 sm:pt-0">
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
              isRowDirection
            />
          </div>
          {/* Horizontal Separator */}

          <div
            className={`w-full h-px lg:hidden 
            dark:bg-gray-700  bg-gray-150
            `}
          ></div>

          {/* Right Section - Cost Basic and Unrealized Gain */}
          <div className="lg:ml-auto flex justify-between sm:justify-start  gap-4 sm:gap-6 lg:gap-8">
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
                showDropdown={screenSize.width >= 1024 ? true : false}
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
