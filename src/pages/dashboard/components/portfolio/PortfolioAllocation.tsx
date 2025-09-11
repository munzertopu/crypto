import React from "react";
import { defaultAllocations } from "../../../../data/dashboardassets";
import type { AssetAllocation } from "../../../../data/dashboardassets";

interface PortfolioAllocationProps {
  allocations?: AssetAllocation[];
  isDarkMode?: boolean;
}

const PortfolioAllocation: React.FC<PortfolioAllocationProps> = ({
  allocations = [],
}) => {

  const data = allocations.length > 0 ? allocations : defaultAllocations;

  // Group data into rows of 5 elements each
  const rows = [];
  for (let i = 0; i < data.length; i += 5) {
    rows.push(data.slice(i, i + 5));
  }

  return (
    <div className="mb-8 md:mb-5 md:pt-3">
      <h3 className="text-lg md:text-xl font-semibold text-[#0E201E] dark:text-[#CDCFD1] mb-3 text-left">
        Portfolio Allocation
      </h3>
      <div
        className="grid gap-4 
            grid-cols-1
            sm:grid-cols-2 
            md:grid-cols-4
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
              {assetIndex < data.length - 1 && assetIndex != 4 && (
                <div className="flex-shrink-0 w-px h-8 bg-[#E1E3E5] dark:bg-[#8C8E90] mx-4 lg:mx-8 xl:mx-4 hidden sm:block"></div>
              )}
            </React.Fragment>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioAllocation;
