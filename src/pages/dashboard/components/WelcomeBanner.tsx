import React, { useState } from "react";

interface WelcomeBannerProps {
  userName?: string;
  onClose?: () => void;
  isDarkMode?: boolean;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName = "User Nam3",
  onClose,
  isDarkMode = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const handleClose = () => {
    setIsFading(true);
    // Wait for fade animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300); // 300ms matches the CSS transition duration
  };

  if (!isVisible) return null;

  return (
    <div
      className={`pb-2 pt-8 sm:pt-5 sm:py-6 transition-opacity duration-300 ease-in-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start justify-normal md:gap-3 gap-2">
          {/* Main Welcome Message */}
          <div className="flex items-start justify-between">
            <h2
              className={`text-sm sm:text-lg  font-semibold sm:font-medium text-[#0E201E]
            dark:text-[#B6B8BA] text-left`}
            >
              Welcome [{userName}]! Go Pro and Save an Additional [$] with our
              advanced Tax Settings.
            </h2>
            <button
              onClick={handleClose}
              className={` self-start sm:flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-2 lg:px-2 lg:py-1  text-[#7c7c7c]
            dark:text-[#B6B8BA] rounded-md  md:hidden`}
              aria-label="Close banner"
            >
              <svg
                className="w-4 h-4 lg:w-4 lg:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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

          {/* Getting Started Steps */}
          <div
            className={`flex flex-col items-start"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-2">
              {" "}
              <span
                className={`text-sm sm:text-base lg:text-md font-medium text-gray-900  dark:text-[#B6B8BA]`}
              >
                Getting started is as easy as:
              </span>
              <div className="flex flex-row flex-wrap md:gap-5 gap-1.5 ">
                <div
                  className={`flex items-center justify-center px-3 md:px-3 py-1.5 rounded-xl  border border-gray-150 dark:border-gray-600 gap-1.5`}
                >
                  <div
                    className="w-4 h-4  rounded-[20px] flex flex-col items-center justify-center text-white  dark:text-[#2F3232] text-xs font-bold p-1"
                    style={{ backgroundColor: "#75AE46" }}
                  >
                    1
                  </div>
                  <span
                    className={` lg:text-md  opacity-80 text-[#0E201E] 
                  dark:text-[#CDCFD1] opacity-0.8  text-sm font-medium font-stretch-normal not-italic leading-[1.43px] tracking-normal text-left `}
                  >
                    Connect Exchanges & Wallets
                  </span>
                </div>
                <div
                  className={`flex items-center justify-center px-3 md:px-3 py-1.5 rounded-xl  border border-gray-150 dark:border-gray-600 gap-1.5`}
                >
                  <div
                    className="w-4 h-4  rounded-[20px] flex flex-col items-center justify-center text-white  dark:text-[#2F3232] text-xs font-bold p-1"
                    style={{ backgroundColor: "#75AE46" }}
                  >
                    2
                  </div>
                  <span
                    className={` lg:text-md  opacity-80 text-[#0E201E] 
                  dark:text-[#CDCFD1] opacity-0.8  text-sm font-medium font-stretch-normal not-italic leading-[1.43px] tracking-normal text-left `}
                  >
                    Reconcile Trades
                  </span>
                </div>
                <div
                  className={`flex items-center justify-center px-3 md:px-3 py-1.5 rounded-xl  border border-gray-150 dark:border-gray-600 gap-1.5`}
                >
                  <div
                    className="w-4 h-4  rounded-[20px] flex flex-col items-center justify-center text-white  dark:text-[#2F3232] text-xs font-bold p-1"
                    style={{ backgroundColor: "#75AE46" }}
                  >
                    3
                  </div>
                  <span
                    className={` lg:text-md  opacity-80 text-[#0E201E] 
                  dark:text-[#CDCFD1] opacity-0.8  text-sm font-medium font-stretch-normal not-italic leading-[1.43px] tracking-normal text-left `}
                  >
                    Run Tax Reports
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Savings Info */}
          <div
            className={`text-sm lg:text-sm text-gray-600 dark:text-[#B6B8BA] text-left`}
          >
            Also, you SAVE more when you{" "}
            <span className="font-bold text-info-500">Go Pro</span> with our
            advanced tax settings.
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`hidden self-start md:flex items-center space-x-1 px-2 md:px-3 py-1 md:py-2 lg:px-2 lg:py-1 border-[#E1E3E5] text-[#7C7C7C] 
            dark:text-[#B6B8BA] dark:border-[#4D5050] rounded-md`}
          aria-label="Close banner"
        >
          <svg
            className="w-2 h-2 lg:w-4 lg:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span
            className={`text-sm lg:text-sm font-normal text-[#0E201E] dark:text-[#CDCFD1]`}
          >
            Close
          </span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
