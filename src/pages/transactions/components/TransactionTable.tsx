import React, { useState } from "react";
import { Card, Typography, CardBody, Avatar } from "@material-tailwind/react";
import TransactionDetail from "./TransactionDetail";
import TransactionFooter from "./TransactionFooter";
import useScreenSize from "../../../hooks/useScreenSize";
import MobileFormDrawer from "../../../components/Drawers/MobileFormDrawer";
import type { Transaction } from "../../../data/transactionAssets";
import { getTableHeaders } from "../../../data/transactionAssets";

interface TransactionTableProps {
  transactions: Transaction[];
  activeTab?: string;
  onTransactionClick?: (transaction: Transaction) => void;
  expandedTransactionId?: string | null;
  onToggleExpanded?: (transactionId: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  activeTab = "All",
  onTransactionClick,
  expandedTransactionId,
  onToggleExpanded,
}) => {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );

  const TABLE_HEAD = getTableHeaders(activeTab);

  const data = transactions;

  // Group transactions by date
  const groupTransactionsByDate = (transactions: Transaction[]) => {
    const grouped = transactions.reduce((groups, transaction) => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {} as Record<string, Transaction[]>);

    // Sort dates in descending order (newest first)
    return Object.keys(grouped)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .map((date) => ({
        date,
        transactions: grouped[date],
      }));
  };

  const groupedTransactions = groupTransactionsByDate(data);

  // Format date for display
  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

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

  const screenSize = useScreenSize();
  const [selectedRow, setSelectedRow] = useState<Transaction | null>(null);

  const renderExpandedDetails = (transaction: Transaction) => (
    <tr
      key={`${transaction.id}-details`}
      className={`bg-white
      dark:bg-[#0E201E]`}
    >
      <td colSpan={TABLE_HEAD.length} className="px-4">
        <TransactionDetail />
      </td>
    </tr>
  );

  return (
    <div className="md:px-0 mde:mb-6 md:mt-6 sm:mt-0">
      <Card className="h-full w-full border-transparent bg-transprent shadow-none">
        <CardBody className="px-0 sm:px-3.5 sm:py-2.5 md:px-0 md:py-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="bg-table-header dark:bg-gray-800 hidden sm:table-header-group">
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className={`cursor-pointer py-3.5 ${
                        index === 0 ? "px-1 rounded-l-md" : "px-1.5"
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
                          className={`flex text-sm items-center gap-2 font-normal leading-none text-[#666868]
                            dark:text-[#B6B8BA]`}
                        >
                          {head}{" "}
                          {index !== 2 && index < TABLE_HEAD.length - 2 && (
                            <div
                              className="flex flex-col"
                              role="button"
                              aria-label={`Sort by ${head}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="flex flex-col gap-3 sm:table-row-group">
                {groupedTransactions.map((group) => (
                  <React.Fragment key={group.date}>
                    {/* Date Header Row */}
                    <tr>
                      <td colSpan={TABLE_HEAD.length} className="pt-6 pb-3">
                        <Typography
                          variant="small"
                          className="font-semibold text-gray-700 dark:text-[#E1E3E5]"
                        >
                          {formatDateForDisplay(group.date)}
                        </Typography>
                      </td>
                    </tr>

                    {/* Transactions for this date */}
                    {group.transactions.map((transaction, index) => {
                      const {
                        id,
                        wallet,
                        action,
                        sent,
                        received,
                        transactionId,
                        result,
                        status,
                        time,
                      } = transaction;
                      const isCompleted = status === "completed";
                      return (
                        <React.Fragment key={id}>
                          <tr
                            className={`flex justify-start
                              bg-white sm:table-row 
                              dark:bg-transparent ${
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
                              className={`py-4 
                                ${index === 0 ? "rounded-tl-lg" : "0"} 
                                ${
                                  index === groupedTransactions.length - 1
                                    ? "rounded-bl-lg"
                                    : "0"
                                } `}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div
                                className="hidden sm:flex sm:items-center sm:justify-center
                              "
                              >
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
                                {!expandedTransactionId && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-4"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                                {expandedTransactionId && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-4 rotate-180"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                                <Avatar
                                  src={wallet.logo}
                                  alt={wallet.name}
                                  size="sm"
                                  className={`h-12 w-12 flex items-center justify-center text-white text-xs font-bold`}
                                />
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    className={`text-base font-normal text-gray-900
                                      dark:text-gray-250 truncate`}
                                  >
                                    {wallet.name}
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
                                    dark:text-gray-250`}
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
                            <td className="hidden sm:table-cell py-4 space-y-1">
                              <Typography
                                variant="small"
                                className={`text-base font-normal text-[#0E201E]
                                      dark:text-gray-250`}
                              >
                                {action}
                              </Typography>
                              <Typography
                                variant="small"
                                className={`text-sm font-normal text-gray-600
                                      dark:text-gray-250`}
                              >
                                {time}
                              </Typography>
                            </td>
                            <td className="hidden sm:table-cell py-4">
                              {sent && (
                                <div className="flex items-center gap-2">
                                  <Typography
                                    variant="small"
                                    className="text-base font-normal text-error-500"
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
                                      dark:text-gray-250`}
                              >
                                {result}
                              </Typography>
                            </td>
                            <td className="hidden sm:table-cell py-4">
                              <Typography
                                variant="small"
                                className={`text-base font-normal text-[#0E201E]
                                      dark:text-gray-250`}
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
                                        className={`px-3 py-1 rounded-lg border bg-red-50 border-red-200 text-red-700
                                          dark:bg-red-900/20 dark:border-red-600 dark:text-red-400`}
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
                                      className={`text-xl font-normal text-[#0E201E] 
                                        dark:text-gray-250`}
                                    >
                                      {transaction.error || "---"}
                                    </Typography>
                                  )}
                                </div>
                              </td>
                            )}
                            <td
                              className={`hidden sm:table-cell py-4
                            ${index === 0 ? "rounded-tr-lg" : "0"} 
                                ${
                                  index === transactions.length - 1
                                    ? "rounded-bl-lg"
                                    : "0"
                                }
                            `}
                            >
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
                  </React.Fragment>
                ))}
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
              <span className="text-lg font-semibold text-[#0E201E] dark:text-gray-250">
                {selectedRow?.wallet.name}
              </span>
              <div className="flex justify-start items-center gap-2">
                <span className="text-lg font-semibold  text-error-500">
                  {selectedRow?.sent}
                </span>
                {selectedRow?.sent !== "" && selectedRow?.received !== "" && (
                  <span className=" flex-shrink-0 w-[2px] h-4 bg-gray-150 dark:bg-[#8C8E90]"></span>
                )}

                <span className="text-lg font-semibold  text-green-600">
                  {selectedRow?.received}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-gray-700 dark:text-gray-250">
                  Action Type:
                </span>
                <span className="text-base font-medium text-[#0e201e] dark:text-gray-250 transform capitalize">
                  {selectedRow?.status}
                </span>
              </div>
            </div>

            {selectedRow?.sent !== "" && (
              <>
                <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
                <div className="flex flex-col justify-start items-start w-full px-4">
                  <div className="flex justify-between items-center w-full ">
                    <span className="text-base  text-[#4D5050] dark:text-gray-250">
                      Sent Amount:
                    </span>
                    <span className="text-base font-medium text-[#0e201e] dark:text-gray-250 transform capitalize">
                      {selectedRow?.sent}
                    </span>
                  </div>
                </div>
              </>
            )}

            {selectedRow?.received !== "" && (
              <>
                <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
                <div className="flex flex-col justify-start items-start w-full px-4">
                  <div className="flex justify-between items-center w-full ">
                    <span className="text-base  text-[#4D5050] dark:text-gray-250">
                      Receive Amount:
                    </span>
                    <span className="text-base font-medium text-[#0e201e] dark:text-gray-250 transform capitalize">
                      {selectedRow?.received}
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className="w-full h-px bg-gray-200 dark:bg-[#2F3232]"></div>
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-[#4D5050] dark:text-gray-250">
                  Wallet Address:
                </span>
                <span className="text-base font-medium text-[#0e201e] dark:text-gray-250 transform capitalize">
                  {selectedRow?.wallet.address}
                </span>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200 dark:bg-[#2F3232]"></div>
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-[#4D5050] dark:text-gray-250">
                  Date:
                </span>
                <span className="text-base font-medium text-[#0e201e] dark:text-gray-250 transform capitalize">
                  {selectedRow?.date}
                </span>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200 dark:bg-[#2F3232]"></div>
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-[#4D5050] dark:text-gray-250">
                  Result:
                </span>
                <span className="text-base font-medium text-[#0e201e] dark:text-gray-250 transform capitalize">
                  {selectedRow?.result}
                </span>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200 dark:bg-[#2F3232]"></div>
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-[#4D5050] dark:text-gray-250">
                  Transaction ID:
                </span>
                <span className="text-base font-medium text-[#0e201e] dark:text-gray-250 transform capitalize">
                  {selectedRow?.transactionId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </MobileFormDrawer>
      <TransactionFooter
        selectedTransactions={selectedTransactions}
        onClearSelection={() => setSelectedTransactions([])}
      />
    </div>
  );
};

export default TransactionTable;
