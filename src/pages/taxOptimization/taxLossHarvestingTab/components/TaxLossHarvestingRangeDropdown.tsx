import React, { useState } from 'react';
import { Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface TaxLossHarvestingRangeDropdownProps {
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
        className={`flex items-center space-x-8 px-4 py-3 border rounded-xl text-base 
          border-default text-primary 
          dark:text-gray-300 dark:border-gray-600`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {/* Dropdown Content */}
      {isOpen && (
        <div className={`absolute top-full mt-1 p-4 rounded-lg border shadow-lg w-80 bg-white border-gray-300
          dark:bg-gray-800 dark:border-gray-600
          ${isRight ? "right-0" : "left-0"} 
          `}>
         <div className="flex gap-2">
           {/* From Input */}
           <div className="flex-1">
             <Typography variant="small" className={`mb-2 font-medium text-left text-gray-700 dark:text-gray-300`}>
               From:
             </Typography>
             <Input
               type="number"
               placeholder="$ Amount"
               value={fromValue}
               onChange={(e) => setFromValue(e.target.value)}
               className={`w-full rounded-lg text-sm font-semibold border-gray-300 bg-white !text-gray-900
                 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-250`}
             />
           </div>
           
           {/* To Input */}
           <div className="flex-1">
             <Typography variant="small" className={`mb-2 font-medium text-gray-700  dark:text-gray-300`}>
               To:
             </Typography>
             <Input
               type="number"
               placeholder="$ Amount"
               value={toValue}
               onChange={(e) => setToValue(e.target.value)}
               className={`w-full rounded-lg text-sm font-semibold border-gray-300 bg-white !text-gray-900
                 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-250`}
             />
           </div>
         </div>
       </div>
     )}
   </div>
 );
};

export default TaxLossHarvestingRangeDropdown;
