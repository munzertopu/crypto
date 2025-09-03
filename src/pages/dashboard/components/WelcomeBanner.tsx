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
      className={`py-2 sm:py-6 transition-opacity duration-300 ease-in-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start justify-normal md:gap-3 gap-2">
          {/* Main Welcome Message */}
          <div className="flex items-start justify-between">
            <h2
              className={`text-sm sm:text-lg  font-semibold sm:font-medium ${
                isDarkMode ? "text-white" : "text-[#0E201E] text-left"
              }`}
            >
              Welcome [{userName}]! Go Pro and Save an Additional [$] with our
              advanced Tax Settings.
            </h2>
            <button
              onClick={handleClose}
              className={` self-start sm:flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-2 lg:px-2 lg:py-1  ${
                isDarkMode ? "text-white" : "text-[#7C7C7C]"
              } rounded-md  md:hidden`}
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
                className={`text-sm sm:text-base lg:text-md font-medium ${
                  isDarkMode ? "text-gray-300" : "text-[#0E201E]"
                }`}
              >
                Getting started is as easy as:
              </span>
              <div className="flex flex-row flex-wrap md:gap-5 gap-1.5 ">
                <div
                  className={`flex items-center justify-center px-1.5 md:px-3 py-3 rounded-lg lg:rounded-xl border ${
                    isDarkMode ? "border-gray-600" : "border-[#E1E3E5]"
                  }`}
                >
                  <div
                    className="w-4 h-4 lg:w-4 lg:h-4 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2"
                    style={{ backgroundColor: "#75AE46" }}
                  >
                    1
                  </div>
                  <span
                    className={`text-sm lg:text-md font-normal opacity-80 ${
                      isDarkMode ? "text-white" : "text-[#0E201E]"
                    }`}
                  >
                    Connect Exchanges & Wallets
                  </span>
                </div>
                <div
                  className={`flex items-center justify-center px-1.5 sm:px-3 py-3 rounded-lg lg:rounded-xl border ${
                    isDarkMode ? "border-gray-600" : "border-[#E1E3E5]"
                  }`}
                >
                  <div
                    className="w-4 h-4 lg:w-4 lg:h-4 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2"
                    style={{ backgroundColor: "#75AE46" }}
                  >
                    2
                  </div>
                  <span
                    className={`text-sm lg:text-md font-normal opacity-80 ${
                      isDarkMode ? "text-white" : "text-[#0E201E]"
                    }`}
                  >
                    Reconcile Trades
                  </span>
                </div>
                <div
                  className={`flex items-center justify-center px-1.5 sm:px-3 py-3 rounded-lg lg:rounded-xl border ${
                    isDarkMode ? "border-gray-600" : "border-[#E1E3E5]"
                  }`}
                >
                  <div
                    className="w-4 h-4 lg:w-4 lg:h-4 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2"
                    style={{ backgroundColor: "#75AE46" }}
                  >
                    3
                  </div>
                  <span
                    className={`text-sm lg:text-md font-normal opacity-80 ${
                      isDarkMode ? "text-white" : "text-[#0E201E]"
                    }`}
                  >
                    Run Tax Reports
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Savings Info */}
          <div
            className={`text-sm lg:text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            } text-left`}
          >
            Also, you SAVE more when you{" "}
            <span className="font-bold" style={{ color: "#75AE46" }}>
              Go Pro
            </span>{" "}
            with our advanced tax settings.
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`hidden self-start md:flex items-center space-x-1 px-2 md:px-3 py-1 md:py-2 lg:px-2 lg:py-1 border border-[#E1E3E5] ${
            isDarkMode ? "text-white" : "text-[#7C7C7C]"
          } rounded-md`}
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
            className={`text-sm lg:text-sm font-normal ${
              isDarkMode ? "text-white" : "text-[#0E201E]"
            }`}
          >
            Close
          </span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
