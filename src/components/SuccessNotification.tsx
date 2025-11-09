import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TickCircleFilledIcon from "./Icons/TickCircleFilledIcon";

interface SuccessNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  message,
  isVisible,
  onClose,
  duration = 5000,
  actionLabel,
  onAction,
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
      <div className="flex items-start gap-4 rounded-xl border border-success-500 px-4 py-3 shadow-lg 
        bg-background-light dark:bg-background-dark">
        <div className="flex flex-1 items-start gap-3">
          <TickCircleFilledIcon height={20} width={20} className="mt-0.5 flex-shrink-0" currentColor="#419F45"/>
          <div className="flex flex-col text-left">
          <span
            className="text-gray-900 text-base
            dark:text-gray-250 text-left"
          >
              {message}
            </span>
            {actionLabel && (
              <button
                type="button"
                onClick={() => {
                  onAction?.();
                }}
                className="mt-1 w-fit text-sm font-semibold text-success-500"
              >
                {actionLabel}
              </button>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 text-gray-500 transition-colors hover:text-gray-700 dark:text-[#E1E3E5] dark:hover:text-gray-200"
        >
          <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SuccessNotification;
