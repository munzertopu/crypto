import React, { useState } from 'react';
import CalendarIcon from './Icons/CalendarIcon';
import Datepicker from "react-tailwindcss-datepicker";

interface DatePickerProps {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  className?: string;
  datePickerClass?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Set date",
  className = "",
  datePickerClass = ""
}) => {
  return (
    <div className={`flex flex-1 pl-2 bg-white dark:bg-gray-800 border border-default dark:border-gray-700 rounded-lg items-center ${className}`}>
      <CalendarIcon 
        width={16}
        height={16} 
        strokeColor="currentColor" 
        className="text-gray-500" 
      />
      
      <Datepicker
        value={value} 
        onChange={onChange}
        useRange={false}
        asSingle={true}
        placeholder={placeholder}
        containerClassName="relative bg-transparent focus:outline-none w-full"
        inputClassName={`bg-transparent pl-2 py-2.5 w-full focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-100 ${datePickerClass}`}
        toggleClassName="hidden"
      />
    </div>
  );
};

export default DatePicker;