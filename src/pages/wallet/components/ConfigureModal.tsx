import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface ConfigureModalProps {
  isOpen: boolean;
  onClose: () => void;
  platformName: string;
  isDarkMode: boolean;
  onConfigureSuccess?: () => void;
}

const ConfigureModal: React.FC<ConfigureModalProps> = ({
  isOpen,
  onClose,
  platformName,
  isDarkMode,
  onConfigureSuccess
}) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>(['BNB', 'Matic']);

  const blockchainOptions = ['Eth', 'BNB', 'ARB', 'Matic'];

  const isWalletAddressValid = walletAddress.trim().length > 0;

  const handleBlockchainToggle = (blockchain: string) => {
    setSelectedBlockchains(prev => 
      prev.includes(blockchain)
        ? prev.filter(b => b !== blockchain)
        : [...prev, blockchain]
    );
  };

  const getDisplayText = () => {
    if (selectedBlockchains.length === 0) return 'Select blockchains';
    return selectedBlockchains.join(', ');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white text-gray-900 rounded-2xl p-10 w-full max-w-2xl mx-4
        dark:bg-[#0E201E]`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl text-left font-bold mb-2
              dark:text-[#CDCFD1]">Configure {platformName} address</h2>
            <p className={`text-xl text-left 'text-gray-600
              dark:text-[#CDCFD1]`}>
              Paste your wallet address below to configure
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full dark:text-[#CDCFD1]`}
            aria-label="Close configure modal"
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Wallet Address Section */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <label className="text-lg font-medium
              dark:text-[#CDCFD1]">Wallet Address</label>
            <svg className="w-5 h-5 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
            </svg>
          </div>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl text-2xl bg-white border-gray-300 text-gray-900 focus:outline-none
              dark:bg-transparent dark:border-[#4D5050] dark:text-white `}
            placeholder="Enter wallet address"
          />
        </div>

        {/* Blockchains Section - Only show when wallet address is entered */}
        {isWalletAddressValid && (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="text-lg font-medium">Blockchains</label>
              <svg className="w-5 h-5 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
              </svg>
            </div>
            <div className="relative">
              <div
                className={`w-full px-3 py-2 border-2 text-xl rounded-lg cursor-pointer flex items-center justify-between bg-white text-gray-900 focus:outline-none
                  dark:bg-transparent dark:text-white dark:border-[#4D5050]`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                role="button"
                aria-label="Select blockchains"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <span className={`text-left flex-1 ${selectedBlockchains.length === 0 ? 'text-gray-500' : ''}`}>
                  {getDisplayText()}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Dropdown Options */}
              {isDropdownOpen && (
                <div className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 bg-white border-gray-200
                  dark:bg-[#0E201E] dark:border-[#4D5050] dark:text-[#F3F5F7]`}>
                  {blockchainOptions.map((blockchain) => (
                    <div
                      key={blockchain}
                      className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50
                        dark:hover:bg-[#2F3232]`}
                      onClick={() => handleBlockchainToggle(blockchain)}
                    >
                      <div className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                        selectedBlockchains.includes(blockchain)
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-400'
                      }`}>
                        {selectedBlockchains.includes(blockchain) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm">{blockchain}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className={`text-xl font-medium text-gray-500
              dark:text-[#A1A3A5]`}
            aria-label="Cancel wallet configuration"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (isWalletAddressValid && onConfigureSuccess) {
                onConfigureSuccess();
              }
              onClose();
            }}
            disabled={!isWalletAddressValid}
            className={`px-6 py-2 rounded-lg text-xl font-medium transition-colors text-[#0E201E] ${
              isWalletAddressValid
                ? 'bg-[#90C853] cursor-pointer'
                : 'bg-gray-300 dark:bg-[#2F3232] dark:text-[#8C8E90] cursor-not-allowed'
            }`}
            aria-label="Configure wallet configuration"
          >
            Configure
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigureModal;
