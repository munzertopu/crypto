import React, { useState } from "react";
import { Card, Typography, CardBody, Avatar } from "@material-tailwind/react";
import TransactionDetail from "./TransactionDetail";
import TransactionFooter from "./TransactionFooter";
import useScreenSize from "../../../hooks/useScreenSize";
import MobileFormDrawer from "../../../components/Drawers/MobileFormDrawer";
import type { Transaction } from "../../../data/transactionAssets";
import TableSortIcon from "../../../components/Icons/TableSortIcon";
import { getTableHeaders } from "../../../data/transactionAssets";
import Checkbox from "../../../components/UI/Checkbox";
import Badge from "../../../components/Badge";
import TradeIcon from "../../../components/Icons/TradeIcon";
import DepositIcon from "../../../components/Icons/DepositIcon";
import SwapIcon from "../../../components/Icons/SwapIcon";
import WithdrawIcon from "../../../components/Icons/WithdrawIcon";
import TransferIcon from "../../../components/Icons/TransferIcon";
import BoardEditIcon from "../../../components/Icons/BoardEditIcon";
import EditIcon from "../../../components/Icons/EditIcon";
import DuplicateIcon from "../../../components/Icons/DuplicateIcon";
import EyeIcon from "../../../components/Icons/EyeIcon";
import DeleteIcon from "../../../components/Icons/DeleteIcon";
import DeleteConfirmationModal from "../../../components/UI/DeleteConfirmationModal";
import MobileBottomSheet from "../../../components/UI/MobileBottomSheet";
import EditTransactionDrawer from "./EditTransactionDrawer";

