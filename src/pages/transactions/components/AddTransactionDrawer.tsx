import React, { useState } from 'react';
import { Input } from "@material-tailwind/react";
import DatePicker from '../../../components/DatePicker';
import Dropdown from '../../../components/UI/Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CrossIcon from '../../../components/Icons/CrossIcon';


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

  const [dateValue, setDateValue] = useState(null as any);

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
      <div className="fixed left-0 top-0 h-full w-96 bg-white dark:bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-h5 font-bold text-gray-11 dark:text-gray-100">
                Add transaction
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 dark:text-gray-400"
              >
                <CrossIcon
                  height={20}
                  width={20}
                />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-5">
              <div className='space-y-3'>
                {/* Transaction Type */}
                <div className='text-left'>
                  <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                    Transaction type
                  </label>
                  <div className="mt-1.5">
                    <Dropdown
                      options={['Deposit', 'Withdrawal', 'Buy', 'Sell', 'Swap', 'Transfer']}
                      onSelect={setTransactionType}
                      defaultValue="Deposit"
                      className="w-full"
                      inputClassName='dark:bg-transparent'
                    />
                  </div>
                </div>

                {/* Date (UTC) */}
                <div className='text-left'>
                  <div className="items-center gap-3">
                    <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                      Date (UTC)
                    </label>
                    {/* Date input */}
                    <div className='mt-1.5'>
                      <DatePicker
                        value={dateValue}
                        onChange={setDateValue}
                        placeholder="Set date"
                        className='dark:bg-transparent'
                        datePickerClass=''
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Horizontal Separator */}
              <div className="border-t border-default dark:border-gray-700"></div>
              
              <div className='space-y-3'>
                <div className='text-left'>
                  <label className="text-left text-base font-semibold text-gray-900 dark:text-gray-100">
                    Receive
                  </label>
                </div>
                {/* Receive Section */}
                <div className='text-left'>
                  {/* Wallet */}
                  <div className="mt-1.5">
                    <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                      Wallet
                    </label>
                    <div className="mt-1.5">
                      <Dropdown
                        options={['Bitcoin Wallet', 'Ethereum', 'MetaMask', 'Coinbase']}
                        onSelect={setSelectedWallet}
                        defaultValue="Select wallet"
                        className="w-full"
                        inputClassName='dark:bg-transparent'
                      />
                    </div>
                  </div>

                  {/* Number of coins */}
                  <div className="mt-4">
                    <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                      Number of coins
                    </label>
                    <div className="mt-1.5">
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0"
                          className={`w-full rounded-lg text-sm px-4 py-3 font-semibold border-default bg-transparent text-gray-900 focus:outline-none
                            dark:bg-transparent dark:border-[#4D5050]  dark:text-gray-250`}
                        />
                        <button
                          onClick={() =>
                            setShowCoinDropdown(!showCoinDropdown)
                          }
                          className={`absolute right-0 top-0 h-full px-2 rounded-l-none rounded-r-lg border-r border-t border-b border-default text-gray-600 bg-white focus:outline-none
                            dark:bg-transparent dark:border-[#4D5050]`}
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
              </div>
              
              {/* Horizontal Separator */}
              <div className="border-t border-default dark:border-gray-700"></div>
              
              <div className='space-y-3'>
                {/* Tag Fields */}
                <div className="text-left">
                  <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                    Tag
                  </label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type tag"
                      className="flex-1 text-sm px-4 py-3 border border-default dark:border-gray-700 rounded-lg 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                    />
                    <button className="p-3 border border-default dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <CrossIcon
                        height={20}
                        width={20}
                      />
                    </button>
                  </div>
                </div>

                <div className="text-left">
                  <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                    Tag
                  </label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type tag"
                      className="flex-1 text-sm px-4 py-3 border border-default dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                    />
                    <button className="p-3 border border-default dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <CrossIcon
                        height={20}
                        width={20}
                      />
                    </button>
                  </div>
                </div>

                {/* Transaction Hash */}
                <div className="text-left">
                  <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                    Transaction Hash
                  </label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type Hash"
                      className="flex-1 text-sm px-4 py-3 border border-default dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                    />
                    <button className="p-3 border border-default dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <CrossIcon
                        height={20}
                        width={20}
                      />
                    </button>
                  </div>
                </div>

                  {/* Transaction Destination */}
                  <div className="text-left">
                    <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                      Transaction Destination
                    </label>
                    <div className="mt-1.5 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type Destination"
                        className="flex-1 text-sm px-4 py-3 border border-default dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                      />
                      <button className="p-3 border border-default dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600">
                        <CrossIcon
                          height={20}
                          width={20}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-left">
                    <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                      Description
                    </label>
                    <div className="mt-1.5 flex items-start gap-2">
                      <textarea
                        placeholder="Ex: sent some crypto to..."
                        rows={3}
                        className="flex-1 text-sm px-4 py-3 border border-default dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                      />
                      <button className="p-3 border border-default dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600">
                        <CrossIcon
                          height={20}
                          width={20}
                        />
                      </button>
                    </div>
                  </div>

                 {/* Additional Fields/Tags */}
                 <div className="space-y-3">
                   <div className="flex flex-wrap gap-2">
                     {additionalTags.map((tag, index) => (
                       <button 
                         key={index}
                         className="flex items-center gap-3 px-3 py-1.5 rounded-full text-sm 
                          border border-default dark:border-transparent dark:bg-gray-900 text-gray-900 dark:text-gray-100 bg-gray-100"
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
          <div className="p-6 pt-4">
            <button
              onClick={handleSave}
              className={`w-full px-5 py-3 rounded-xl font-medium transition-colors ${
                dateValue && selectedWallet 
                  ? 'bg-green-500 text-gray-900 hover:bg-green-500' 
                  : 'bg-default dark:bg-gray-700 text-gray-400 dark:text-gray-300 cursor-not-allowed'
              }`}
              disabled={!dateValue || !selectedWallet}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTransactionDrawer;
