import React from "react";

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
}

const Recommended: React.FC<RecommendedProps> = ({
  showRecommendedAccounts,
  setShowRecommendedAccounts,
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
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2
          className={`text-base font-semibold text-gray-900
           dark:text-gray-250`}
        >
          Recommended accounts
        </h2>
        <button
          onClick={() => setShowRecommendedAccounts(false)}
          className={`ml-4 flex items-center space-x-1 px-3 py-2 lg:px-2.5 lg:py-1.5 text-sm border border-default text-[#7C7C7C] rounded-md 
            dark:text-[#E1E3E5]`}
          aria-label="Close recommended accounts section"
        >
          <svg
            className="w-4 h-4"
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
            className={`text-sm lg:text-sm font-normal text-gray-900 dark:text-gray-150`}
          >
            Close
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {recommendedAccounts.map((account) => (
          <div
            key={account.id}
            className={`bg-transparent border-[#E1E3E5] border rounded-2xl px-5 py-4
              dark:border-[#E1E3E5]`}
          >
            <div className="flex items-center mb-1.5">
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center mr-2`}
              >
                <img src={account.logo} />
              </div>
              <h3
                className={`font-semibold text-base text-gray-900
                   dark:text-gray-250`}
              >
                {account.platform}
              </h3>
            </div>
            <div>
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
                className={`flex items-center text-sm border border-gray-150 rounded-[8px] px-2.5 py-1.5 mt-3 font-medium text-gray-900
                    dark:text-gray-250 `}
                aria-label={`Add ${account.platform} account`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 8H12"
                    stroke="#7C7C7C"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 12V4"
                    stroke="#7C7C7C"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="pr-1 text-sm">Add Account</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
