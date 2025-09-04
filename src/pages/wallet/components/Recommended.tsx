import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface RecommendedAccount {
  id: number;
  platform: string;
  logo: string;
  description: string;
  actionText: string;
}

interface RecommendedProps {
  showRecommendedAccounts: boolean;
  setShowRecommendedAccounts: (show: boolean) => void;
  isDarkMode: boolean;
}

const Recommended: React.FC<RecommendedProps> = ({
  showRecommendedAccounts,
  setShowRecommendedAccounts,
  isDarkMode,
}) => {
  const recommendedAccounts: RecommendedAccount[] = [
    {
      id: 1,
      platform: "Crypto.com",
      logo: "crypto/crypto.png",
      description:
        "You made 5 transactions involving ETH on Crypto.com between Feb 2021 and Apr 2022.",
      actionText: "View Transactions",
    },
    {
      id: 2,
      platform: "Bittrex",
      logo: "crypto/bittrex.png",
      description:
        "We found 1 transaction with ETH on Bittrex in October 2020.",
      actionText: "View Transactions",
    },
    {
      id: 3,
      platform: "Kraken",
      logo: "crypto/kraken.png",
      description:
        "You interacted with Kraken via 3 BTC deposits from your uploaded wallet in 2022.",
      actionText: "View Transactions",
    },
  ];

  if (!showRecommendedAccounts) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`text-base font-semibold text-[#0E201E]
          dark:text-[#E1E3E5]`}
        >
          Recommended accounts
        </h2>
        <button
          onClick={() => setShowRecommendedAccounts(false)}
          className={`ml-4 flex items-center space-x-1 px-3 py-2 lg:px-3 lg:py-5 h-8 border border-[#E1E3E5] text-[#7C7C7C] rounded-md 
            dark:text-[#E1E3E5]`}
          aria-label="Close recommended accounts section"
        >
          <svg
            className="w-6 h-6"
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
            className={`text-sm font-medium text-[#0E201E]
             dark:text-[#E1E3E5]`}
          >
            Close
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {recommendedAccounts.map((account) => (
          <div
            key={account.id}
            className={`bg-transparent border-[#E1E3E5] border rounded-2xl px-6 py-2
              dark:border-[#E1E3E5]`}
          >
            <div className="flex items-center my-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4`}
              >
                <img src={account.logo} />
              </div>
              <h3
                className={`font-semibold text-base text-[#0E201E]
                  dark:text-[#B6B8BA]`}
              >
                {account.platform}
              </h3>
            </div>
            <div className="mb-4">
              <p
                className={`text-sm text-left font-semibold text-gray-600
                  dark:text-[#B6B8BA]`}
              >
                {account.description}{" "}
                <span className="text-[#5F9339] cursor-pointer font-medium">
                  {account.actionText}
                </span>
              </p>
              <button
                className={`flex items-center text-sm border border-[#E1E3E5] rounded-lg px-3 py-1 font-medium text-[#0E201E] mt-3
                  dark:text-[#B6B8BA]`}
                aria-label={`Add ${account.platform} account`}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="w-4 h-4 mr-4 ml-2 text-[#7C7C7C]
                  dark:text-[#B6B8BA]"
                  aria-hidden="true"
                />
                Add Account
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
