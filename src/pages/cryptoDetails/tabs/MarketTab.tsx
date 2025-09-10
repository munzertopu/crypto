import React from 'react';
import { Tabs } from "@material-tailwind/react";
import PortfolioChart from '../../../components/PortfolioChart';

interface MarketTabProps {
  isDarkMode: boolean;
  activeTimeRange: string;
  onTimeRangeChange: (timeRange: string) => void;
}

const MarketTab: React.FC<MarketTabProps> = ({
  isDarkMode,
  activeTimeRange,
  onTimeRangeChange
}) => {
  const timeRanges = ['1D', '1W', '1M', '3M', '1Y', 'All time'];

  return (
    <div className="mb-6 md:mb-0 bg-white dark:bg-[#0E201E]">
      {/* Header and Time Range in one row */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-h6 font-semibold text-left text-[#0E201E] dark:text-[#E1E3E5]">Market Performance</h2>
        {/* Time Range Selector */}
        <div className="border-gray-100 dark:border-gray-700">
          <Tabs>
            <Tabs.List className='bg-gray-100 dark:bg-[#2F3232]'>
              {timeRanges.map((timeRange) => (
                <Tabs.Trigger 
                  key={timeRange}
                  value={timeRange}
                  onClick={() => onTimeRangeChange?.(timeRange)}
                  className={`py-1.5 px-2.5 rounded-lg text-sm ${
                    activeTimeRange === timeRange
                      ? 'bg-white dark:bg-[#0E201E] text-black dark:text-white'
                      :'text-[#0E201E] dark:text-[#FFFFFF]'
                  }`}
                >
                  {timeRange}
                </Tabs.Trigger >
              ))}
              <Tabs.TriggerIndicator />
            </Tabs.List>
          </Tabs>
        </div>
      </div>

      {/* Chart */}
      <PortfolioChart 
        isDarkMode={isDarkMode} 
        chartColor="#3A6FF8"
      />
    </div>
  );
};

export default MarketTab;
