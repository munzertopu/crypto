import React, { useState, useEffect, useRef, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faXmark,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "../../../components/Icons/CloseIcon";

interface TransactionFooterProps {
  selectedTransactions: string[];
  onClearSelection: () => void;
}

const TransactionFooter: React.FC<TransactionFooterProps> = ({
  selectedTransactions,
  onClearSelection,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("Loan");

  const itemsPerPageOptions = [5, 10, 25, 50];
  const tagOptions = ["Reward", "Airdrop", "Income", "Loan", "Fee refund"];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setIsDropdownOpen(false);
  };

  // Click outside handler for items per page dropdown
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

  // Click outside handler for tag dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tagDropdownRef.current &&
        !tagDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTagDropdownOpen(false);
      }
    };

    if (isTagDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTagDropdownOpen]);

  //  className={`mt-4 px-8 py-4
  //       dark:bg-transparent`}

  return (
    <div
      className={`fixed sm:static bottom-[60px] left-0 w-full px-1 sm:px-8 sm:py-4 
        dark:bg-transparent`}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Show on page dropdown */}
        <div className="hidden sm:flex items-center space-x-2">
          <span
            className={`text-sm text-gray-700
              dark:text-gray-250`}
          >
            Show on page
          </span>
          <div className=" relative" ref={dropdownRef}>
            <button
              className={`px-3 py-1 rounded rounded-lg border flex items-center space-x-2 text-base
                text-gray-700 bg-white border-default
                `}
              onClick={handleDropdownToggle}
              aria-label="Select items per page"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <span>{itemsPerPage}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`w-3 h-3 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className={`absolute bottom-full left-0 mb-1 w-16 border rounded-lg shadow-lg py-1 z-50 bg-white border-gray-300 
                  dark:bg-gray-800 dark:border-gray-600`}
              >
                {itemsPerPageOptions.map((option) => (
                  <button
                    key={option}
                    className={`w-full px-3 py-1 text-sm text-left hover:bg-gray-100 text-gray-700 hover:bg-gray-100
                      dark:text-gray-300 dark:hover:bg-gray-700 
                      ${itemsPerPage === option ? "bg-[#90C853]" : ""}`}
                    onClick={() => handleItemsPerPageChange(option)}
                    aria-label={`Show ${option} items per page`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span
            className={`text-sm text-gray-700
              dark:text-gray-250`}
          >
            of 77
          </span>
        </div>

        {/* Center - Conditional actions when transactions are selected */}
        {selectedTransactions.length > 0 && (
          <div
            className={`w-full sm:w-[auto] flex flex-col gap-2 sm:gap-0 sm:flex-row items-center sm:space-x-3 p-3 sm:p-0 sm:px-6 sm:py-3 rounded-xl border shadow-sm
              bg-white dark:bg-gray-900 border-default dark:border-gray-700`}
          >
            <div className="w-full sm:w-[auto] flex items-center justify-around gap-3 sm:gap-0 sm:space-x-3">
              <span
                className={`text-sm font-normal text-gray-700
               dark:text-gray-300`}
              >
                {selectedTransactions.length} selected
              </span>
              <div
                className={`w-px h-4 bg-default
                dark:bg-gray-700`}
                role="separator"
              ></div>
              <span
                className={`text-sm text-[#4D5050] font-medium
                dark:text-gray-300`}
              >
                Tag as:
              </span>
              <div className={`relative inline-block `} ref={tagDropdownRef}>
                <button
                  className={`w-full sm:w-[auto] px-4 py-1 text-sm rounded border flex items-center space-x-16 
                  border-default text-gray-900
                  dark:border-gray-700 dark:text-gray-100`}
                  onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                  aria-label="Select tag type for selected transactions"
                  aria-haspopup="true"
                  aria-expanded={isTagDropdownOpen}
                >
                  <span>{selectedTag}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3 h-3 transition-transform ${
                      isTagDropdownOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Tag Dropdown Menu */}
                {isTagDropdownOpen && (
                  <div
                    className={`absolute bottom-full left-0 mb-1 px-1.5 border rounded-lg shadow-lg py-1 z-50 max-h-40 overflow-y-auto bg-white border-gray-200 
                      dark:bg-gray-800 dark:border-gray-600`}
                  >
                    {tagOptions.map((option) => (
                      <button
                        key={option}
                        className={`w-full px-3 py-2 text-sm text-left rounded-lg flex items-center justify-between ${
                          selectedTag === option ? "bg-gray-600" : ""
                        }`}
                        onClick={() => {
                          setSelectedTag(option);
                          setIsTagDropdownOpen(false);
                        }}
                        aria-label={`Select ${option} tag`}
                      >
                        <span>{option}</span>
                        {selectedTag === option && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full sm:w-[auto] flex items-center sm:space-x-3 gap-3 sm:gap-0">
              <div
                className={`hidden sm:flex  w-px h-4 bg-default
                dark:bg-gray-700`}
                role="separator"
              ></div>
              <button
                className={` sm:hidden px-2 py-1 text-sm rounded rounded-lg border border-default text-gray-700
                  dark:border-gray-700 dark:text-gray-100`}
                onClick={onClearSelection}
                aria-label="Clear selection"
              >
                <CloseIcon />
              </button>
              <button
                className={`w-full sm:w-[auto] px-2.5 py-1.5 text-sm rounded border 
                border-default text-gray-900
                 dark:border-gray-700 dark:text-gray-100`}
                aria-label="Merge selected transactions"
              >
                Merge
              </button>
              <div
                className={`hidden sm:flex w-px h-4 bg-default
                dark:bg-gray-700`}
                role="separator"
              ></div>
              <button
                className={`w-full sm:w-[auto] px-2.5 py-1.5 text-sm rounded rounded-lg 
                bg-green-500 text-[#0E201E]`}
                aria-label="Apply actions to selected transactions"
              >
                Apply
              </button>
              <button
                className={`hidden sm:flex px-2 py-1 text-sm rounded rounded-lg border border-default text-gray-700
                dark:border-gray-700 dark:text-gray-300`}
                onClick={onClearSelection}
                aria-label="Clear selection"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        )}

        {/* Right side - Page navigation */}
        <div className="hidden sm:flex items-center space-x-2">
          {/* Previous button */}
          <button
            className={`w-8 h-8 rounded rounded-lg border flex items-center justify-center 
              border-default text-gray-500
              dark:text-gray-250`}
            aria-label="Go to previous page"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="w-3 h-3"
              aria-hidden="true"
            />
          </button>

          {/* Page numbers */}
          <button
            className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-medium 
              text-gray-900 dark:text-gray-150 bg-green-500
              `}
            aria-label="Go to page 1"
            aria-current="page"
          >
            1
          </button>
          <button
            className={`w-8 h-8 rounded border flex items-center justify-center text-sm font-medium 
              border-default text-gray-900
              dark:text-gray-250`}
            aria-label="Go to page 2"
          >
            2
          </button>
          <button
            className={`w-8 h-8 rounded border flex items-center justify-center text-sm font-medium 
              border-default text-gray-900 
              dark:text-gray-250`}
            aria-label="Go to page 3"
          >
            3
          </button>

          {/* Ellipsis */}
          <span
            className={`text-sm text-gray-900 
              dark:text-gray-250`}
          >
            ...
          </span>

          <button
            className={`w-8 h-8 rounded border flex items-center justify-center text-sm font-medium 
              border-default text-gray-900 
              dark:text-gray-250`}
            aria-label="Go to page 13"
          >
            13
          </button>

          {/* Next button */}
          <button
            className={`w-8 h-8 rounded rounded-lg border flex items-center justify-center 
              border-default text-gray-500
            dark:text-gray-250`}
            aria-label="Go to next page"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="w-3 h-3"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFooter;
