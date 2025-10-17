import React, { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import CalendarIcon from "./Icons/CalendarIcon";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import useScreenSize from "../hooks/useScreenSize";
import Dropdown from "./UI/Dropdown";
import { enUS } from "date-fns/locale"; // Import enUS locale
import MobileDrawer from "./Drawers/MobileDrawer";

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
  buttonClassName?: string;
  className?: string;
  isDrawer?: boolean;
  iconPosition?: "left" | "right";
  hideDateInput?: boolean;
  openByDefault?: boolean;
}

const DateRangePickerPopover: React.FC<DateRangeSelectorProps> = ({
  selectedDateRange,
  onDateRangeChange,
  buttonLabel,
  className = "",
  buttonClassName = "",
  isDrawer = false,
  iconPosition = "left",
  hideDateInput = false,
  openByDefault = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: selectedDateRange.startDate || new Date(),
      endDate: selectedDateRange.endDate || new Date(),
      key: "selection",
    },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const screenSize = useScreenSize();
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (openByDefault) {
      setIsOpen(true);
    }
  }, [openByDefault]);
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

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateRange = (selectedDateRange: {
    startDate: Date | null;
    endDate: Date | null;
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
      startDate: newSelection.startDate || null,
      endDate: newSelection.endDate || null,
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDateRange([
      {
        startDate: selectedDateRange.startDate || new Date(),
        endDate: selectedDateRange.endDate || new Date(),
        key: "selection",
      },
    ]);
  }, [selectedDateRange]);

  return (
    <div
      className="relative datepicker-container dark:bg-[#0E201E]"
      ref={containerRef}
    >
      {!hideDateInput && (
        <button
          onClick={handleIconClick}
          className={`w-full flex items-center ${
            iconPosition === "right" ? "justify-between" : "justify-start"
          } p-2 md:p-0 md:px-4 md:py-2 border rounded-lg transition-colors bg-white border-gray-150 text-gray-900
          dark:text-gray-100 dark:bg-[#0E201E] dark:border-gray-700 md:min-w-[194px] ${className}`}
          aria-label="Select date range"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {iconPosition === "right" ? (
            <>
              <span
                className={`hidden md:block text-xs font-medium ${buttonClassName}`}
              >
                {formatDateRange(selectedDateRange)}
                {!selectedDateRange.startDate && !selectedDateRange.endDate && (
                  <>{buttonLabel}</>
                )}
              </span>
              <CalendarIcon
                width={16}
                height={16}
                strokeColor="currentColor"
                className="text-gray-500"
              />
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <CalendarIcon
                width={16}
                height={16}
                strokeColor="currentColor"
                className="text-gray-500"
              />

              <span className="hidden md:block text-xs font-medium">
                {formatDateRange(selectedDateRange)}
                {!selectedDateRange.startDate && !selectedDateRange.endDate && (
                  <>{buttonLabel}</>
                )}
              </span>
            </div>
          )}
        </button>
      )}

      {isOpen && screenSize.width > 1024 ? (
        <div
          className={`absolute top-full  md:left-[-710px] mt-1 z-50 bg-white dark:bg-gray-900 border border-gray-150 rounded-lg shadow-lg p-4 md:p-5 flex flex-col md:flex-row gap-2 ${
            isDrawer ? " left-[-10px]" : "left-[-175px]"
          }`}
        >
          {/* Left Sidebar for Filters */}
          <RenderDateRange
            dateRange={dateRange}
            handleDateChange={handleDateChange}
            handleYearSelect={handleYearSelect}
            setIsOpen={setIsOpen}
            createShortcuts={createShortcuts}
            screenSize={screenSize}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
        </div>
      ) : isOpen && !isDrawer && screenSize.width < 1024 ? (
        <MobileDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Select Date Range"
          height={500}
          onRightButtonClick={() => {
            setIsOpen(false);
            console.log("Apply clicked", dateRange);
          }}
          rightButtonText="Apply"
        >
          <div className="">
            <RenderDateRange
              dateRange={dateRange}
              handleDateChange={handleDateChange}
              handleYearSelect={handleYearSelect}
              setIsOpen={setIsOpen}
              createShortcuts={createShortcuts}
              screenSize={screenSize}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
            />
          </div>
        </MobileDrawer>
      ) : isOpen && isDrawer && screenSize.width < 640 ? (
        <>
          <div
            className={`absolute top-full w-full mt-1 z-50 bg-white dark:bg-gray-900 border border-gray-150 rounded-lg shadow-lg p-4 md:p-5 flex flex-col md:flex-row gap-2 ${
              isDrawer ? " " : "left-[-175px]"
            }`}
          >
            {/* Left Sidebar for Filters */}
            <RenderDateRange
              dateRange={dateRange}
              handleDateChange={handleDateChange}
              handleYearSelect={handleYearSelect}
              setIsOpen={setIsOpen}
              createShortcuts={createShortcuts}
              screenSize={screenSize}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DateRangePickerPopover;

const RenderDateRange = ({
  dateRange,
  handleDateChange,
  handleYearSelect,
  setIsOpen,
  createShortcuts,
  screenSize,
  setSelectedOption,
  selectedOption,
}: {
  dateRange: { startDate: Date | null; endDate: Date | null; key: string }[];
  handleDateChange: (ranges: any, year?: number) => void;
  handleYearSelect: (year: number) => void;
  setIsOpen: (isOpen: boolean) => void;
  createShortcuts: any;
  screenSize: { width: number; height: number };
  setSelectedOption: (option: string) => void;
  selectedOption: string;
}) => {
  return (
    <>
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
              setIsOpen(false);
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
              setIsOpen(false);
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
              setIsOpen(false);
            }}
            className="cursor-pointer  hover:bg-gray-100 px-2 py-1 rounded text-sm opacity-90"
          >
            All Time
          </div>
        </div>
      </div>
      {/* Datepicker */}
      <div className="w-full border border-gray-150 rounded-[12px] shadow-sm md:shadow-none md:border-none">
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
      <div className="w-full md:px-1 mt-[15px] md:mt-[-10px] pb-4 md:hidden">
        <div className="flex justify-between items-center gap-2  md:px-2 opacity-90 w-full">
          <Dropdown
            className={`${
              selectedOption === "By year" ? "w-[50%]" : "w-full"
            }  flex-grow-1`}
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
              className="w-[50%] flex-grow-1"
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
    </>
  );
};
