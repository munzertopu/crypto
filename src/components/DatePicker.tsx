import React, { useState } from 'react';
import CalendarIcon from '../utils/icons/CalendarIcon';
import Datepicker from "react-tailwindcss-datepicker";

interface DatePickerProps {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Set date",
  className = "",
}) => {
  return (
    <div className={`flex flex-1 pl-2 border border-default rounded-lg items-center ${className}`}>
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
        toggleClassName="hidden"
      />
    </div>
  );
};

export default DatePicker;