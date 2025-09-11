import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ConfigureModalProps {
  isOpen: boolean;
  onClose: () => void;
  platformName: string;
  isDarkMode: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  onConfigureSuccess?: () => void;
  setIsWalletAddressValid?: (isValid: boolean) => void;
}

const WalletConfigureForm: React.FC<ConfigureModalProps> = ({
  isOpen,
  onClose,
  platformName,
  onConfigureSuccess,
  showHeader = true,
  showFooter = true,
  setIsWalletAddressValid,
}) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);
  const blockchainOptions = ["Eth", "BNB", "ARB", "Matic"];

  const isWalletAddressValid = walletAddress.trim().length > 0;
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isDropdownOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // If not enough space below, open upward
      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [isDropdownOpen]);
  useEffect(() => {
    if (setIsWalletAddressValid) {
      setIsWalletAddressValid(isWalletAddressValid);
    }
  }, [isWalletAddressValid, setIsWalletAddressValid, walletAddress]);

  const handleBlockchainToggle = (blockchain: string) => {
    setSelectedBlockchains((prev) =>
      prev.includes(blockchain)
        ? prev.filter((b) => b !== blockchain)
        : [...prev, blockchain]
    );
  };

  const getDisplayText = () => {
    if (selectedBlockchains.length === 0) return "Select blockchains";
    return selectedBlockchains.join(", ");
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedBlockchains([]);
      setWalletAddress("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`bg-white text-gray-900 rounded-2xl sm:p-10 w-full sm:max-w-2xl
        dark:bg-[#0E201E]`}
    >
      {/* Header */}
      {showHeader && (
        <div className="flex items-start justify-between mb-6 md:mb-1.5">
          <div>
            <h2
              className="text-h3 text-left font-bold mb-2 md:mb-0
              dark:text-[#CDCFD1]"
            >
              Configure {platformName} address
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 md:p-0 rounded-full dark:text-[#CDCFD1]`}
            aria-label="Close configure modal"
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="w-4 h-4"
              aria-hidden="true"
            />
          </button>
        </div>
      )}
      <p
        className={`text-sm md:text-base text-left text-gray-700
              dark:text-[#CDCFD1]`}
      >
        Paste your wallet address below to configure
      </p>

      {/* Wallet Address Section */}
      <div className="w-full mb-3  sm:mb-6 pt-5 sm:pt-0 md:pt-6">
        <div className="flex items-center justify-start md:mb-2 gap-1">
          <label
            className="text-sm md:text-sm font-medium text-gray-800
              dark:text-[#CDCFD1] "
          >
            Wallet Address
          </label>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99967 14.6666C11.6663 14.6666 14.6663 11.6666 14.6663 7.99992C14.6663 4.33325 11.6663 1.33325 7.99967 1.33325C4.33301 1.33325 1.33301 4.33325 1.33301 7.99992C1.33301 11.6666 4.33301 14.6666 7.99967 14.6666Z"
              stroke="#7C7C7C"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 5.33325V8.66659"
              stroke="#7C7C7C"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.99609 10.6667H8.00208"
              stroke="#7C7C7C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className={`w-full mt-1.5 sm:mt-0 px-4 py-3 border rounded-[12px] text-base bg-white border-gray-150 text-gray-900 focus:outline-none
              dark:bg-transparent dark:border-[#4D5050] dark:text-white `}
          placeholder="Enter wallet address"
        />
      </div>

      {/* Blockchains Section - Only show when wallet address is entered */}
      {isWalletAddressValid && (
        <div className="mb-6">
          <div className="flex items-center justify-start md:mb-2 gap-1">
            <label
              className="text-sm md:text-sm font-medium text-gray-800
              dark:text-[#CDCFD1] "
            >
              Blockchains
            </label>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99967 14.6666C11.6663 14.6666 14.6663 11.6666 14.6663 7.99992C14.6663 4.33325 11.6663 1.33325 7.99967 1.33325C4.33301 1.33325 1.33301 4.33325 1.33301 7.99992C1.33301 11.6666 4.33301 14.6666 7.99967 14.6666Z"
                stroke="#7C7C7C"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 5.33325V8.66659"
                stroke="#7C7C7C"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.99609 10.6667H8.00208"
                stroke="#7C7C7C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div className="relative" ref={containerRef}>
            <div
              className={`w-full px-4 mt-1.5 sm:mt-0 py-3 border-2 rounded-lg cursor-pointer flex items-center justify-between 
                bg-white text-gray-900 dark:bg-transparent dark:text-white dark:border-[#4D5050] ${
                isDropdownOpen ? "border-[#E3F3C7B3]" : "border-gray-150"
              } ${
                openUpward ? "bottom-full mb-1" : "top-full mt-1"
              } max-h-60 overflow-y-auto z-50`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              role="button"
              aria-label="Select blockchains"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <span
                className={`text-left flex-1 ${
                  selectedBlockchains.length === 0 ? "text-gray-500" : ""
                }`}
              >
                {getDisplayText()}
              </span>
              <svg
                className={`w-4 h-4 transition-transform flex-shrink-0 text-gray-500 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {isDropdownOpen && (
              <div
                className={`absolute left-0 right-0 border rounded-lg shadow-lg z-10 bg-white border-gray-150 dark:bg-[#0E201E] dark:border-[#4D5050] dark:text-[#F3F5F7] ${
                  openUpward ? "bottom-full mb-1" : "top-full mt-1"
                }`}
              >
                {blockchainOptions.map((blockchain) => (
                  <div
                    key={blockchain}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2F3232]"
                    onClick={() => handleBlockchainToggle(blockchain)}
                  >
                    <div
                      className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                        selectedBlockchains.includes(blockchain)
                          ? "bg-green-500 border-green-500"
                          : "border-gray-150"
                      }`}
                    >
                      {selectedBlockchains.includes(blockchain) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-900">{blockchain}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {showFooter && (
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className={`text-base font-medium text-gray-500
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
            className={`px-6 py-2 rounded-lg text-base font-medium transition-colors text-[#0E201E] ${
              isWalletAddressValid
                ? "bg-[#90C853] cursor-pointer"
                : "bg-default dark:bg-[#2F3232] dark:text-[#8C8E90] cursor-not-allowed"
            }`}
            aria-label="Configure wallet configuration"
          >
            Configure
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConfigureForm;
