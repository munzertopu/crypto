import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Datepicker from 'react-tailwindcss-datepicker';

interface DateRangeSelectorProps {
  selectedDateRange: {
    startDate: Date;
    endDate: Date;
  };
  onDateRangeChange: (dateRange: { startDate: Date; endDate: Date }) => void;
  variant?: 'dropdown' | 'inline';
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  selectedDateRange,
  onDateRangeChange,
  variant = 'dropdown'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateValue, setDateValue] = useState({
    startDate: selectedDateRange.startDate,
    endDate: selectedDateRange.endDate
  });

  // Create shortcuts with year dropdown
  const createShortcuts = () => {
    const shortcuts: any = {
      today: "Today",
      last7Days: {
        text: "Last 7 days",
        period: {
          start: new Date(new Date().setDate(new Date().getDate() - 7)),
          end: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      last30Days: {
        text: "Last 30 days",
        period: {
          start: new Date(new Date().setDate(new Date().getDate() - 30)),
          end: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      last6Months: {
        text: "Last 6 months",
        period: {
          start: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          end: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      last12Months: {
        text: "Last 12 months",
        period: {
          start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          end: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      byYear: {
        text: "By Year",
        period: {
          start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          end: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      }
    };

    return shortcuts;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateRange = () => {
    const startDate = formatDate(selectedDateRange.startDate);
    const endDate = formatDate(selectedDateRange.endDate);
    return `${startDate} - ${endDate}`;
  };

  const handleDateChange = (newValue: any) => {
    if (newValue && newValue.startDate && newValue.endDate) {
      const startDate = new Date(newValue.startDate);
      const endDate = new Date(newValue.endDate);
      
      setDateValue({ startDate, endDate });
      onDateRangeChange({ startDate, endDate });
      if (variant === 'dropdown') {
        setIsOpen(false);
      }
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('.datepicker-container')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDateValue({
      startDate: selectedDateRange.startDate,
      endDate: selectedDateRange.endDate
    });
  }, [selectedDateRange]);

  // Render inline variant
  if (variant === 'inline') {
    return (
      <div className={`flex items-center rounded-lg border p-2 shadow-sm w-full sm:w-auto md:w-64
        border-[#E1E3E5]
        bg-background-light dark:bg-background-dark  dark:border-[#4D5050]`}
      >
        <Datepicker
          displayFormat="DD MMM YYYY"
          separator='-'
          placeholder=''
          value={dateValue} 
          onChange={handleDateChange}
          showShortcuts={true}
          configs={{
              shortcuts: createShortcuts()
          }}
          primaryColor='green'
          inputClassName="w-full rounded-md bg-transparent mr-8 focus:outline-none text-sm 
          placeholder:text-gray-800 dark:placeholder:text-white text-gray-800 dark:text-white"
          containerClassName="relative pr-6"
          toggleClassName="absolute rounded-r-lg px-0 right-0 top-0 h-full 
          text-gray-800 dark:text-white"
        />
      </div>
    );
  }

  // Render dropdown variant (default)
  return (
    <div className="relative datepicker-container">
      {/* Date Range Display Button */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-4 py-2 border rounded-lg transition-colors bg-background-light dark:bg-background-dark  border-gray-300 dark:border-[#4D5050] text-gray-900 hover:bg-gray-50 
        dark:text-gray-250 dark:hover:bg-[#2F3232]"
        aria-label="Select date range"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon 
            icon={faCalendar} 
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
          />
          <span className="text-sm font-medium">
            {formatDateRange()}
          </span>
        </div>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''} text-gray-500`}
          aria-hidden="true"
        />
      </button>

      {/* Datepicker Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
          <Datepicker
            value={dateValue}
            onChange={handleDateChange}
            showShortcuts={true}
            primaryColor="green"
            configs={{
              shortcuts: createShortcuts()
            }}
            containerClassName="w-auto"
            inputClassName="hidden"
            toggleClassName="hidden"
            asSingle={false}
            useRange={true}
            maxDate={new Date()}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
