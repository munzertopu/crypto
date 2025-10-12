import React, { useState } from 'react';

interface AddTransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionDrawer: React.FC<AddTransactionDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [transactionType, setTransactionType] = useState('');

  const handleSave = () => {
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
            <div className="space-y-6">
              {/* Transaction Type */}
              <div className='text-left'>
                <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Transaction type
                </label>
                <div className="relative mt-1.5">
                  <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="w-full text-sm px-4 py-3 border border-default dark:border-gray-600 rounded-lg bg-white dark:bg-[#0E201E] text-gray-900 dark:text-white focus:outline-none focus:outline-none focus:border-transparent appearance-none"
                  >
                    <option value="">Select type</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                    <option value="swap">Swap</option>
                    <option value="transfer">Transfer</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
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
