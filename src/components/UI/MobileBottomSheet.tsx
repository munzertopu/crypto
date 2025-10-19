import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Avatar } from "@material-tailwind/react";

export interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any | null;
  className?: string;
}

const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  isOpen,
  onClose,
  transaction,
  className = "",
}) => {
  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Format date for display
  const formatDateForDisplay = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${formattedDate}, ${timeString}`;
  };

  if (!isOpen || !transaction) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[9999] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } ${className}`}
      >
        <div
          className="flex flex-col justify-center items-start gap-0.5 py-2 px-0 box-border border border-default rounded-t-[32px] bg-white dark:bg-gray-900 dark:border-gray-700 min-h-[360px]"
          style={{
            boxShadow: "2px -1px 6px 0px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full px-4 py-3 ">
            <div className="flex items-center gap-3">
              <Avatar
                src={transaction.wallet.logo}
                alt={transaction.wallet.name}
                size="sm"
                className="h-[60px] w-[60px] flex items-center justify-center text-white text-xs font-bold"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-11 dark:text-gray-250">
                  {transaction.wallet.name} {transaction.wallet.symbol}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  ID: {transaction.transactionId}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
          <div className="w-full px-4 py-4 space-y-4 flex-1">
            {/* Token Address */}
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-700 dark:text-gray-300">
                Token address:
              </span>
              <span className="text-base font-medium text-gray-900 dark:text-gray-250">
                {transaction.wallet.address}
              </span>
            </div>

            {/* Date & Time */}
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-700 dark:text-gray-300">
                Date & Time:
              </span>
              <span className="text-base font-medium text-gray-900 dark:text-gray-250">
                {formatDateForDisplay(transaction.date, transaction.time)}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full px-4 pb-4">
            <button
              onClick={() => {
                // Handle view all transactions
                console.log("View all transactions clicked");
                onClose();
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-gray-900 dark:text-gray-100 font-medium py-3 px-5 rounded-lg transition-colors duration-200 text-base"
            >
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default MobileBottomSheet;
