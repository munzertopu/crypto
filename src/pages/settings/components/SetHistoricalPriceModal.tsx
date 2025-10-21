import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useScreenSize from "../../../hooks/useScreenSize";

interface SetHistoricalPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlatforms: string[];
  onSaveSuccess?: () => void;
}

const SetHistoricalPriceModal: React.FC<SetHistoricalPriceModalProps> = ({
  isOpen,
  onClose,
  selectedPlatforms,
  onSaveSuccess,
}) => {
  const [historicalPrice, setHistoricalPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const screenSize = useScreenSize();

  if (!isOpen) return null;

  const platformNames = selectedPlatforms.map((id) => {
    const platformMap: { [key: string]: string } = {
      coinbase: "Coinbase",
      kraken: "Kraken",
      exodus: "Exodus",
      trezor: "Trezor",
      zengo: "Zengo",
      gemini: "Gemini",
      cryptocom: "Crypto.com",
      oak: "OAK",
      bybit: "Bybit",
      bidget: "Bidget",
    };
    return platformMap[id] || id;
  });

  const platformText =
    platformNames.length === 1
      ? platformNames[0]
      : platformNames.length === 2
      ? `${platformNames[0]} and ${platformNames[1]}`
      : `${platformNames.slice(0, -1).join(", ")}, and ${
          platformNames[platformNames.length - 1]
        }`;

  return (
    <div className="fixed top-[150px] md:top-0 inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-full md:items-center md:justify-center md:p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-t-2xl md:rounded-lg shadow-xl max-w-md w-full p-3 md:p-8 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <Typography className="text-lg md:text-h5 font-bold text-gray-900 dark:text-gray-150">
              Set historical price
            </Typography>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 md:mb-6">
            {/* Introductory Text */}
            <Typography
              variant="small"
              className="text-sm text-left mt-1.5 mb-6 text-[#191919] dark:text-gray-300"
            >
              Fill in the details for the missing price on {platformText}.
            </Typography>

            {/* Historical Price Input */}
            <div className="mb-4">
              <label className="block text-sm text-left font-medium mb-2 text-gray-700 dark:text-gray-300">
                Historical Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={historicalPrice}
                  onChange={(e) => setHistoricalPrice(e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-3 py-2 border border-[#E1E3E5] rounded-lg focus:outline-none bg-white text-gray-900 placeholder-[#8C8E90] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-250 dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="mb-6">
              <label className="block text-left text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className={`w-full px-3 py-[8px] text-sm border border-[#E1E3E5] rounded-lg focus:outline-none flex items-center justify-between cursor-pointer ${"bg-transparent text-[#0E201E] dark:border-gray-600 dark:text-gray-100"}`}
                  placeholderText="Date"
                  dateFormat="MM/dd/yyyy"
                  wrapperClassName="w-full"
                  popperPlacement="bottom-start"
                  popperClassName="z-[9999]"
                  popperContainer={({ children }) => (
                    <div style={{ zIndex: 9999, position: "relative" }}>
                      {children}
                    </div>
                  )}
                  customInput={
                    <div className="flex items-center justify-between w-full space-x-6">
                      <span
                        className={`flex-1 text-left ${
                          !selectedDate
                            ? "text-gray-400 dark:text-gray-100"
                            : ""
                        }`}
                      >
                        {selectedDate
                          ? selectedDate.toLocaleDateString("en-US", {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            })
                          : "Date"}
                      </span>
                      <svg
                        className="text-[#7C7C7C] size-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                        />
                      </svg>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={onClose}
              className="px-5 py-3 font-medium text-gray-500 dark:text-gray-300"
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
              className={`px-5 py-3 rounded-lg font-medium ${
                historicalPrice && selectedDate
                  ? "bg-[#90C853] text-[#0E201E]"
                  : "bg-[#E1E3E5] text-[#8C8E90] dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
              }`}
              disabled={!historicalPrice || !selectedDate}
            >
              Add price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetHistoricalPriceModal;
