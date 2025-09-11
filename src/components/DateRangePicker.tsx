import React, { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import useScreenSize from "../hooks/useScreenSize";
import Dropdown from "./UI/Dropdown";
import { enUS } from "date-fns/locale"; // Import enUS locale

interface DateRangeSelectorProps {
  selectedDateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onDateRangeChange: (dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;

  variant?: "dropdown" | "inline";
  buttonLabel?: string;
  className?: string;
  isDrawer?: boolean;
}

const DateRangePickerPopover: React.FC<DateRangeSelectorProps> = ({
  selectedDateRange,
  onDateRangeChange,
  buttonLabel,
  className = "",
  isDrawer = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: selectedDateRange.startDate,
      endDate: selectedDateRange.endDate,
      key: "selection",
    },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const screenSize = useScreenSize();
  const [selectedOption, setSelectedOption] = useState("");

  const createShortcuts = () => {
    const today = new Date();
    return [
      { label: "Today", range: [today, today] },
      {
        label: "Last 7 days",
        range: [new Date(today.setDate(today.getDate() - 7)), new Date()],
      },
      {
        label: "Last 30 days",
        range: [new Date(today.setDate(today.getDate() - 30)), new Date()],
      },
      {
        label: "Last 6 months",
        range: [new Date(today.setMonth(today.getMonth() - 6)), new Date()],
      },
      {
        label: "Last 12 months",
        range: [new Date(today.setMonth(today.getMonth() - 12)), new Date()],
      },
      {
        label: "Year to date",
        range: [new Date(today.getFullYear(), 0, 1), new Date()],
      },
      // { label: "All time", range: [new Date(2020, 0, 1), new Date()] },
    ];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateRange = (selectedDateRange: {
    startDate: Date;
    endDate: Date;
  }) => {
    if (!selectedDateRange?.startDate || !selectedDateRange?.endDate) return "";
    const startMonth = selectedDateRange.startDate.toLocaleDateString("en-US", {
      month: "short",
    });
    const startDay = selectedDateRange.startDate.toLocaleDateString("en-US", {
      day: "numeric",
    });
    const endMonth = selectedDateRange.endDate.toLocaleDateString("en-US", {
      month: "short",
    });
    const endDay = selectedDateRange.endDate.toLocaleDateString("en-US", {
      day: "numeric",
    });
    const year = selectedDateRange.endDate.getFullYear();

    if (
      selectedDateRange.startDate.getFullYear() ===
      selectedDateRange.endDate.getFullYear()
    ) {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    } else {
      return `${formatDate(selectedDateRange.startDate)} - ${formatDate(
        selectedDateRange.endDate
      )}`;
    }
  };

  const handleYearSelect = (year: number) => {
    handleDateChange(null, year);
  };
  const handleDateChange = (ranges: any, year?: number) => {
    let newSelection;
    if (year) {
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31);
      newSelection = {
        startDate: startOfYear,
        endDate: endOfYear,
        key: "selection",
      };
    } else {
      const { selection } = ranges;
      newSelection = selection;
    }
    setDateRange([newSelection]);
    onDateRangeChange({
      startDate: newSelection.startDate,
      endDate: newSelection.endDate,
    });
    // setIsOpen(false);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    setDateRange([
      {
        startDate: selectedDateRange.startDate,
        endDate: selectedDateRange.endDate,
        key: "selection",
      },
    ]);
  }, [selectedDateRange]);

  return (
    <div className="relative datepicker-container" ref={containerRef}>
      <button
        onClick={handleIconClick}
        className={`w-full flex items-center justify-between px-4 py-2 border rounded-lg transition-colors bg-white border-gray-150 text-gray-900 hover:bg-gray-50 min-w-[194px] ${className}`}
        aria-label="Select date range"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center space-x-2">
          {/* <FontAwesomeIcon
            icon={faCalendar}
            onClick={handleIconClick}
            className="w-4 h-4 text-gray-500 cursor-pointer"
            aria-hidden="true"
          /> */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.3335 1.3335V3.3335"
              stroke="#7C7C7C"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.6665 1.3335V3.3335"
              stroke="#7C7C7C"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.3335 6.06006H13.6668"
              stroke="#7C7C7C"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 5.66683V11.3335C14 13.3335 13 14.6668 10.6667 14.6668H5.33333C3 14.6668 2 13.3335 2 11.3335V5.66683C2 3.66683 3 2.3335 5.33333 2.3335H10.6667C13 2.3335 14 3.66683 14 5.66683Z"
              stroke="#7C7C7C"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.463 9.13314H10.469"
              stroke="#7C7C7C"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.463 11.1331H10.469"
              stroke="#7C7C7C"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.99715 9.13314H8.00314"
              stroke="#7C7C7C"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.99715 11.1331H8.00314"
              stroke="#7C7C7C"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.52979 9.1333H5.53577"
              stroke="#7C7C7C"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.52938 11.1331H5.53537"
              stroke="#7C7C7C"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span className="text-xs font-medium">
            {formatDateRange(selectedDateRange)}
            {!selectedDateRange.startDate && !selectedDateRange.endDate && (
              <>{buttonLabel}</>
            )}
          </span>
        </div>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-[-175px] md:left-[-710px] mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-150 rounded-lg shadow-lg p-4 md:p-5 flex flex-col md:flex-row gap-2 ${
            isDrawer ? " left-[-10px]" : ""
          }`}
        >
          {/* Left Sidebar for Filters */}
          <div className="hidden min-w-[200px] pr-4 border-r border-gray-150 md:flex flex-col justify-start items-start px-2 gap-2 ">
            {createShortcuts().map((shortcut, index) => (
              <div
                key={index}
                onClick={() => {
                  handleDateChange({
                    selection: {
                      startDate: shortcut.range[0],
                      endDate: shortcut.range[1],
                      key: "selection",
                    },
                  });
                }}
                className="cursor-pointer  hover:bg-gray-100 px-2 py-1 rounded text-sm"
              >
                {shortcut.label}
              </div>
            ))}
            <div className="flex justify-start items-center gap-2 px-2 opacity-90">
              <span className="text-sm ">By year</span>{" "}
              <Dropdown
                options={Array.from({
                  length: new Date().getFullYear() - 2010 + 1,
                }).map((_, i) => (2010 + i).toString())}
                onSelect={(value) => {
                  handleYearSelect(parseInt(value));
                }}
                defaultValue=""
              />
            </div>
            <div className="">
              <div
                onClick={() => {
                  handleDateChange({
                    selection: {
                      startDate: new Date(2020, 0, 1),
                      endDate: new Date(),
                      key: "selection",
                    },
                  });
                }}
                className="cursor-pointer  hover:bg-gray-100 px-2 py-1 rounded text-sm opacity-90"
              >
                All Time
              </div>
            </div>
          </div>
          {/* Datepicker */}
          <div className="w-full">
            <DateRange
              // ranges={dateRange}
              // editableDateInputs={false}
              // onChange={handleDateChange}
              direction={screenSize.width < 640 ? "vertical" : "horizontal"}
              rangeColors={["#6DA036"]}
              // className="react-date-range-custom"
              // moveRangeOnFirstSelection={false}
              months={screenSize.width < 640 ? 1 : 2}
              editableDateInputs={false}
              showDateDisplay={false}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              locale={enUS} // Added locale prop to fix the error
            />
          </div>
          <div className="w-full px-1 mt-[-10px] pb-5 md:hidden">
            <div className="flex justify-between items-center gap-2 px-2 opacity-90 w-full">
              <Dropdown
                className="w-full flex-grow-1"
                options={createShortcuts()
                  .map((shortcut) => shortcut.label)
                  .concat(["By year", "All time"])}
                onSelect={(value) => {
                  if (value === "All time") {
                    handleDateChange({
                      selection: {
                        startDate: new Date(2020, 0, 1),
                        endDate: new Date(),
                        key: "selection",
                      },
                    });
                    return;
                  }
                  setSelectedOption(value);
                  if (value === "By year") return;
                  console.log(value);
                  const selectedShortcut = createShortcuts().find(
                    (shortcut) => shortcut.label === value
                  );
                  if (selectedShortcut) {
                    handleDateChange({
                      selection: {
                        startDate: selectedShortcut.range[0],
                        endDate: selectedShortcut.range[1],
                        key: "selection",
                      },
                    });
                  }
                }}
              />
              {selectedOption === "By year" && (
                <Dropdown
                  options={Array.from({
                    length: new Date().getFullYear() - 2010 + 1,
                  }).map((_, i) => (2010 + i).toString())}
                  onSelect={(value) => {
                    handleYearSelect(parseInt(value));
                  }}
                  defaultValue=""
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePickerPopover;
