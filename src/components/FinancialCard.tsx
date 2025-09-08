import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FinancialCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon?: any; // Made optional
  svgIcon?: React.ReactNode; // Added for SVG icons
  centered?: boolean;
}

const FinancialCard: React.FC<FinancialCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  svgIcon,
  centered = false,
}) => {
  return (
    <div
      className={`flex flex-col space-y-4 ${
        centered ? "items-center text-center" : ""
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="bg-transparent rounded-full flex items-center justify-center">
          {svgIcon ? (
            <div className="text-gray-600 dark:text-[#CDCFD1]">{svgIcon}</div>
          ) : (
            <FontAwesomeIcon icon={icon} className="text-gray-600 dark:text-[#CDCFD1] text-xs" />
          )}
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-base font-medium text-[rgba(14,32,30,1)] dark:text-[#CDCFD1] dark:opacity-80">
            {title}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-[rgba(14,32,30,1)] dark:text-[#CDCFD1]">
          {value}
        </span>
        <span
          className={`text-base font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
};

export default FinancialCard;
