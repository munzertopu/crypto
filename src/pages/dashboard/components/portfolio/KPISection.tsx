import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faChartLine,
  faClock,
  faChartBar,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@material-tailwind/react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: any; // FontAwesome icon
  svgIcon?: React.ReactNode; // SVG icon
  isDarkMode: boolean;
  centered?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  svgIcon,
  isDarkMode,
  centered = false,
}) => (
  <div className="flex flex-col space-y-4">
    <div className="flex items-center space-x-4">
      <div className="w-6 h-6 opacity-80 flex items-center justify-center">
        {svgIcon ? (
          <div
            className={`${isDarkMode ? "text-[#B6B8BA]" : "text-[#0E201E]"}`}
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
          className={`text-xl opacity-80 font-medium ${
            isDarkMode ? "text-[#B6B8BA]" : "text-[#0E201E]"
          }`}
        >
          {title}
        </span>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <span
        className={`text-3xl font-bold ${
          isDarkMode ? "text-[#B6B8BA]" : "text-[#0E201E]"
        }`}
      >
        {value}
      </span>
      <span
        className={`text-lg font-medium ${
          isPositive ? "text-[#5F9339]" : "text-[#D8382C]"
        }`}
      >
        {change}
      </span>
    </div>
  </div>
);

interface KPISectionProps {
  income: string;
  incomeChange: string;
  realizedGains: string;
  realizedGainsChange: string;
  shortTerms: string;
  shortTermsChange: string;
  longTerms: string;
  longTermsChange: string;
  onAddKPI?: () => void;
  isDarkMode?: boolean;
}

const KPISection: React.FC<KPISectionProps> = ({
  income = "$200,000",
  incomeChange = "+5.73%",
  realizedGains = "$100,000",
  realizedGainsChange = "+2.25%",
  shortTerms = "$50,000",
  shortTermsChange = "-2.38%",
  longTerms = "$150,000",
  longTermsChange = "+0.93%",
  onAddKPI,
  isDarkMode = false,
}) => {
  // SVG Icons for KPI Cards
  const incomeSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );

  const realizedGainsSvg = (
    <svg
      className="w-7 h-7 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"
      />
    </svg>
  );

  const shortTermsSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const longTermsSvg = (
    <svg
      className="w-7 h-7 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"
      />
    </svg>
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedKPIs, setSelectedKPIs] = useState({
    longTerms: true,
    shortTerms: true,
    realizedGains: true,
    income: true,
    unrealizedGains: false,
    totalTaxLiability: false,
    capitalLosses: false,
    airdropIncome: false,
  });

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKPIToggle = (kpiKey: string) => {
    setSelectedKPIs((prev) => ({
      ...prev,
      [kpiKey]: !prev[kpiKey as keyof typeof prev],
    }));
  };

  const handleSave = () => {
    setIsDropdownOpen(false);
    // Here you would typically save the selected KPIs to your state management
    console.log("Selected KPIs:", selectedKPIs);
  };

  const handleCancel = () => {
    setIsDropdownOpen(false);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="px-8 mb-6 mt-12">
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-3xl font-semibold ${
            isDarkMode ? "text-[#E1E3E5]" : "text-[#0E201E]"
          }`}
        >
          KPI
        </h3>
        <div className="relative pr-8" ref={dropdownRef}>
          {/* Add KPI Button with Dropdown */}
          <button
            onClick={handleDropdownToggle}
            className={`p-4 ${
              isDarkMode
                ? "text-[#B6B8BA] border-[#4D5050]"
                : "text-[#7C7C7C] border-[#E1E3E5]"
            } rounded-2xl bg-transparent flex items-center justify-center border`}
            aria-label="Add KPI"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-64 border rounded-lg shadow-lg py-2 z-50 ${
                isDarkMode
                  ? "bg-[#0E201E] border-[#4D5050]"
                  : "bg-white border-[#E1E3E5]"
              }`}
              role="menu"
              aria-label="KPI selection menu"
            >
              <div
                className={`px-4 py-2 border-b ${
                  isDarkMode ? "border-[#4D5050]" : "border-[#E1E3E5]"
                }`}
              >
                <Typography
                  variant="small"
                  className={`font-semibold ${
                    isDarkMode ? "text-[#F3F5F7]" : "text-[#0E201E]"
                  }`}
                >
                  Select KPIs to Display
                </Typography>
              </div>

              <div className="py-2">
                {Object.entries(selectedKPIs).map(([key, isSelected]) => {
                  const kpiLabels: { [key: string]: string } = {
                    longTerms: "Long Terms",
                    shortTerms: "Short Terms",
                    realizedGains: "Realized Gains",
                    income: "Income",
                    unrealizedGains: "Unrealized Gains",
                    totalTaxLiability: "Total Tax Liability",
                    capitalLosses: "Capital Losses",
                    airdropIncome: "Airdrop Income",
                  };

                  return (
                    <div
                      key={key}
                      className={`flex items-center px-4 py-2 ${
                        isDarkMode ? "hover:bg-[#2F3232]" : "hover:bg-[#F3F5F7]"
                      } cursor-pointer`}
                      onClick={() => handleKPIToggle(key)}
                      role="menuitemcheckbox"
                      aria-checked={isSelected}
                      aria-label={`Toggle ${kpiLabels[key]} KPI display`}
                    >
                      <div
                        className={`w-5 h-5  border-2 rounded flex items-center justify-center mr-2 transition-colors border-[#90C853] ${
                          isSelected
                            ? `${isDarkMode ? "bg-[#5F9339]" : "bg-white"}`
                            : `${isDarkMode ? "" : ""}`
                        }`}
                      >
                        {isSelected && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-6 text-[#4f801cff]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </div>
                      <Typography
                        variant="small"
                        className={`${
                          isDarkMode ? "text-[#F3F5F7]" : "text-[#0E201E]"
                        }`}
                      >
                        {kpiLabels[key]}
                      </Typography>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div
                className={`flex justify-between px-4 py-2 border-t ${
                  isDarkMode ? "border-[#4D5050]" : "border-[#E1E3E5]"
                }`}
              >
                <button
                  onClick={handleCancel}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    isDarkMode ? "text-[#B6B8BA]" : "text-[#7C7C7C]"
                  }`}
                  aria-label="Cancel KPI selection"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-sm font-medium text-[#0E201E] bg-[#5F9339] rounded-md transition-colors"
                  aria-label="Save KPI selection"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-1">
          <KPICard
            title="Income"
            value={income}
            change={incomeChange}
            isPositive={incomeChange.startsWith("+")}
            svgIcon={incomeSvg}
            isDarkMode={isDarkMode}
          />
        </div>
        {/* Vertical Separator */}
        <div
          className={`hidden lg:block w-px ${
            isDarkMode ? "bg-[#4D5050]" : "bg-[#E1E3E5]"
          }`}
        ></div>
        <div className="lg:flex-1 flex justify-center">
          <KPICard
            title="Realized Gains"
            value={realizedGains}
            change={realizedGainsChange}
            isPositive={realizedGainsChange.startsWith("+")}
            svgIcon={realizedGainsSvg}
            isDarkMode={isDarkMode}
          />
        </div>
        {/* Vertical Separator */}
        <div
          className={`hidden lg:block w-px ${
            isDarkMode ? "bg-[#4D5050]" : "bg-[#E1E3E5]"
          }`}
        ></div>
        <div className="lg:flex-1 flex justify-center">
          <KPICard
            title="Short Terms"
            value={shortTerms}
            change={shortTermsChange}
            isPositive={shortTermsChange.startsWith("+")}
            svgIcon={shortTermsSvg}
            isDarkMode={isDarkMode}
          />
        </div>
        {/* Vertical Separator */}
        <div
          className={`hidden lg:block w-px ${
            isDarkMode ? "bg-[#4D5050]" : "bg-[#E1E3E5]"
          }`}
        ></div>
        <div className="lg:flex-1 flex justify-center">
          <KPICard
            title="Long Terms"
            value={longTerms}
            change={longTermsChange}
            isPositive={longTermsChange.startsWith("+")}
            svgIcon={longTermsSvg}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default KPISection;
