import React from "react";

interface AssetAllocation {
  name: string;
  percentage: number;
  color: string;
  logo: string;
  logoUrl?: string;
}

interface PortfolioAllocationProps {
  allocations?: AssetAllocation[];
  isDarkMode?: boolean;
}

const PortfolioAllocation: React.FC<PortfolioAllocationProps> = ({
  allocations = [],
}) => {
  // Mock data based on the image - exact order and percentages
  const defaultAllocations: AssetAllocation[] = [
    {
      name: "Bitcoin",
      percentage: 17,
      color: "#f7931a",
      logo: "crypto/bitcoin-btc-logo.png",
      logoUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    },
    {
      name: "USDT",
      percentage: 11,
      color: "#26a17b",
      logo: "crypto/tether-usdt-logo.png",
      logoUrl: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    },
    {
      name: "Synthetix",
      percentage: 16,
      color: "#00d1ff",
      logo: "crypto/synthetix-network-token-snx-logo.png",
      logoUrl:
        "https://cryptologos.cc/logos/synthetix-network-token-snx-logo.png",
    },
    {
      name: "Ethereum",
      percentage: 15,
      color: "#627eea",
      logo: "crypto/ethereum-eth-logo.png",
      logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    {
      name: "Solana",
      percentage: 13,
      color: "#9945ff",
      logo: "crypto/solana-sol-logo.png",
      logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
    },
    {
      name: "Shibainu",
      percentage: 11,
      color: "#ff6b35",
      logo: "crypto/ShibaInu.png",
      logoUrl: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    },
    {
      name: "ThetaFuel",
      percentage: 10,
      color: "#ff6b35",
      logo: "crypto/theta-fuel-tfuel-logo.png",
      logoUrl: "https://cryptologos.cc/logos/theta-fuel-tfuel-logo.png",
    },
    {
      name: "Others",
      percentage: 6,
      color: "#10b981",
      logo: "crypto/others.png",
      logoUrl: "https://cryptologos.cc/logos/chainlink-link-logo.png",
    },
  ];

  const data = allocations.length > 0 ? allocations : defaultAllocations;

  // Group data into rows of 5 elements each
  const rows = [];
  for (let i = 0; i < data.length; i += 5) {
    rows.push(data.slice(i, i + 5));
  }

  return (
    <div className="sm:px-6 mb-6 md:mb-0 md:pt-3">
      <h3 className="text-lg md:text-xl font-semibold text-[#0E201E] dark:text-[#CDCFD1] mb-3 text-left">
        Portfolio Allocation
      </h3>
      <div
        className="grid gap-4 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5
            divide-[#E1E3E5] dark:divide-[#8C8E90]"
      >
        {data.map((asset, assetIndex) => (
          <div key={assetIndex} className="flex items-center min-w-0">
            <React.Fragment key={asset.name}>
              <div className="flex items-center space-x-4 w-full sm:min-w-[220px] sm:max-w-[230px] flex-shrink-0">
                {/* Asset Logo */}
                <div className="flex-shrink-0 rounded-full flex items-center justify-center overflow-hidden">
                  {asset.logoUrl ? (
                    <img
                      src={asset.logo}
                      alt={`${asset.name} logo`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        // Fallback to colored background with letter if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      asset.logoUrl ? "hidden" : ""
                    }`}
                  >
                    {asset.logo}
                  </div>
                </div>

                {/* Asset Name and Percentage */}
                <div className="min-w-0 flex-1">
                  <span
                    className={`text-base md:text-lg text-left  truncate sm:block flex justify-between`}
                  >
                    <span className="text-[#0E201E] dark:text-[#B6B8BA] opacity-80">
                      {asset.name}:
                    </span>{" "}
                    <span className="text-[#0E201E] dark:text-[#B6B8BA] font-semibold">
                      {asset.percentage}%
                    </span>
                  </span>
                </div>
              </div>
              {/* Vertical Separator - don't show for last element in row */}
              {assetIndex < data.length - 1 && (
                <div className="flex-shrink-0 w-px h-8 bg-[#E1E3E5] dark:bg-[#8C8E90] mx-4 lg:mx-8 hidden sm:block"></div>
              )}
            </React.Fragment>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioAllocation;
