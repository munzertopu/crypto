import React, { useState } from 'react';
import { Typography } from "@material-tailwind/react";
import TrashIcon from '../../utils/icons/TrashIcon';
import TableSortIcon from '../../utils/icons/TableSortIcon';

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
    id: '1',
    wallet: {
      name: 'Bitcoin',
      icon: 'B',
      color: 'bg-orange-500',
      img: '/crypto/bitcoin-btc-logo.png'
    },
    fileName: 'coinbase_transactions_2023',
    transactionsAdded: 642,
    dateRange: {
      start: 'Jan 3, 2023',
      end: 'Dec 29, 2023'
    }
  },
  {
    id: '2',
    wallet: {
      name: 'Ethereum',
      icon: 'Ξ',
      color: 'bg-blue-500',
      img: '/crypto/ethereum-eth-logo.png'
    },
    fileName: 'celsius_export_full_2021-20',
    transactionsAdded: 828,
    dateRange: {
      start: 'Jan 19, 2021',
      end: 'Dec 6, 2023'
    }
  },
  {
    id: '3',
    wallet: {
      name: 'Solana',
      icon: '◎',
      color: 'bg-purple-500',
      img: '/crypto/solana-sol-logo.png'
    },
    fileName: 'kraken_spot_trades_Q2_202',
    transactionsAdded: 312,
    dateRange: {
      start: 'May 5, 2019',
      end: 'Nov 11, 2020'
    }
  },
  {
    id: '4',
    wallet: {
      name: 'Tether',
      icon: '₮',
      color: 'bg-teal-500',
      img: '/crypto/tether-usdt-logo.png'
    },
    fileName: 'tether_archive_2019-2020.c.',
    transactionsAdded: 154,
    dateRange: {
      start: 'Apr 1, 2023',
      end: 'Jun 30, 2023'
    }
  }
];

const ImportHistoryModal: React.FC<ImportHistoryModalProps> = ({ isOpen, onClose, walletName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [importType, setImportType] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  if (!isOpen) return null;

  const handleSort = (column: string) => {
    // Handle sorting logic here
    console.log('Sort by:', column);
  };

  const handleDelete = (id: string) => {
    // Handle delete functionality
    console.log('Delete item:', id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-6xl flex flex-col p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-11">Import History</h2>
          <button
            onClick={onClose}
            className="text-gray-500"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 border border-default rounded-xl focus:outline-none"
            />
          </div>

          {/* Import Type Dropdown */}
          <div className="relative">
            <select
              value={importType}
              onChange={(e) => setImportType(e.target.value)}
              className="appearance-none bg-white border border-default rounded-xl px-4 py-3 pr-10 focus:outline-none"
            >
              <option value="All">Import type</option>
              <option value="CSV">CSV</option>
              <option value="Excel">Excel</option>
              <option value="API">API</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-default rounded-xl px-4 py-3 pr-10 focus:outline-none"
            >
              <option value="recent">Sort by recent</option>
              <option value="oldest">Sort by oldest</option>
              <option value="transactions">Sort by transactions</option>
              <option value="wallet">Sort by wallet</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <div className="h-full w-full border-transparent bg-transparent shadow-none">
            <div className="rounded-lg sm:overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left">
                <thead className="bg-table-header dark:bg-gray-800 hidden sm:table-header-group">
                  <tr className="">
                    {['Wallet', 'File Name', 'Transactions Added', 'Date Range', ''].map((head, index) => (
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
                              onClick={() => handleSort(head.toLowerCase().replace(' ', ''))}
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
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="md:px-5 md:py-3 sm:p-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 ${item.wallet.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                            <img src={item.wallet.img} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base text-gray-900 dark:text-gray-100">
                              {item.wallet.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell">
                        <div className="flex flex-col">
                          <span className="font-normal text-base text-gray-900 dark:text-gray-100">
                            {item.fileName}
                          </span>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell">
                        <span className="font-normal text-base text-gray-900 dark:text-gray-100">
                          {item.transactionsAdded} transactions
                        </span>
                      </td>
                      <td className="hidden sm:table-cell">
                        <span className="font-normal text-base text-gray-900 dark:text-gray-100">
                          {item.dateRange.start} → {item.dateRange.end}
                        </span>
                      </td>
                      <td className="hidden sm:table-cell">
                        <button
                          onClick={() => handleDelete(item.id)}
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
  );
};

export default ImportHistoryModal;
