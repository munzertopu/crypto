import React from "react";
import { Tabs } from "@material-tailwind/react";
import PortfolioChart from "../../../components/PortfolioChart";
import FinancialMetrics from "../../../components/FinancialMetrics";

interface PortfolioTabProps {
  activeTimeRange: string;
  onTimeRangeChange: (timeRange: string) => void;
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({
  activeTimeRange,
  onTimeRangeChange,
}) => {
  const timeRanges = ["1D", "1W", "1M", "3M", "1Y", "All time"];

  return (
    <div className="mb-6 md:mb-0 bg-white dark:bg-[#0E201E]">
      {/* Header and Time Range in one row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0   mb-6">
        <h2 className="text-h6 font-semibold text-left text-[#0E201E] dark:text-[#E1E3E5]">
          Personal holding
        </h2>
        {/* Time Range Selector */}
        <div className="border-gray-100 dark:border-gray-700">
          <Tabs className="">
            <Tabs.List className="p-1 bg-[#F3F5F7] dark:bg-gray-800 rounded-xl w-full sm:w-[fit-content] flex flex-row gap-2 md:gap-0">
              {timeRanges.map((timeRange) => (
                <Tabs.Trigger
                  key={timeRange}
                  value={timeRange}
                  onClick={() => onTimeRangeChange?.(timeRange)}
                  className={`py-1.5 px-2.5 rounded-lg text-sm ${
                    activeTimeRange === timeRange
                      ? "bg-white dark:bg-[#0E201E] text-black dark:text-white"
                      : "text-[#0E201E] dark:text-[#FFFFFF]"
                  }`}
                >
                  {timeRange}
                </Tabs.Trigger>
              ))}
              <Tabs.TriggerIndicator />
            </Tabs.List>
          </Tabs>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="mx-0 md:mx-0 sm:mx-2">
        <FinancialMetrics
          totalValue="$1,500,876"
          totalValueChange="+5.73%"
          costBasic="$550,132"
          costBasicChange="-2.38%"
          unrealizedGain="$1,000,744"
          unrealizedGainChange="+1.29%"
        />
      </div>
      {/* Chart */}
      <PortfolioChart chartColor="#3A6FF8" />
    </div>
  );
};

export default PortfolioTab;
