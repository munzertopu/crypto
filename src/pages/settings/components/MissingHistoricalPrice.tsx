import React, { useState } from 'react';
import { Typography } from "@material-tailwind/react";

interface Platform {
  id: string;
  name: string;
  icon: string;
  missingPrices: number;
  totalPrices: number;
}

interface MissingHistoricalPriceProps {
  onEditMissingPrice: (selectedPlatforms: string[]) => void;
}

const MissingHistoricalPrice: React.FC<MissingHistoricalPriceProps> = ({ 
  onEditMissingPrice 
}) => {
  const [editMultiplePrices, setEditMultiplePrices] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms: Platform[] = [
    { id: 'coinbase', name: 'Coinbase', icon: 'crypto/coinbase.png', missingPrices: 0, totalPrices: 1 },
    { id: 'kraken', name: 'Kraken', icon: 'crypto/kraken.png', missingPrices: 0, totalPrices: 3 },
    { id: 'exodus', name: 'Exodus', icon: 'crypto/exodus.png', missingPrices: 1, totalPrices: 2 },
    { id: 'trezor', name: 'Trezor', icon: 'crypto/trezor.png', missingPrices: 0, totalPrices: 1 },
    { id: 'zengo', name: 'Zengo', icon: 'crypto/zengo.png', missingPrices: 0, totalPrices: 1 },
    { id: 'gemini', name: 'Gemini', icon: 'crypto/gemini.png', missingPrices: 1, totalPrices: 2 },
    { id: 'cryptocom', name: 'Crypto.com', icon: 'crypto/crypto.png', missingPrices: 0, totalPrices: 3 },
    { id: 'oak', name: 'OAK', icon: 'crypto/bittrex.png', missingPrices: 0, totalPrices: 1 },
    { id: 'bybit', name: 'Bybit', icon: 'crypto/tether-usdt-logo.png', missingPrices: 0, totalPrices: 3 },
    { id: 'bidget', name: 'Bidget', icon: 'crypto/metamask.png', missingPrices: 1, totalPrices: 2 }
  ];

  const handleEditMultiplePricesToggle = () => {
    setEditMultiplePrices(!editMultiplePrices);
    if (!editMultiplePrices) {
      setSelectedPlatforms([]); // Clear selections when turning off edit mode
    }
  };

  const handlePlatformSelect = (platformId: string) => {
    if (!editMultiplePrices) return;
    
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(id => id !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
  };

  const handleEditMissingPrice = () => {
    onEditMissingPrice(selectedPlatforms);
  };

  return (
    <div className='pb-8'>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography variant="h4" className={`font-bold text-lg text-left mb-2 text-gray-900 dark:text-gray-150`}>
            Missing historical price
          </Typography>
          <Typography variant="small" className={`text-left text-sm text-gray-700 dark:text-gray-400`}>
            We detected missing prices for your wallets
          </Typography>
        </div>
        
        {/* Edit Multiple Prices Toggle */}
        <div className="flex items-center space-x-3">
          <span className={`text-sm font-medium text-gray-900 dark:text-gray-150`}>
            Edit multiple prices
          </span>
          <button
            onClick={handleEditMultiplePricesToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              editMultiplePrices ? 'bg-[#90C853]' : 'bg-[#CDCFD1]'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                editMultiplePrices ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      
      {/* Platforms Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            onClick={() => handlePlatformSelect(platform.id)}
            className={`relative flex flex-col items-center p-4 rounded-lg cursor-pointer border transition-all min-w-0}
            ${editMultiplePrices ? 
              selectedPlatforms.includes(platform.id) && editMultiplePrices
                ? 'border-[#90C853]'
                : 'border-[#E1E3E5]'
              : 
              "border-white"}
            `}
          >
            {/* Checkbox - Only show when edit mode is on */}
            {editMultiplePrices && (
              <div className="absolute top-2 right-2">
                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                  selectedPlatforms.includes(platform.id)
                    ? 'border-[#90C853] bg-[#90C853]'
                    : 'border-default'
                }`}>
                  {selectedPlatforms.includes(platform.id) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            )}
            
            {/* Platform Icon */}
            <img src={platform.icon} className='w-16 h-16 flex-shrink-0'/>
            
            {/* Platform Name */}
            <Typography variant="small" className={`font-medium text-center mt-2 mb-2 w-full truncate ${
              'text-gray-900 dark:text-gray-150'
            }`}>
              {platform.name}
            </Typography>
            
            {/* Missing Prices Counter */}
            <div className={`px-3 py-1 rounded-full text-xs font-medium border-[#E1E3E5] bg-[#F3F5F7] flex-shrink-0`}>
              {platform.missingPrices}/{platform.totalPrices}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {editMultiplePrices && selectedPlatforms.length > 0 && (
        <div className="flex justify-end items-center pt-6 border-gray-200">
          <button
            onClick={handleEditMissingPrice}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedPlatforms.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#90C853] text-gray-900 dark:text-gray-150 hover:bg-[#7AB342]'
            }`}
          >
            Edit missing price
          </button>
        </div>
      )}
    </div>
  );
};

export default MissingHistoricalPrice;
