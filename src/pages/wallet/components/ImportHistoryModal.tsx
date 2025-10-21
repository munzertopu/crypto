import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import Dropdown from "../../../components/UI/Dropdown";
import TrashIcon from "../../../components/Icons/TrashIcon";
import TableSortIcon from "../../../components/Icons/TableSortIcon";
import DeleteConfirmationModal from "../../../components/UI/DeleteConfirmationModal";
import SuccessNotification from "../../../components/SuccessNotification";

interface ImportHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletName: string;
}

interface ImportHistoryItem {
  id: string;
  wallet: {
    name: string;
    icon: string;
    color: string;
    img: string;
  };
  fileName: string;
  transactionsAdded: number;
  dateRange: {
    start: string;
    end: string;
  };
}

const mockImportHistory: ImportHistoryItem[] = [
  {
    id: "1",
    wallet: {
      name: "Bitcoin",
      icon: "B",
      color: "bg-orange-500",
      img: "/crypto/bitcoin-btc-logo.png",
    },
    fileName: "coinbase_transactions_2023",
    transactionsAdded: 642,
    dateRange: {
      start: "Jan 3, 2023",
      end: "Dec 29, 2023",
    },
  },
  {
    id: "2",
    wallet: {
      name: "Ethereum",
      icon: "Ξ",
      color: "bg-blue-500",
      img: "/crypto/ethereum-eth-logo.png",
    },
    fileName: "celsius_export_full_2021-20",
    transactionsAdded: 828,
    dateRange: {
      start: "Jan 19, 2021",
      end: "Dec 6, 2023",
    },
  },
  {
    id: "3",
    wallet: {
      name: "Solana",
      icon: "◎",
      color: "bg-purple-500",
      img: "/crypto/solana-sol-logo.png",
    },
    fileName: "kraken_spot_trades_Q2_202",
    transactionsAdded: 312,
    dateRange: {
      start: "May 5, 2019",
      end: "Nov 11, 2020",
    },
  },
  {
    id: "4",
    wallet: {
      name: "Tether",
      icon: "₮",
      color: "bg-teal-500",
      img: "/crypto/tether-usdt-logo.png",
    },
    fileName: "tether_archive_2019-2020.c.",
    transactionsAdded: 154,
    dateRange: {
      start: "Apr 1, 2023",
      end: "Jun 30, 2023",
    },
  },
];

const ImportHistoryModal: React.FC<ImportHistoryModalProps> = ({
  isOpen,
  onClose,
  walletName,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [importType, setImportType] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ImportHistoryItem | null>(
    null
  );
  const [showNotification, setShowNotification] = useState(false);

  if (!isOpen) return null;

  const handleSort = (column: string) => {
    // Handle sorting logic here
    console.log("Sort by:", column);
  };

  const handleDeleteClick = (item: ImportHistoryItem) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      // Handle actual deletion logic here
      console.log("Deleting item:", itemToDelete.id);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);

      // Show success notification
      setShowNotification(true);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="fixed top-[150px] md:top-0 inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full md:items-center md:justify-center md:p-4">
        <div className="relative bg-white dark:bg-gray-100 rounded-t-2xl md:rounded-2xl shadow-xl max-w-6xl w-full p-3 md:p-8 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-2xl font-semibold text-gray-11">
              Import History
            </h2>
            <button onClick={onClose} className="text-gray-500">
              <svg
                className="w-4 h-4 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            {/* Search Bar */}
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 py-2 md:py-2.5 pl-9 md:pl-10 pr-3 md:pr-4 border border-default rounded-lg focus:outline-none text-sm md:text-base"
              />
            </div>

            {/* Import Type and Sort By - Flex Row */}
            <div className="flex flex-row items-center md:space-x-3 w-full md:w-auto gap-2 md:gap-1">
              <Dropdown
                options={["CSV", "API"]}
                onSelect={setImportType}
                defaultValue="Import type"
                className="w-full md:w-auto"
              />
              <Dropdown
                options={["Sort by recent"]}
                onSelect={setSortBy}
                defaultValue="Sort by: Recent"
                className="w-full md:w-auto"
              />
            </div>
          </div>

          {/* Mobile Card Layout */}
          <div className="flex-1 overflow-auto block md:hidden">
            <div className="space-y-3">
              {mockImportHistory.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${item.wallet.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}
                      >
                        <img
                          src={item.wallet.img}
                          alt={item.wallet.name}
                          className="w-6 h-6"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <span className="text-sm font-medium text-gray-900">
                          {item.wallet.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.fileName}.csv
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.transactionsAdded} transactions
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteClick(item)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Delete import"
                    >
                      <TrashIcon strokeColor="currentColor" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="flex-1 overflow-auto hidden md:block">
            <div className="h-full w-full border-transparent bg-transparent shadow-none">
              <div className="rounded-lg overflow-x-auto">
                <table className="w-full min-w-max table-auto text-left">
                  <thead className="bg-table-header dark:bg-gray-800">
                    <tr className="">
                      {[
                        "Wallet",
                        "File Name",
                        "Transactions Added",
                        "Date Range",
                        "",
                      ].map((head, index) => (
                        <th
                          key={head}
                          className={`cursor-pointer px-5 py-3.5 ${
                            index === 0 ? "rounded-l-xl" : ""
                          } ${index === 4 ? "rounded-r-md" : ""}`}
                        >
                          <Typography
                            variant="small"
                            className="flex items-center justify-start gap-2 font-normal text-sm leading-none text-gray-600 dark:text-[#B6B8BA]"
                          >
                            {head}{" "}
                            {head !== "" && (
                              <button
                                onClick={() =>
                                  handleSort(
                                    head.toLowerCase().replace(" ", "")
                                  )
                                }
                                className="text-gray-900"
                              >
                                <TableSortIcon
                                  width={8}
                                  height={16}
                                  fillColor="currentColor"
                                  className="opacity-50"
                                />
                              </button>
                            )}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockImportHistory.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 ${item.wallet.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}
                            >
                              <img
                                src={item.wallet.img}
                                alt={item.wallet.name}
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-base text-gray-900 dark:text-gray-100">
                                {item.wallet.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex flex-col">
                            <span className="font-normal text-base text-gray-900 dark:text-gray-100">
                              {item.fileName}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className="font-normal text-base text-gray-900 dark:text-gray-100">
                            {item.transactionsAdded} transactions
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="font-normal text-base text-gray-900 dark:text-gray-100">
                            {item.dateRange.start} → {item.dateRange.end}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => handleDeleteClick(item)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            aria-label="Delete import"
                          >
                            <TrashIcon strokeColor="currentColor" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemName={itemToDelete?.fileName}
      />

      {/* Success Notification */}
      <SuccessNotification
        message="File was deleted"
        isVisible={showNotification}
        onClose={handleCloseNotification}
      />
    </div>
  );
};

export default ImportHistoryModal;
