import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Typography } from "@material-tailwind/react";

interface AddRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRuleAdded?: () => void;
}

const AddRuleModal: React.FC<AddRuleModalProps> = ({
  isOpen,
  onClose,
  onRuleAdded
}) => {
  const [ruleName, setRuleName] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedToken, setSelectedToken] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tag, setTag] = useState('');
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const walletOptions = [
    { name: 'Metamask', image: '/crypto/metamask.png' },
    { name: 'Phantom', image: '/crypto/Phantom.png' },
    { name: 'Coinbase', image: '/crypto/coinbase.png' },
    { name: 'Kraken', image: '/crypto/kraken.png' },
    { name: 'Gemini', image: '/crypto/gemini.png' }
  ];
  const tokenOptions = ['BTC', 'ETH', 'SOL', 'USDT', 'USDC', 'ADA', 'DOT'];

  const handleAddRule = () => {
    // Handle add rule logic here
    console.log('Add rule:', { ruleName, selectedWallet, selectedToken, quantity, tag });
    onClose();
    if (onRuleAdded) {
      onRuleAdded();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`relative max-w-md w-full mx-4 rounded-lg shadow-lg overflow-hidden ${
        'bg-white text-gray-900 dark:text-gray-150 dark:bg-gray-800'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <Typography variant="h5" className="text-lg font-semibold text-gray-900 dark:text-gray-150">
            Add rule
          </Typography>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6">
          {/* Introductory Text */}
          <Typography variant="small" className="text-left text-sm mb-6 text-gray-600 dark:text-gray-300">
            Create a rule that automatically applies tagging to specific tokens across your wallets.
          </Typography>

          {/* Rule Name Input */}
          <div className="mb-2">
            <label className="block text-sm mb-2 text-left text-[#4D5050] dark:text-gray-300">
              Rule Name
            </label>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              placeholder="Type rule name"
              className="w-full px-3 py-2 border border-[#E1E3E5] rounded-lg focus:outline-none bg-white text-[#0E201E] placeholder-[#7C7C7C] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Wallet and Token Dropdowns in Same Row */}
          <div className="flex space-x-4 mb-4">
            {/* Wallet Dropdown */}
            <div className="flex-1">
              <label className="block text-sm mb-2 text-left text-[#4D5050] dark:text-gray-300">
                Wallet
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-[#E1E3E5] rounded-lg bg-white text-[#0E201E] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <div className="flex items-center space-x-2">
                    {selectedWallet && (
                      <img 
                        src={walletOptions.find(w => w.name === selectedWallet)?.image} 
                        alt={selectedWallet}
                        className="w-5 h-5 rounded-full"
                      />
                    )}
                    <span className={`text-left ${selectedWallet ? 'text-gray-900 dark:text-gray-150' : 'text-[#7C7C7C]'}`}>
                      {selectedWallet || 'Choose wallet'}
                    </span>
                  </div>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`w-3 h-3 transition-transform ${isWalletDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {isWalletDropdownOpen && (
                  <div className={`absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded-lg shadow-lg py-1 z-50 ${
'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600'
                  }`}>
                    {walletOptions.map((wallet) => (
                      <button
                        key={wallet.name}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center space-x-2"
                        onClick={() => {
                          setSelectedWallet(wallet.name);
                          setIsWalletDropdownOpen(false);
                        }}
                      >
                        <img 
                          src={wallet.image} 
                          alt={wallet.name}
                          className="w-4 h-4 rounded-full"
                        />
                        <span>{wallet.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Token Dropdown */}
            <div className="flex-1">
              <label className="block text-sm mb-2 text-left text-[#4D5050] dark:text-gray-300">
                Token
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsTokenDropdownOpen(!isTokenDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-[#E1E3E5] rounded-lg bg-white text-gray-900 dark:text-gray-150 dark:bg-gray-700 dark:border-gray-600"
                >
                  <span className={`text-left ${selectedToken ? 'text-gray-900 dark:text-gray-150' : 'text-[#7C7C7C]'}`}>
                    {selectedToken || 'Select the token'}
                  </span>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`w-3 h-3 transition-transform ${isTokenDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {isTokenDropdownOpen && (
                  <div className={`absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded-lg shadow-lg py-1 z-50 ${
'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600'
                  }`}>
                    {tokenOptions.map((token) => (
                      <button
                        key={token}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => {
                          setSelectedToken(token);
                          setIsTokenDropdownOpen(false);
                        }}
                      >
                        {token}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <div className="flex">
              <label className="block text-sm mb-2 text-left text-[#4D5050] dark:text-gray-300">
                <span>Quantity (optional)</span>
              </label>
              <svg className="w-4 h-4 mx-1 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
              </svg>
            </div>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Define an exact amount"
              className="w-full px-3 py-2 border border-[#E1E3E5] rounded-lg focus:outline-none bg-white text-[#0E201E] placeholder-[#7C7C7C] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Tag Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-left text-gray-700 dark:text-gray-300">
              Tag
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Start typing tag..."
              className="w-full px-3 py-2 border border-[#E1E3E5] rounded-lg focus:outline-none bg-white text-gray-900 placeholder-[#7C7C7C] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-250 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 pb-6">
          <button
            onClick={onClose}
              className="px-4 py-2 font-medium text-[#7C7C7C] dark:text-gray-300 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleAddRule}
            className={`px-4 py-2 rounded-lg font-medium ${
              ruleName && selectedWallet && selectedToken
                ? 'bg-[#90C853] text-[#0E201E] hover:bg-[#7AB342]'
                : 'bg-[#E1E3E5] text-[#7C7C7C] cursor-not-allowed'
            }`}
            disabled={!ruleName || !selectedWallet || !selectedToken}
          >
            Add rule
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRuleModal;
