import React, { useState } from 'react';
import { Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface TaxLossHarvestingRangeDropdownProps {
  isDarkMode: boolean;
  fromValue: string;
  setFromValue: (value: string) => void;
  toValue: string;
  setToValue: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  isRight?:boolean;
}

const TaxLossHarvestingRangeDropdown: React.FC<TaxLossHarvestingRangeDropdownProps> = ({
  isDarkMode,
  fromValue,
  setFromValue,
  toValue,
  setToValue,
  isOpen,
  setIsOpen,
  title,
  isRight
}) => {
  return (
    <div className="relative">
      <button
        className={`flex items-center space-x-8 px-4 py-3 border border-gray-300 rounded-xl text-md hover:bg-gray-50 transition-colors ${
          isDarkMode ? 'text-gray-300 border-gray-600 hover:bg-gray-700' : 'text-[#0E201E]'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`w-3 h-3 text-[#0E201E] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {/* Dropdown Content */}
      {isOpen && (
        <div className={`absolute top-full mt-1 p-4 rounded-lg border shadow-lg w-80
          ${isRight ? "right-0" : "left-0"} 
          ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-600' 
            : 'bg-white border-gray-300'
        }`}>
         <div className="flex gap-2">
           {/* From Input */}
           <div className="flex-1">
             <Typography variant="small" className={`mb-2 font-medium text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
               From:
             </Typography>
             <Input
               type="number"
               placeholder="$ Amount"
               value={fromValue}
               onChange={(e) => setFromValue(e.target.value)}
               className={`w-full rounded-lg text-sm font-semibold ${
                 isDarkMode 
                   ? 'border-gray-500 bg-gray-700 !text-white' 
                   : 'border-gray-300 bg-white !text-gray-900'
               }`}
             />
           </div>
           
           {/* To Input */}
           <div className="flex-1">
             <Typography variant="small" className={`mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
               To:
             </Typography>
             <Input
               type="number"
               placeholder="$ Amount"
               value={toValue}
               onChange={(e) => setToValue(e.target.value)}
               className={`w-full rounded-lg text-sm font-semibold ${
                 isDarkMode 
                   ? 'border-gray-500 bg-gray-700 !text-white' 
                   : 'border-gray-300 bg-white !text-gray-900'
               }`}
             />
           </div>
         </div>
       </div>
     )}
   </div>
 );
};

export default TaxLossHarvestingRangeDropdown;
