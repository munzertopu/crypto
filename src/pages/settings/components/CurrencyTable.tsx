import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SetHistoricalPriceModal from './SetHistoricalPriceModal';
import {
  Card,
  Typography,
  CardBody,
  Avatar,
} from "@material-tailwind/react";

interface Currency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  customPrice: string;
  date: string;
  gainLoss: string;
}

interface Wallet {
  id: string;
  name: string;
  icon: string;
  currencies: Currency[];
}

interface CurrencyTableProps {
  selectedPlatforms: string[];
  onBack: () => void;
  showNotification: () => void;
}

const CurrencyTable: React.FC<CurrencyTableProps> = ({
  selectedPlatforms,
  onBack,
  showNotification
}) => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [isAddPriceModalOpen, setIsAddPriceModalOpen] = useState(false);

  const TABLE_HEAD = ["select", "Currency", "Custom price", "Date", ""];

  // Mock data for wallets and their currencies
  const wallets: Wallet[] = [
    {
      id: 'kraken',
      name: 'Kraken',
      icon: 'crypto/kraken.png',
      currencies: [
        { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: 'crypto/bitcoin.png', customPrice: '125', date: 'Feb 7, 2025', gainLoss: '+296,48 USDT' },
        { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'crypto/ethereum.png', customPrice: '523', date: 'Feb 7, 2025', gainLoss: '+156,23 USDT' },
        { id: 'sol', name: 'Solana', symbol: 'SOL', icon: 'crypto/solana.png', customPrice: '87', date: 'Nov 27, 2024', gainLoss: '+89,12 USDT' }
      ]
    },
    {
      id: 'coinbase',
      name: 'Coinbase',
      icon: 'crypto/coinbase.png',
      currencies: [
        { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: 'crypto/bitcoin.png', customPrice: '125', date: 'Feb 7, 2025', gainLoss: '+296,48 USDT' }
      ]
    },
    {
      id: 'gemini',
      name: 'Gemini',
      icon: 'crypto/gemini.png',
      currencies: [
        { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'crypto/ethereum.png', customPrice: '523', date: 'Feb 7, 2025', gainLoss: '+156,23 USDT' },
        { id: 'sol', name: 'Solana', symbol: 'SOL', icon: 'crypto/solana.png', customPrice: '87', date: 'Nov 27, 2024', gainLoss: '+89,12 USDT' }
      ]
    }
  ];

  const handleSelectAll = () => {
    if (selectedCurrencies.length === getAllCurrencyIds().length) {
      setSelectedCurrencies([]);
    } else {
      setSelectedCurrencies(getAllCurrencyIds());
    }
  };

  const handleSelectCurrency = (currencyId: string) => {
    setSelectedCurrencies(prev => 
      prev.includes(currencyId) 
        ? prev.filter(id => id !== currencyId)
        : [...prev, currencyId]
    );
  };

  const filteredWallets = wallets.filter(wallet => selectedPlatforms.includes(wallet.id));

  const getAllCurrencyIds = () => {
    return filteredWallets.flatMap(wallet => 
      wallet.currencies.map(currency => `${wallet.id}-${currency.id}`)
    );
  };

  const isAllSelected = selectedCurrencies.length === getAllCurrencyIds().length && getAllCurrencyIds().length > 0;
  const isIndeterminate = selectedCurrencies.length > 0 && selectedCurrencies.length < getAllCurrencyIds().length;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler for items per page dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Click outside handler for tag dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target as Node)) {
        setIsTagDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddPriceClick = () => {
    setIsAddPriceModalOpen(true);
  };

  const handleCloseAddPriceModal = () => {
    setIsAddPriceModalOpen(false);
  };

  const handleSaveSuccess = () => {
    showNotification();
    onBack();
  };

  return (
    <div>
        {/* Header */}
        <div className="flex items-center justify-between pt-6">
          <div>
            <Typography variant="h5" className="text-left font-bold text-gray-900 dark:text-gray-250">
              Custom price
            </Typography>
            <Typography variant="small" className="mt-1 text-sm text-left text-gray-600 dark:text-gray-300">
              Use custom prices to fix missing or incorrect market values for your transactions.
            </Typography>
            <Typography variant="small" className="mt-1 text-sm text-left text-gray-600 dark:text-gray-300">
              This helps ensure your tax calculations are accurate.
            </Typography>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleAddPriceClick}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className='text-sm'>Add price</span>
            </button>
              <button className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="pt-6">
          <Card className={`h-full w-full border-transparent bg-transparent`}>
            <CardBody className="px-0">
              <table className="w-full min-w-max table-auto text-left">
                <thead className="bg-[#F3F5F7] dark:bg-[#2F3232]">
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className={`cursor-pointer p-4 ${index === 0 ? 'rounded-l-md' : ''} ${index === TABLE_HEAD.length - 1 ? 'rounded-r-md' : ''}`}
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
                              aria-label="Select all currencies"
                            />
                          </div>
                        ) : (
                          <div
                            className="flex text-lg items-center justify-between gap-2 font-normal leading-none text-[#666868] dark:text-[#B6B8BA]"
                          >
                            {head}{" "}
                            {head !== "select" && head !== "" && (
                              <div className="flex flex-col" role="button" aria-label={`Sort by ${head}`}>
                                <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3 text-[#7C7C7C]" aria-hidden="true" />
                                <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3 text-[#7C7C7C]" aria-hidden="true" />
                              </div>
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredWallets.map((wallet) => (
                    <React.Fragment key={wallet.id}>
                      {/* Currency Rows */}
                      {wallet.currencies.map((currency) => {
                        const currencyId = `${wallet.id}-${currency.id}`;
                        return (
                          <tr key={currencyId} className="border-gray-200 dark:border-gray-600">
                            <td className='py-4'>
                              <div className="flex items-center justify-center">
                                <input
                                  type="checkbox"
                                  checked={selectedCurrencies.includes(currencyId)}
                                  onChange={() => handleSelectCurrency(currencyId)}
                                  className={`w-4 h-4 rounded-lg accent-green-600 focus:outline-none`}
                                  aria-label={`Select currency ${currency.name}`}
                                />
                              </div>
                            </td>
                            <td className='py-4'>
                              <div className="flex items-center gap-3">
                                <Avatar 
                                  src={currency.icon} 
                                  alt={currency.name} 
                                  size="sm"
                                  className="h-5 w-5"
                                />
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    className="text-base font-normal text-[#0E201E] dark:text-[#F3F5F7]"
                                  >
                                    {currency.name}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    className="text-sm font-normal text-[#666868] dark:text-[#B6B8BA]"
                                  >
                                    {currency.symbol}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className='py-4'>
                              <Typography
                                variant="small"
                                className={`text-base font-normal ${currency.gainLoss.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                              >
                                {currency.gainLoss}
                              </Typography>
                            </td>
                            <td className='py-4'>
                              <Typography
                                variant="small"
                                className="text-base font-normal text-[#666868] dark:text-[#B6B8BA]"
                              >
                                {currency.date}
                              </Typography>
                            </td>
                            <td className='py-4'>
                              <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="w-4 h-4 text-[#7C7C7C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>

        {/* Add Price Modal */}
        <SetHistoricalPriceModal
          isOpen={isAddPriceModalOpen}
          onClose={handleCloseAddPriceModal}
          selectedPlatforms={selectedPlatforms}
          onSaveSuccess={handleSaveSuccess}
        />

        {/* Save Changes Button */}
        <div className="flex justify-end pt-6">
          <button
            onClick={() => {
              // Handle save changes logic here
              console.log('Save changes clicked');
            }}
            className="bg-[#90C853] text-[#0E201E] px-6 py-2 border-0 rounded-lg font-medium hover:bg-[#7AB342] transition-colors"
          >
            Save changes
          </button>
        </div>
     </div>
   );
 };

export default CurrencyTable;
