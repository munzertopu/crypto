import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  title, value, change, isPositive, icon, svgIcon, centered = false 
}) => { 
  return (
    <div className={`flex flex-col space-y-4 ${centered ? 'items-center text-center' : ''}`}>
      <div className="flex items-center space-x-4">
        <div className="bg-transparent rounded-full flex items-center justify-center">
          {svgIcon ? (
            <div className="text-gray-600">
              {svgIcon}
            </div>
          ) : (
            <FontAwesomeIcon icon={icon} className="text-gray-600 text-xs" />
          )}
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xl font-medium text-[#0E201E]">{title}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-3xl font-bold text-[#0E201E]">{value}</span>
        <span className={`text-md font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </div>
  );
};

export default FinancialCard;
