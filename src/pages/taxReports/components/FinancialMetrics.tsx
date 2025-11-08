import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DollarCircleIcon from "../../../components/Icons/DollarCircleIcon";
import WalletIcon from "../../../components/Icons/WalletIcon";

interface MetricItemProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: any; // FontAwesome icon
  svgIcon?: React.ReactNode; // SVG icon
  isRowDirection?: boolean;
  isLarge?: boolean;
}

const MetricItem: React.FC<MetricItemProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  svgIcon,
  isRowDirection = false,
  isLarge = false
}) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-1.5">
      <div className="flex items-center justify-center">
        {svgIcon ? (
          <div
            className={`"w-5 h-5 md:h-6 md:w-6 flex items-center justify-center text-gray-900 
              dark:text-gray-250`}
          >
            {svgIcon}
          </div>
        ) : (
          <FontAwesomeIcon
            icon={icon}
            className={`text-[#0E201E] text-base 
              dark:text-[#B6B8BA]`}
          />
        )}
      </div>
      <div className="flex items-center md:gap-3">
        <span
          className={`text-base ${isLarge ? "md:text-[18px]" : "md:text-16[px]"} font-medium md:font-semibold text-gray-900 opacity-80
           dark:text-gray-250`}
        >
          {title}
        </span>
      </div>
    </div>

    <div
      className={`flex ${
        isRowDirection
          ? "flex-row gap-2 justify-start items-center"
          : "flex-col gap-1 sm:flex-row"
      }  items-start sm:items-end sm:gap-2  `}
    >
      <span className={`text-xl ${isLarge ? "md:text-[32px]" : "md:text-24[px]"} font-semibold text-gray-900
       dark:text-gray-250`}>
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
  unrealizedGain: string;
  unrealizedGainChange: string;
  allCapitalGainMode: boolean;
  onAllCapitalGainModeChange: (value: boolean) => void;
}

const FinancialMetrics: React.FC<FinancialMetricsProps> = ({
  totalValue = "$1,500,876",
  totalValueChange = "+5.73%",
  unrealizedGain = "$1,000,744",
  unrealizedGainChange = "+1.29%",
  allCapitalGainMode,
  onAllCapitalGainModeChange,
}) => {
  // SVG Icons
  const totalValueSvg = (
    <DollarCircleIcon
      width={20}
      height={20}
      className="w-5 h-5 md:h-6 md:w-6 text-gray-900 dark:text-gray-250"
    />
  );

  const unrealizedGainSvg = (
    <WalletIcon className="w-5 h-5 md:h-6 md:w-6" />
  );

  return (
    <div className="md:px-2 mb-4 sm:mb-6 pt-4 sm:pt-0">
      <div className="bg-transparent">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Left Section - Total Value */}
          <div className="flex gap-6 lg:flex-1">
            <MetricItem
              title="Total Value"
              value={totalValue}
              change={totalValueChange}
              isPositive={totalValueChange.startsWith("+")}
              svgIcon={totalValueSvg}
              isRowDirection
              isLarge = {true}
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
                isLarge = {true}
              />
            </div>
          </div>

          {/* Right Section -  */}
          <div className="">
            <div className="md:py-3 flex items-center md:justify-between gap-3 md:gap-4">
              {/* Left side - All Capital Gains */}
              <div
                className={`flex items-center gap-2 ${
                  allCapitalGainMode
                    ? "text-gray-500 dark:text-gray-300"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              >
                <span className={`text-sm font-medium`}>All Capital Gains</span>
              </div>

              {/* Toggle Switch */}
              <div className="relative">
                <button
                  onClick={() =>
                    onAllCapitalGainModeChange(!allCapitalGainMode)
                  }
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                    allCapitalGainMode ? "bg-green-700" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                      allCapitalGainMode ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Right side - Long-term vs Short-term */}
              <div
                className={`flex items-center gap-2  ${
                  allCapitalGainMode
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-500 dark:text-gray-300"
                }`}
              >
                <span className={`text-sm font-medium`}>Long-term vs Short-term</span>
              </div>
            </div>
            {allCapitalGainMode && (
              <div className="justify-end flex items-center gap-5 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5314A3]" />
                  <span>Short term</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#90C853]" />
                  <span>Long term</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialMetrics;
