import React, { useState } from 'react';
import { Typography } from "@material-tailwind/react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface SetHistoricalPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlatforms: string[];
  isDarkMode: boolean;
  onSaveSuccess?: () => void;
}

const SetHistoricalPriceModal: React.FC<SetHistoricalPriceModalProps> = ({
  isOpen,
  onClose,
  selectedPlatforms,
  isDarkMode,
  onSaveSuccess
}) => {
  const [historicalPrice, setHistoricalPrice] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  if (!isOpen) return null;

  const platformNames = selectedPlatforms.map(id => {
    const platformMap: { [key: string]: string } = {
      'coinbase': 'Coinbase',
      'kraken': 'Kraken',
      'exodus': 'Exodus',
      'trezor': 'Trezor',
      'zengo': 'Zengo',
      'gemini': 'Gemini',
      'cryptocom': 'Crypto.com',
      'oak': 'OAK',
      'bybit': 'Bybit',
      'bidget': 'Bidget'
    };
    return platformMap[id] || id;
  });

  const platformText = platformNames.length === 1 
    ? platformNames[0]
    : platformNames.length === 2
    ? `${platformNames[0]} and ${platformNames[1]}`
    : `${platformNames.slice(0, -1).join(', ')}, and ${platformNames[platformNames.length - 1]}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`relative max-w-md w-full mx-4 rounded-lg shadow-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <Typography className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Set historical price
          </Typography>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6">
          {/* Introductory Text */}
          <Typography variant="small" className={`text-base text-left mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Fill in the details for the missing price on {platformText}.
          </Typography>

          {/* Historical Price Input */}
          <div className="mb-4">
            <label className={`block text-sm text-left font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Historical Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="text"
                value={historicalPrice}
                onChange={(e) => setHistoricalPrice(e.target.value)}
                placeholder="127.5"
                className={`w-full pl-8 pr-3 py-2 border border-[#E1E3E5] rounded-lg focus:outline-none ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-900 placeholder-[#8C8E90]'
                }`}
              />
            </div>
          </div>

          {/* Date Input */}
          <div className="mb-6">
            <label className={`block text-left text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Date
            </label>
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className={`w-full px-3 py-2 border border-[#E1E3E5] rounded-lg focus:outline-none flex items-center justify-between cursor-pointer ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white text-gray-900'
                }`}
                placeholderText="When custom price will be added"
                dateFormat="MM/dd/yyyy"
                wrapperClassName="w-full"
                popperPlacement="bottom-start"
                customInput={
                  <div className="flex items-center justify-between w-full">
                    <svg className="text-[#7C7C7C] size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
                     </svg>

                    <span className="flex-1 text-left ml-3">
                      {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'MM/DD/YYYY'}
                    </span>
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className={`px-4 py-2 font-medium ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white' 
                : 'text-[#7C7C7C]'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (historicalPrice && selectedDate) {
                onClose();
                if (onSaveSuccess) {
                  onSaveSuccess();
                }
              }
            }}
            className={`px-4 py-2 rounded-lg font-medium ${
              historicalPrice && selectedDate
                ? 'bg-[#90C853] text-[#0E201E]'
                : 'bg-[#E1E3E5] text-[#8C8E90] cursor-not-allowed'
            }`}
            disabled={!historicalPrice || !selectedDate}
          >
            Save price
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetHistoricalPriceModal;
