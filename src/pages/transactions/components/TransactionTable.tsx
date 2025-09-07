import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faXmark,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Typography, CardBody, Avatar } from "@material-tailwind/react";
import TransactionDetail from "./TransactionDetail";
import useScreenSize from "../../../hooks/useScreenSize";
import MobileFormDrawer from "../../../components/Drawers/MobileFormDrawer";

interface Transaction {
  id: string;
  wallet: {
    name: string;
    symbol: string;
    address: string;
    logo: string;
    color: string;
  };
  type: "buy" | "sell" | "swap" | "transfer";
  action: "Trade" | "Receive" | "Transfer" | "Swap" | "Send" | "Deploy";
  sent: string;
  received: string;
  transactionId: string;
  result: string;
  date: string;
  status: "completed" | "pending" | "failed";
  platform: string;
  error?: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  isDarkMode: boolean;
  activeTab?: string;
  onTransactionClick?: (transaction: Transaction) => void;
  expandedTransactionId?: string | null;
  onToggleExpanded?: (transactionId: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  isDarkMode,
  activeTab = "All",
  onTransactionClick,
  expandedTransactionId,
  onToggleExpanded,
}) => {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("Loan");

  // Dynamic table headers based on active tab
  const getTableHeaders = () => {
    switch (activeTab) {
      case "All":
        return [
          "select",
          "Wallet",
          "Action",
          "Sent",
          "Received",
          "Result",
          "Transaction ID",
          "",
        ];
      case "Uncategorized":
        return [
          "select",
          "Wallet",
          "Action",
          "Sent",
          "Received",
          "Result",
          "Transaction ID",
          "",
        ];
      case "Warnings":
        return [
          "select",
          "Wallet",
          "Action",
          "Sent",
          "Received",
          "Warning",
          "Transaction ID",
          "Error",
          "",
        ];
      default:
        return [
          "select",
          "Wallet",
          "Action",
          "Sent",
          "Received",
          "Result",
          "Transaction ID",
          "",
        ];
    }
  };

  const TABLE_HEAD = getTableHeaders();

  const data = transactions;

  const handleSelectAll = () => {
    if (selectedTransactions.length === data.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(data.map((transaction) => transaction.id));
    }
  };

  const handleSelectTransaction = (transactionId: string) => {
    setSelectedTransactions((prev) =>
      prev.includes(transactionId)
        ? prev.filter((id) => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const isAllSelected =
    data.length > 0 && selectedTransactions.length === data.length;
  const isIndeterminate =
    selectedTransactions.length > 0 &&
    selectedTransactions.length < data.length;

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setIsDropdownOpen(false);
  };

  const itemsPerPageOptions = [5, 10, 25, 50];
  const tagOptions = ["Reward", "Airdrop", "Income", "Loan", "Fee refund"];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);
  const screenSize = useScreenSize();
  const [selectedRow, setSelectedRow] = useState<Transaction | null>(null);
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

  const renderExpandedDetails = (transaction: Transaction) => (
    <tr
      key={`${transaction.id}-details`}
      className={`bg-[#F3F5F7] 
      dark:bg-[#0E201E]`}
    >
      <td colSpan={TABLE_HEAD.length} className="px-4">
        <TransactionDetail isDarkMode={isDarkMode} />
      </td>
    </tr>
  );

  return (
    <div className="md:px-8 mb-6 mt-5 sm:mt-0">
      <Card className={`h-full w-full border-transparent bg-transparent `}>
        <CardBody className="px-0 sm:px-3.5 sm:py-2.5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead
                className={`bg-[#F3F5F7] dark:bg-[#2F3232] hidden sm:table-header-group`}
              >
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className={`cursor-pointer p-4 ${
                        index === 0 ? "rounded-l-md" : ""
                      } ${
                        index === TABLE_HEAD.length - 1 ? "rounded-r-md" : ""
                      }`}
                    >
                      {head === "select" ? (
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={isAllSelected}
                            ref={(input) => {
                              if (input) input.indeterminate = isIndeterminate;
                            }}
                            onChange={handleSelectAll}
                            className={`w-4 h-4 rounded-lg accent-green-600 focus:outline-none`}
                            aria-label="Select all transactions"
                          />
                        </div>
                      ) : (
                        <div
                          className={`flex text-lg items-center justify-between gap-2 font-normal leading-none text-[#666868]
                            dark:text-[#B6B8BA]`}
                        >
                          {head}{" "}
                          {head !== "select" &&
                            head !== "Action" &&
                            head !== "Transaction ID" &&
                            head !== "Status" &&
                            head !== "Category" &&
                            head !== "Warning" && (
                              <div
                                className="flex flex-col"
                                role="button"
                                aria-label={`Sort by ${head}`}
                              >
                                <FontAwesomeIcon
                                  icon={faChevronUp}
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                />
                                <FontAwesomeIcon
                                  icon={faChevronDown}
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                />
                              </div>
                            )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="flex flex-col gap-3 sm:table-row-group">
                {data.map((transaction) => {
                  const {
                    id,
                    wallet,
                    action,
                    sent,
                    received,
                    transactionId,
                    result,
                    status,
                  } = transaction;
                  const isCompleted = status === "completed";
                  return (
                    <React.Fragment key={id}>
                      <tr
                        className={`flex justify-start items-stretch  sm:table-row ${
                          onToggleExpanded
                            ? "cursor-pointer transition-colors"
                            : ""
                        }`}
                        onClick={() => {
                          if (screenSize.width < 640) {
                            setSelectedRow(transaction);
                            return;
                          }
                          if (onToggleExpanded) onToggleExpanded(id);
                        }}
                      >
                        <td
                          className="py-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="hidden sm:flex sm:items-center sm:justify-center">
                            <input
                              type="checkbox"
                              checked={selectedTransactions.includes(id)}
                              onChange={() => handleSelectTransaction(id)}
                              className={`w-4 h-4 rounded-lg accent-green-600 focus:outline-none`}
                              aria-label={`Select transaction ${transactionId}`}
                            />
                          </div>
                        </td>
                        <td className="py-0 sm:py-4">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={wallet.logo}
                              alt={wallet.name}
                              size="sm"
                              className={`h-12 w-12 flex items-center justify-center text-white text-xs font-bold`}
                            />
                            <div className="flex flex-col  max-w-[200px]">
                              <Typography
                                variant="small"
                                className={`text-base font-normal text-gray-900
                                  dark:text-[#F3F5F7] truncate`}
                              >
                                {wallet.name}
                              </Typography>
                              <Typography
                                variant="small"
                                className={`text-sm font-normal  text-gray-900
                                  dark:text-[#F3F5F7] opacity-70 truncate`}
                              >
                                {wallet.address}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="sm:hidden table-cell w-full">
                          <div className="flex flex-col justify-center items-end ">
                            {" "}
                            <Typography
                              variant="small"
                              className={`text-base font-normal text-gray-900
                                  dark:text-[#F3F5F7]`}
                            >
                              {action}
                            </Typography>
                            {sent && (
                              <div className="flex items-center gap-2">
                                <Typography
                                  variant="small"
                                  className="text-base font-normal text-red-600"
                                >
                                  {sent}
                                </Typography>
                              </div>
                            )}
                            {received && (
                              <div className="flex items-center gap-2">
                                <Typography
                                  variant="small"
                                  className="text-base font-normal text-green-600"
                                >
                                  {received}
                                </Typography>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="hidden sm:table-cell py-4">
                          <Typography
                            variant="small"
                            className={`text-base font-normal text-[#0E201E]
                                  dark:text-[#F3F5F7]`}
                          >
                            {action}
                          </Typography>
                        </td>
                        <td className="hidden sm:table-cell py-4">
                          {sent && (
                            <div className="flex items-center gap-2">
                              <Typography
                                variant="small"
                                className="text-base font-normal text-red-600"
                              >
                                {sent}
                              </Typography>
                            </div>
                          )}
                        </td>
                        <td className="hidden sm:table-cell py-4">
                          {received && (
                            <div className="flex items-center gap-2">
                              <Typography
                                variant="small"
                                className="text-base font-normal text-green-600"
                              >
                                {received}
                              </Typography>
                            </div>
                          )}
                        </td>
                        <td className="hidden sm:table-cell py-4">
                          <Typography
                            variant="small"
                            className={`text-base font-normal text-[#0E201E]
                                  dark:text-[#F3F5F7]`}
                          >
                            {result}
                          </Typography>
                        </td>
                        <td className="hidden sm:table-cell py-4">
                          <Typography
                            variant="small"
                            className={`text-base font-normal text-[#0E201E]
                                  dark:text-[#F3F5F7]`}
                          >
                            {transactionId}
                          </Typography>
                        </td>
                        {activeTab === "Warnings" && (
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              {transaction.error &&
                              transaction.error !== "---" ? (
                                <>
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <div
                                    className={`px-3 py-1 rounded-lg border ${
                                      isDarkMode
                                        ? "bg-red-900/20 border-red-600 text-red-400"
                                        : "bg-red-50 border-red-200 text-red-700"
                                    }`}
                                  >
                                    <Typography
                                      variant="small"
                                      className="text-sm font-normal"
                                    >
                                      {transaction.error}
                                    </Typography>
                                  </div>
                                </>
                              ) : (
                                <Typography
                                  variant="small"
                                  className={`text-xl font-normal ${
                                    isDarkMode
                                      ? "text-[#F3F5F7]"
                                      : "text-[#0E201E]"
                                  }`}
                                >
                                  {transaction.error || "---"}
                                </Typography>
                              )}
                            </div>
                          </td>
                        )}
                        <td className="hidden sm:table-cell py-4">
                          {isCompleted && (
                            <div className="w-10 h-10 rounded-full flex items-center justify-end text-[#7C7C7C]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            </div>
                          )}
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      {expandedTransactionId === id &&
                        renderExpandedDetails(transaction)}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      <MobileFormDrawer
        isOpen={selectedRow !== null}
        onClose={() => setSelectedRow(null)}
        header={`${selectedRow?.wallet.name} Transaction`}
        height="93vh"
        noPadding
        noChildPadding
      >
        <div className="flex flex-col justify-start items-center w-full gap-8 dark:bg-[#0E201E] pt-2">
          <div className="flex flex-col justify-start items-center w-full gap-3">
            {" "}
            <Avatar
              src={selectedRow?.wallet.logo}
              alt={selectedRow?.wallet.name}
              size="sm"
              className={`h-12 w-12 flex items-center justify-center text-white text-xs font-bold`}
            />
            <div className="flex flex-col justify-start items-center gap-2">
              <span className="text-lg font-semibold text-[#0E201E] dark:text-[#F3F5F7]">
                {selectedRow?.wallet.name}
              </span>
              <span className="text-lg font-semibold  text-green-600">
                {selectedRow?.received}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-gray-700 dark:text-[#F3F5F7]">
                  Action Type:
                </span>
                <span className="text-base font-medium text-[#0e201e] dark:text-[#F3F5F7] transform capitalize">
                  {selectedRow?.status}
                </span>
              </div>
            </div>
            <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-[#4D5050] dark:text-[#F3F5F7]">
                  Receive Amount:
                </span>
                <span className="text-base font-medium text-[#0e201e] dark:text-[#F3F5F7] transform capitalize">
                  {selectedRow?.received}
                </span>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200 dark:bg-[#2F3232]"></div>
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-[#4D5050] dark:text-[#F3F5F7]">
                  Wallet Address:
                </span>
                <span className="text-base font-medium text-[#0e201e] dark:text-[#F3F5F7] transform capitalize">
                  {selectedRow?.wallet.address}
                </span>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200 dark:bg-[#2F3232]"></div>
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-[#4D5050] dark:text-[#F3F5F7]">
                  Date:
                </span>
                <span className="text-base font-medium text-[#0e201e] dark:text-[#F3F5F7] transform capitalize">
                  {selectedRow?.date}
                </span>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200 dark:bg-[#2F3232]"></div>
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-[#4D5050] dark:text-[#F3F5F7]">
                  Result:
                </span>
                <span className="text-base font-medium text-[#0e201e] dark:text-[#F3F5F7] transform capitalize">
                  {selectedRow?.result}
                </span>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200 dark:bg-[#2F3232]"></div>
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-[#4D5050] dark:text-[#F3F5F7]">
                  Transaction ID:
                </span>
                <span className="text-base font-medium text-[#0e201e] dark:text-[#F3F5F7] transform capitalize">
                  {selectedRow?.transactionId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </MobileFormDrawer>
      {/* Table Footer */}
      <div
        className={`hidden sm:block mt-4 px-8 py-4 bg-white
        dark:bg-transparent`}
      >
        <div className="flex items-center justify-between">
          {/* Left side - Show on page dropdown */}
          <div className="flex items-center space-x-2">
            <span
              className={`text-sm text-gray-700
                dark:text-[#F3F5F7]`}
            >
              Show on page
            </span>
            <div className="relative" ref={dropdownRef}>
              <button
                className={`px-3 py-1 rounded border flex items-center space-x-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50
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
                  className={`absolute bottom-full left-0 mb-1 w-16 border rounded-lg shadow-lg py-1 z-50 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {itemsPerPageOptions.map((option) => (
                    <button
                      key={option}
                      className={`w-full px-3 py-1 text-sm text-left hover:bg-gray-100 ${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      } ${itemsPerPage === option ? "bg-[#90C853]" : ""}`}
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
                dark:text-[#F3F5F7]`}
            >
              of 77
            </span>
          </div>

          {/* Center - Conditional actions when transactions are selected */}
          {selectedTransactions.length > 0 && (
            <div
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl bg-transparent border border-[#E1E3E5]
                dark:border-[#4D5050]`}
            >
              <span
                className={`text-sm font-medium text-gray-700
                 dark:text-[#F3F5F7]`}
              >
                {selectedTransactions.length} selected
              </span>
              <div
                className={`w-px h-4 bg-gray-300
                  dark:bg-[#F3F5F7]`}
                role="separator"
              ></div>
              <span
                className={`text-sm text-gray-600
                  dark:text-[#F3F5F7]`}
              >
                Tag as:
              </span>
              <div className={`relative inline-block`} ref={tagDropdownRef}>
                <button
                  className={`px-3 py-1 text-sm rounded border flex items-center space-x-1 border-gray-300 text-gray-700"
                  dark:text-[#F3F5F7]`}
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
                    className={`absolute bottom-full left-0 mb-1 w-32 border rounded-lg shadow-lg py-1 z-50 max-h-40 overflow-y-auto ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {tagOptions.map((option) => (
                      <button
                        key={option}
                        className={`w-full px-3 py-2 text-sm text-left flex items-center justify-between ${
                          selectedTag === option ? "bg-gray-100" : ""
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
              <div
                className={`w-px h-4 ${
                  isDarkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
                role="separator"
              ></div>
              <button
                className={`px-3 py-1 text-sm rounded border border-gray-300 text-gray-700
                  dark:text-[#F3F5F7]`}
                aria-label="Merge selected transactions"
              >
                Merge
              </button>
              <div
                className={`w-px h-4 ${
                  isDarkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
                role="separator"
              ></div>
              <button
                className={`px-3 py-1 text-sm rounded bg-[#90C853] text-[#0E201E]`}
                aria-label="Apply actions to selected transactions"
              >
                Apply
              </button>
              <button
                className={`px-2 py-1 text-sm rounded border border-gray-300 text-gray-700
                dark:text-[#F3F5F7]`}
                onClick={() => setSelectedTransactions([])}
                aria-label="Clear selection"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="w-3 h-3"
                  aria-hidden="true"
                />
              </button>
            </div>
          )}

          {/* Right side - Page navigation */}
          <div className="hidden sm:flex items-center space-x-2">
            {/* Previous button */}
            <button
              className={`w-8 h-8 rounded border flex items-center justify-center border-gray-300 text-gray-700
                dark:text-[#F3F5F7]`}
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
              className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-medium text-[#0E201E] bg-[#90C853]
                `}
              aria-label="Go to page 1"
              aria-current="page"
            >
              1
            </button>
            <button
              className={`w-8 h-8 rounded border flex items-center justify-center text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50
              dark:text-[#F3F5F7]`}
              aria-label="Go to page 2"
            >
              2
            </button>
            <button
              className={`w-8 h-8 rounded border flex items-center justify-center text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50
              dark:text-[#F3F5F7]`}
              aria-label="Go to page 3"
            >
              3
            </button>

            {/* Ellipsis */}
            <span
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              ...
            </span>

            <button
              className={`w-8 h-8 rounded border flex items-center justify-center text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50
              dark:text-[#F3F5F7]`}
              aria-label="Go to page 13"
            >
              13
            </button>

            {/* Next button */}
            <button
              className={`w-8 h-8 rounded border flex items-center justify-center text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50
              dark:text-[#F3F5F7]`}
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
    </div>
  );
};

export default TransactionTable;
