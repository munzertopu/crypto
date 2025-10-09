import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import useScreenSize from "../../../../hooks/useScreenSize";
import MobileDrawer from "../../../../components/Drawers/MobileDrawer";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: any; // FontAwesome icon
  svgIcon?: React.ReactNode; // SVG icon
  centered?: boolean;
  className?: string; // NEW: allows external styling
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  svgIcon,
  className = "",
}) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    <div className="flex items-center gap-1.5">
      <div className="flex items-center justify-center">
        {svgIcon ? (
          <div
            className={`"text-gray-900 w-5 h-5 md:h-6 md:w-6 flex items-center justify-center
               dark:text-gray-200`}
          >
            {svgIcon}
          </div>
        ) : (
          <FontAwesomeIcon
            icon={icon}
            className="text-[#0E201E] text-base
             dark:text-gray-200"
          />
        )}
      </div>
      <div className="flex items-center">
        <span
          className={`text-base sm:text-xl lg:text-base font-medium md:font-semibold text-gray-900 dark:text-gray-200`}
        >
          {title}
        </span>
      </div>
    </div>

    <div className="flex flex-col items-start sm:flex-row  sm:items-end sm:gap-2">
      <span className="text-h6 sm:text-[32px] md:text-h4 font-semibold text-gray-900 dark:text-gray-200">
        {value}
      </span>
      <span
        className={`text-caption sm:text-sm md:text-smh font-semibold mb-0.5 ${
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
}) => {
  // SVG Icons for KPI Cards
  const incomeSvg = (
    <svg
      className="w-5 h-5 md:h-6 md:w-6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51001 10.9402 9.51001 10.0202C9.51001 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 7.5V16.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 3V7H21"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 2L17 7"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const realizedGainsSvg = (
    <svg
      className="w-5 h-5 md:h-6 md:w-6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.73 19.7C7.55 18.82 8.8 18.89 9.52 19.85L10.53 21.2C11.34 22.27 12.65 22.27 13.46 21.2L14.47 19.85C15.19 18.89 16.44 18.82 17.26 19.7C19.04 21.6 20.49 20.97 20.49 18.31V7.04C20.5 3.01 19.56 2 15.78 2H8.22C4.44 2 3.5 3.01 3.5 7.04V18.3C3.5 20.97 4.96 21.59 6.73 19.7Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 7H16"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 11H15"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const shortTermsSvg = (
    <svg
      className="w-5 h-5 md:h-6 md:w-6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.75 13.25C20.75 18.08 16.83 22 12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 8V13"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 2H15"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const longTermsSvg = (
    <svg
      className="w-5 h-5 md:h-6 md:w-6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.88 18.1501V16.0801"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M12 18.1498V14.0098"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M17.12 18.1502V11.9302"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M17.12 5.8501L16.66 6.3901C14.11 9.3701 10.69 11.4801 6.88 12.4301"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M14.1899 5.8501H17.1199V8.7701"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const screenSize = useScreenSize();
  const [openKPIFilter, setOpenKPIFilter] = useState(false);
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
    if (screenSize.width < 640) {
      setOpenKPIFilter(!openKPIFilter);
      return;
    }
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
    <div className="mb-8 md:mb-0 md:px-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-[#0E201E] dark:text-gray-150">
          KPI
        </h3>
        <div className="relative pr-0 sm:pr-8" ref={dropdownRef}>
          {/* Add KPI Button with Dropdown */}
          <button
            onClick={handleDropdownToggle}
            className="p-2 md:p-3 text-[#7C7C7C] dark:text-[#B6B8BA] border-gray-150 dark:border-[#4D5050] rounded-[8px] md:rounded-[12px] bg-transparent flex items-center justify-center border shadow-sm
            "
            aria-label="Add KPI"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
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
              className="absolute right-6 mt-2 w-[230px] border rounded-[12px] shadow-sm z-50 bg-white dark:bg-[#0E201E] border-default dark:border-[#4D5050] z-50"
              role="menu"
              aria-label="KPI selection menu"
            >
              <div className="p-5">
                <div className="flex flex-col justify-start items-start gap-3">
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
                    // hover:bg-[#F3F5F7] dark:hover:bg-[#2F3232]
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-start cursor-pointer gap-3 w-full"
                        onClick={() => handleKPIToggle(key)}
                        role="menuitemcheckbox"
                        aria-checked={isSelected}
                        aria-label={`Toggle ${kpiLabels[key]} KPI display`}
                      >
                        <div
                          className={`w-5 h-5 border-2 flex items-center justify-center rounded-[4px]  transition-colors border-[#90C853] ${
                            isSelected
                              ? "bg-white dark:bg-[#5F9339]"
                              : "border-[rgba(124,124,124,0.15)]"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5 4L4.49647 7L10.5 1"
                                stroke="#90C853"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-[#0E201E] dark:text-gray-250 text-base  opacity-80">
                          {kpiLabels[key]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Action Buttons */}
                <div className="flex justify-between pt-5 ">
                  <button
                    onClick={handleCancel}
                    className="py-1.5 text-sm font-medium rounded-[10px] transition-colors text-gray-700 dark:text-[#B6B8BA]"
                    aria-label="Cancel KPI selection"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="min-w-[61px] py-1.5 px-2.5 bg-green-500 shadow-xs text-sm font-medium rounded-[10px] transition-colors text-gray-900 dark:text-gray-150"
                    aria-label="Save KPI selection"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`grid grid-cols-2 gap-4 sm:gap-8 md:gap-0 md:mr-9 md:grid md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] lg:flex lg:flex-row lg:justify-between lg:items-stretch lg:flex-wrap `}
      >
        <KPICard
          title="Income"
          value={income}
          change={incomeChange}
          isPositive={incomeChange.startsWith("+")}
          svgIcon={incomeSvg}
        />

        <div className="hidden xl:block flex-shrink-0 w-px h-20 bg-gray-150 dark:bg-gray-700 mx-10 "></div>

        <KPICard
          title="Realized Gains"
          value={realizedGains}
          change={realizedGainsChange}
          isPositive={realizedGainsChange.startsWith("+")}
          svgIcon={realizedGainsSvg}
        />

        <div className="flex-shrink-0 w-px h-20 bg-gray-150 dark:bg-gray-700 mx-10 hidden xl:block"></div>

        <div
          className={`sm:hidden col-span-2 w-full h-px
            dark:bg-gray-700  bg-gray-150
            `}
        ></div>
        <KPICard
          title="Short Terms"
          value={shortTerms}
          change={shortTermsChange}
          isPositive={shortTermsChange.startsWith("+")}
          svgIcon={shortTermsSvg}
        />

        <div className="flex-shrink-0 w-px h-20 bg-gray-150 dark:bg-gray-700 mx-10 hidden xl:block"></div>

        <KPICard
          title="Long Terms"
          value={longTerms}
          change={longTermsChange}
          isPositive={longTermsChange.startsWith("+")}
          svgIcon={longTermsSvg}
        />
      </div>
      <MobileDrawer
        isOpen={openKPIFilter}
        onClose={() => setOpenKPIFilter(false)}
        header="Add KPI"
        hideCloseIcon={true}
        height={400}
        leftButtonText="Cancel"
        rightButtonText="Save"
        onLeftButtonClick={() => setOpenKPIFilter(false)}
        onRightButtonClick={() => setOpenKPIFilter(false)}
      >
        <div className="flex flex-col gap-3 pt-3">
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
            // hover:bg-[#F3F5F7] dark:hover:bg-[#2F3232]
            return (
              <div
                key={key}
                className="flex items-center justtify-start cursor-pointer gap-2 w-full p-1.5"
                onClick={() => handleKPIToggle(key)}
                role="menuitemcheckbox"
                aria-checked={isSelected}
                aria-label={`Toggle ${kpiLabels[key]} KPI display`}
              >
                <div
                  className={`w-5 h-5 border-2 flex items-center justify-center rounded-[4px]  transition-colors border-[#90C853] ${
                    isSelected
                      ? "bg-green-600 dark:bg-[#5F9339]"
                      : "border-[rgba(124,124,124,0.15)]"
                  }`}
                >
                  {isSelected && (
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 4L4.49647 7L10.5 1"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-[#0E201E] dark:text-primary text-base leading-5 opacity-80">
                  {kpiLabels[key]}
                </span>
              </div>
            );
          })}
        </div>
      </MobileDrawer>
    </div>
  );
};

export default KPISection;