interface TransactionTableProps {
  transactions: Transaction[];
  activeTab?: string;
  onTransactionClick?: (transaction: Transaction) => void;
  expandedTransactionId?: string | null;
  onToggleExpanded?: (transactionId: string) => void;
  selectedTransactions?: string[];
  onSelectedTransactionsChange?: (selected: string[]) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  activeTab = "All",
  onTransactionClick,
  expandedTransactionId,
  onToggleExpanded,
  selectedTransactions = [],
  onSelectedTransactionsChange,
}) => {
  const TABLE_HEAD = getTableHeaders(activeTab);

  // Helper function to get crypto icon path based on amount string
  const getCryptoIcon = (amount: string): string => {
    if (!amount) return "";
    const upperAmount = amount.toUpperCase();
    
    if (upperAmount.includes("BTC")) return "crypto/bitcoin-btc-logo.png";
    if (upperAmount.includes("ETH")) return "crypto/ethereum-eth-logo.png";
    if (upperAmount.includes("USDT")) return "crypto/tether-usdt-logo.png";
    if (upperAmount.includes("SOL")) return "crypto/solana-sol-logo.png";
    if (upperAmount.includes("LINK")) return "crypto/chainlink-link-logo.png";
    if (upperAmount.includes("SNX")) return "crypto/synthetix-network-token-snx-logo.png";
    if (upperAmount.includes("SHIB")) return "crypto/ShibaInu.png";
    if (upperAmount.includes("TFUEL")) return "crypto/theta-fuel-tfuel-logo.png";
    
    return "";
  };

  // Helper function to render action icon
  const renderActionIcon = (action: string) => {
    switch (action) {
      case "Transfer":
        return <TransferIcon height={36} width={36} />;
      case "Deposit":
         return <DepositIcon height={36} width={36} />;
       case "Withdrawal":
         return <WithdrawIcon height={36} width={36} />;
       case "Swap":
         return <SwapIcon height={36} width={36} />;
       case "Trade":
         return <TradeIcon height={36} width={36} />;
      default:
        return null;
    }
  };

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState<Transaction | null>(
    null
  );
  const [selectedBottomContext, setSelectedBottomContext] =
    useState<Transaction | null>(null);
  const [isEditTransactionDrawerOpen, setIsEditTransactionDrawerOpen] =
    useState(false);
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
    if (onSelectedTransactionsChange) {
      if (selectedTransactions.length === data.length) {
        onSelectedTransactionsChange([]);
      } else {
        onSelectedTransactionsChange(data.map((transaction) => transaction.id));
      }
    }
  };

  const handleSelectTransaction = (transactionId: string) => {
    if (onSelectedTransactionsChange) {
      const newSelection = selectedTransactions.includes(transactionId)
        ? selectedTransactions.filter((id) => id !== transactionId)
        : [...selectedTransactions, transactionId];
      onSelectedTransactionsChange(newSelection);
    }
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
    <div className="mt-[14px] md:px-0 mde:mb-6 md:mt-6 sm:mt-0">
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
                              <TableSortIcon
                                width={8}
                                height={16}
                                fillColor="currentColor"
                                className="opacity-50"
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
                        current,
                        sent,
                        received,
                        transactionId,
                        result,
                        status,
                        time,
                        editable
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
                                className=" sm:flex sm:items-center sm:justify-center
                              "
                              >
                                <Checkbox
                                  checked={selectedTransactions.includes(id)}
                                  onChange={() => handleSelectTransaction(id)}
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
                                <div className="flex flex-col gap-1">
                                  <Typography
                                    variant="small"
                                    className={`text-base font-normal text-gray-900
                                      dark:text-gray-250 truncate`}
                                  >
                                    {wallet.name}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    className={`sm:hidden text-sm font-normal text-gray-900
                                    dark:text-gray-250 opacity-70`}
                                  >
                                    {action}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className="sm:hidden table-cell w-full">
                              <div className="flex flex-col justify-center items-end ">
                                {" "}
                                {sent && (
                                  <div className="flex items-center gap-2">
                                    {getCryptoIcon(sent) && (
                                      <Avatar 
                                        src={getCryptoIcon(sent)} 
                                        alt="" 
                                        size="sm" 
                                        className="h-6 w-6"
                                      />
                                    )}
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
                                    {getCryptoIcon(received) && (
                                      <Avatar 
                                        src={getCryptoIcon(received)} 
                                        alt="" 
                                        size="sm" 
                                        className="h-6 w-6"
                                      />
                                    )}
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
                            <td className="hidden sm:table-cell py-4 pr-4">
                              {sent && (
                                <div className="flex justify-between">
                                  <div className="flex items-start gap-2">
                                    {getCryptoIcon(sent) && (
                                      <Avatar 
                                        src={getCryptoIcon(sent)} 
                                        alt="" 
                                        size="sm" 
                                        className="h-6 w-6"
                                      />
                                    )}
                                    <div>
                                      <Typography
                                        variant="small"
                                        className="text-base font-normal text-error-500"
                                      >
                                        {sent}
                                      </Typography>
                                      <Typography
                                        variant="small"
                                        className="text-sm font-normal text-gray-600
                                      dark:text-gray-250"
                                      >
                                        = {current}
                                      </Typography>
                                    </div>
                                  </div>
                                  {renderActionIcon(action)}
                                </div>
                              )}
                            </td>
                            <td className="hidden sm:table-cell py-4">
                              {received && (
                                <div className="flex items-start gap-2">
                                  {getCryptoIcon(received) && (
                                    <Avatar 
                                      src={getCryptoIcon(received)} 
                                      alt="" 
                                      size="sm" 
                                      className="h-6 w-6"
                                    />
                                  )}
                                  <div>
                                    <Typography
                                      variant="small"
                                      className="text-base font-normal text-green-600"
                                    >
                                      {received}
                                    </Typography>
                                    <Typography
                                      variant="small"
                                      className="text-sm font-normal text-gray-600
                                      dark:text-gray-250"
                                    >
                                      = {current}
                                    </Typography>
                                  </div>
                                  
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
                              <td className="hidden sm:table-cell py-4">
                                <div className="flex items-center gap-2">
                                  {transaction.error &&
                                  transaction.error !== "---" ? (
                                    <>
                                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                      <div
                                        className={`px-3 py-1 rounded-lg border bg-red-50 border-red-200 text-red-700
                                          dark:bg-red-900/20 dark:border-red-600 dark:text-red-400 `}
                                      >
                                        <Typography
                                          variant="small"
                                          className="hidden sm:table-cell text-sm font-normal"
                                        >
                                          {transaction.error}
                                        </Typography>
                                      </div>
                                    </>
                                  ) : (
                                    <Typography
                                      variant="small"
                                      className={`hidden sm:table-cell text-xl font-normal text-[#0E201E] 
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
                              <div className="flex items-center justify-end gap-2">
                                {isCompleted && (
                                  <div className="w-5 h-5 rounded-full flex items-center justify-end text-[#7C7C7C]">
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
                                {editable &&
                                  <BoardEditIcon width={20} height={20} />
                                }
                                
                              </div>
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
        showMoreIcon
        showMoreContent={
          <>
            <div
              onClick={() => setIsEditTransactionDrawerOpen(true)}
              className="flex gap-2 items-center py-1.5 cursor-pointer"
            >
              <EditIcon />
              <span className="text-sm text-gray-900 dark:text-gray-100">
                Edit
              </span>
            </div>
            <div className="flex gap-2 items-center py-1.5">
              <DuplicateIcon />
              <span className="text-sm text-gray-900 dark:text-gray-100">
                Duplicate
              </span>
            </div>
            <div
              onClick={() => {
                setSelectedContext(selectedRow);
                setSelectedRow(null);
              }}
              className="flex gap-2 items-center py-1.5"
            >
              <EyeIcon />
              <span className="text-sm text-gray-900 dark:text-gray-100">
                View in context
              </span>
            </div>
            <div
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
              className="flex gap-2 items-center py-1.5"
            >
              <DeleteIcon />
              <span className="text-sm text-gray-900 dark:text-gray-100">
                Delete
              </span>
            </div>
          </>
        }
      >
        <div className="flex flex-col justify-start items-center w-full gap-6 dark:bg-[#0E201E] pt-2">
          <div className="flex flex-col justify-start items-center w-full gap-2">
            {" "}
            <Avatar
              src={selectedRow?.wallet.logo}
              alt={selectedRow?.wallet.name}
              size="sm"
              className={`h-[60px] w-[60px] flex items-center justify-center text-white text-xs font-bold`}
            />
            <div className="flex flex-col justify-start items-center gap-2">
              <div className="flex justify-center items-center gap-3">
                <span className="text-lg font-semibold text-gray-11 dark:text-gray-250">
                  {selectedRow?.wallet.name}
                </span>

                {selectedRow?.sent === "" && selectedRow?.received !== "" ? (
                  <Badge label={"Deposit"} variant="blue" />
                ) : (
                  <Badge label={"Trade"} variant="orange" />
                )}
              </div>

              <div className="flex justify-start items-center gap-2">
                <span className="text-lg font-semibold  text-error-500">
                  {selectedRow?.sent}
                </span>
                {selectedRow?.sent !== "" && selectedRow?.received !== "" ? (
                  <TradeIcon />
                ) : null}
                <span className="text-lg font-semibold  text-green-600">
                  {selectedRow?.received}
                </span>

                {selectedRow?.sent === "" && selectedRow?.received !== "" ? (
                  <DepositIcon />
                ) : null}
              </div>
            </div>
          </div>
          <TransactionDetail selectedRow={selectedRow} />
        </div>
      </MobileFormDrawer>
      <MobileFormDrawer
        isOpen={selectedContext !== null}
        onClose={() => setSelectedContext(null)}
        header={`${selectedContext?.wallet.name} Transaction`}
        height="93vh"
        noPadding
      >
        <Card className="h-full w-full border-transparent bg-transprent shadow-none">
          <CardBody className="px-0 sm:px-3.5 sm:py-2.5 md:px-0 md:py-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left">
                <tbody className="flex flex-col gap-3 sm:table-row-group overflow-y-auto h-[calc(100vh-250px)]">
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
                                setSelectedBottomContext(transaction);
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
                                  className=" sm:flex sm:items-center sm:justify-center
                              "
                                >
                                  <Checkbox
                                    checked={selectedTransactions.includes(id)}
                                    onChange={() => handleSelectTransaction(id)}
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
                                  <div className="flex flex-col gap-1">
                                    <Typography
                                      variant="small"
                                      className={`text-base font-normal text-gray-900
                                      dark:text-gray-250 truncate`}
                                    >
                                      {wallet.name}
                                    </Typography>
                                    <Typography
                                      variant="small"
                                      className={`sm:hidden text-sm font-normal text-gray-900
                                    dark:text-gray-250 opacity-70`}
                                    >
                                      {action}
                                    </Typography>
                                  </div>
                                </div>
                              </td>
                              <td className="sm:hidden table-cell w-full">
                                <div className="flex flex-col justify-center items-end ">
                                  {" "}
                                  {sent && (
                                    <div className="flex items-center gap-2">
                                      {getCryptoIcon(sent) && (
                                        <Avatar 
                                          src={getCryptoIcon(sent)} 
                                          alt="" 
                                          size="sm" 
                                          className="h-6 w-6"
                                        />
                                      )}
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
                                      {getCryptoIcon(received) && (
                                        <Avatar 
                                          src={getCryptoIcon(received)} 
                                          alt="" 
                                          size="sm" 
                                          className="h-6 w-6"
                                        />
                                      )}
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
                            </tr>
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
      </MobileFormDrawer>
      <TransactionFooter
        selectedTransactions={selectedTransactions}
        onClearSelection={() => onSelectedTransactionsChange?.([])}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => setIsDeleteModalOpen(false)}
        itemName={""}
        drawerHeight="25%"
        deleteButtonText="yes,Delete"
      />

      {/* Mobile Bottom Sheet */}
      <MobileBottomSheet
        isOpen={selectedBottomContext !== null}
        onClose={() => setSelectedBottomContext(null)}
        transaction={selectedBottomContext}
      />
      <EditTransactionDrawer
        isOpen={isEditTransactionDrawerOpen}
        onClose={() => setIsEditTransactionDrawerOpen(false)}
      />
    </div>
  );
};

export default TransactionTable;
