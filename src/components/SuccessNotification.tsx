import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface SuccessNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  message,
  isVisible,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed w-[calc(100%-32px)] md:w-auto bottom-4 sm:top-4 right-4 z-50 animate-fade-in">
      <div
        className="flex items-center justify-between bg-white border border-success-500 rounded-xl px-4 py-3 shadow-lg w-full md:w-auto min-w-fit gap-4
      dark:bg-[#0E201E]"
      >
        {/* Success Icon */}

        <div className="flex items-center gap-2 flex-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0003 18.3334C14.5837 18.3334 18.3337 14.5834 18.3337 10.0001C18.3337 5.41675 14.5837 1.66675 10.0003 1.66675C5.41699 1.66675 1.66699 5.41675 1.66699 10.0001C1.66699 14.5834 5.41699 18.3334 10.0003 18.3334Z"
              fill="#419F45"
              stroke="#419F45"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.45801 9.99993L8.81634 12.3583L13.5413 7.6416"
              stroke="white"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span
            className="text-gray-900 text-base
            dark:text-gray-250 text-left"
          >
            {message}
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-500 transition-colors
          dark:text-[#E1E3E5]"
        >
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
        </button>
        {/* <div className="flex-shrink-0 mr-3">
          <div className="w-4 h-4 bg-[#419F45] rounded-full flex items-center justify-center">
         
          </div>
        </div> */}

        {/* Message */}

        {/* Close Button */}
      </div>
    </div>
  );
};

export default SuccessNotification;
