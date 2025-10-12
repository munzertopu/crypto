import React, { useState } from 'react';
import { Input } from "@material-tailwind/react";
import Dropdown from './Dropdown';
import CalendarIcon from '../../utils/icons/CalendarIcon';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface AddTransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionDrawer: React.FC<AddTransactionDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [transactionType, setTransactionType] = useState('Deposit');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [numberOfCoins, setNumberOfCoins] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showCoinDropdown, setShowCoinDropdown] = useState(false);
  const [coinCurrency, setCoinCurrency] = useState("USD");

  // Additional tags data
  const additionalTags = [
    'TxHash',
    'TxSrc', 
    'TxDest',
    'Description',
    'Tag'
  ];

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving transaction:', {
      transactionType,
      selectedDate,
      selectedWallet,
      numberOfCoins,
      selectedCurrency
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed left-0 top-0 h-full w-96 bg-white dark:bg-[#0E201E] z-50 transform transition-transform duration-300 ease-in-out shadow-xl">
        <div className="flex flex-col h-full p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-h5 font-bold text-gray-11 dark:text-white">
              Add transaction
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="space-y-5">
              <div className='space-y-3'>
              {/* Transaction Type */}
                <div className='text-left'>
                  <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Transaction type
                  </label>
                  <div className="mt-1.5">
                    <Dropdown
                      options={['Deposit', 'Withdrawal', 'Buy', 'Sell', 'Swap', 'Transfer']}
                      onSelect={setTransactionType}
                      defaultValue="Deposit"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Date (UTC) */}
                <div className='text-left'>
                  <label className="text-left text-sm font-medium text-gray-900 dark:text-gray-300">
                    Date (UTC)
                  </label>
                  <div className="mt-1.5">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon 
                          width={16}
                          height={16} 
                          strokeColor="currentColor" 
                          className="text-gray-500" 
                        />
                      </div>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-default dark:border-gray-600 rounded-lg bg-white dark:bg-[#0E201E] text-gray-900 dark:text-white focus:outline-none cursor-pointer"
                        style={{
                          colorScheme: 'light'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Horizontal Separator */}
              <div className="border-t border-default dark:border-gray-700"></div>
              
              <div className='space-y-3'>
                <div className='text-left'>
                  <label className="text-left text-base font-semibold text-gray-900 dark:text-white">
                    Receive
                  </label>
                </div>
                {/* Receive Section */}
                <div className='text-left'>
                  {/* Wallet */}
                  <div className="mt-1.5">
                    <label className="text-left text-sm font-medium text-gray-900 dark:text-gray-300">
                      Wallet
                    </label>
                    <div className="mt-1.5">
                      <Dropdown
                        options={['Bitcoin Wallet', 'Ethereum', 'MetaMask', 'Coinbase']}
                        onSelect={setSelectedWallet}
                        defaultValue="Select wallet"
                        className="w-full"
                      />
                    </div>
                  </div>

                   {/* Number of coins */}
                   <div className="mt-4">
                     <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                       Number of coins
                     </label>
                     <div className="mt-1.5">
                       <div className="relative">
                        <Input
                          type="number"
                          placeholder="0"
                          className={`w-full rounded-lg text-sm font-semibold border-default bg-transparent text-gray-900 focus:outline-none
                            dark:bg-transparent dark:border-[#4D5050]  dark:text-gray-250`}
                        />
                        <button
                          onClick={() =>
                            setShowCoinDropdown(!showCoinDropdown)
                          }
                          className={`absolute right-0 top-0 h-full px-2 rounded-l-none rounded-r-lg border-r border-t border-b border-default text-gray-600 bg-white focus:outline-none
                            dark:bg-[#0E201E] dark:border-[#4D5050]`}
                        >
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium">{coinCurrency}</span>
                            <FontAwesomeIcon icon={faChevronDown} className="w-2 h-2" />
                          </div>
                        </button>

                        {/* Currency Dropdown */}
                        {showCoinDropdown && (
                          <div
                            className={`absolute top-full right-0 mt-1 rounded-lg border shadow-lg z-20 bg-white border-default
                              dark:bg-[#0E201E]`}
                          >
                            <div className="py-1 px-2">
                              {["USD", "EUR", "USDT"].map((currency) => (
                                <button
                                  key={currency}
                                  onClick={() => {
                                    setCoinCurrency(currency);
                                    setShowCoinDropdown(false);
                                  }}
                                  className={`w-full px-3 py-1 text-left text-xs rounded-md ${
                                    coinCurrency === currency
                                      ? "bg-gray-100 dark:bg-[#0E201E] dark:text-[#A1A3A5]"
                                      : "dark:bg-[#0E201E] dark:text-[#A1A3A5]"
                                  }`}
                                >
                                  {currency}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                     </div>
                   </div>
                </div>

                 {/* Additional Fields/Tags */}
                 <div className="space-y-3">
                   <div className="flex flex-wrap gap-2">
                     {additionalTags.map((tag, index) => (
                       <button 
                         key={index}
                         className="flex items-center gap-3 px-3 py-1.5 bg-gray-100 border border-default dark:border-gray-600 rounded-full text-sm text-gray-900 dark:text-gray-400"
                       >
                         <span className="text-xs">+</span>
                         <span>{tag}</span>
                       </button>
                     ))}
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <button
            onClick={handleSave}
            className="w-full px-5 py-3 bg-default text-gray-400 rounded-xl font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTransactionDrawer;
