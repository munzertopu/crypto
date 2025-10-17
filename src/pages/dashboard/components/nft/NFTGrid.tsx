import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

interface NFTData {
  id: string;
  name: string;
  image: string;
  estimatedValue: string;
  gainLoss: string;
  gainLossPercentage: string;
  purchasePrice: string;
  purchaseDate: string;
}

interface NFTGridProps {
  filteredNFTs: NFTData[];
}

const NFTGrid: React.FC<NFTGridProps> = ({ filteredNFTs }) => {
  return (
    <div className="sm:mx-6 mb-10 mt-5 sm:mt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 ">
        {filteredNFTs.map((nft) => (
          <div
            key={nft.id}
            className="rounded-2xl overflow-hidden border bg-white dark:bg-gray-800 border-default dark:border-gray-700 "
          >
            {/* NFT Image */}
            <div className="aspect-[3/2] bg-gray-200 relative overflow-hidden">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
            </div>

            {/* NFT Details */}
            <div className="px-5 pt-5 pb-5 sm:pb-6">
              <h3 className="font-semibold text-lg text-left mb-3 text-gray-800 dark:text-white">
                {nft.name}
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-left font-medium text-gray-600 dark:text-gray-400">
                      Estimated Current Value:
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold text-sm text-gray-900 dark:text-gray-150">
                    {nft.estimatedValue}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Gain/Loss:
                  </span>
                  <span
                    className={`font-semibold ${
                      nft.gainLoss.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {nft.gainLossPercentage}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
                    {nft.purchasePrice}
                  </span>
                  <div className="flex items-center gap-1 border border-[#E1E3E5] dark:border-[#4D5050] rounded-full px-2 py-1 bg-gray-100 dark:bg-[#2F3232]">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-base text-gray-500 dark:text-gray-400"
                    />
                    <span className="text-[13px] font-medium text-gray-600 dark:text-gray-400">
                      {nft.purchaseDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTGrid;
