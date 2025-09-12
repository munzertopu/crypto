import React from 'react';
import { Tabs } from "@material-tailwind/react";

interface CryptoDetailHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  isDarkMode?: boolean;
  cryptoName: string; 
  cryptoSymbol: string; 
  cryptoLogo: string
}

const CryptoDetailHeader: React.FC<CryptoDetailHeaderProps> = ({
    activeTab = 'market',
    onTabChange,
    cryptoName,
    cryptoSymbol,
    cryptoLogo
}) => {
  const tabs = ['market', 'portfolio'];
  return (
    <div className="mb-6 bg-white dark:bg-[#0E201E]">
        <div className="flex items-center mb-4">
            <img src={cryptoLogo} alt={cryptoName} className="w-10 h-10 rounded-full mr-2" />
            <h1 className="text-h4 font-semibold text-[#0E201E] dark:text-[#E1E3E5]">{cryptoName}</h1>
        </div>
        
        {/* Tabs */}
        <div className="border-gray-200 dark:border-gray-700">
            <Tabs>
                <Tabs.List className="my-2 lg:my-2 bg-gray-100 dark:bg-[#2F3232]">
                    {tabs.map((tab) => (
                        <Tabs.Trigger 
                            key={tab}
                            value={tab}
                            onClick={() => onTabChange?.(tab)}
                            className={`px-3 sm:px-5 py-1 sm:py-2 rounded-lg sm:rounded-xl md:rounded-lg text-sm sm:text-lg md:text-sm ${
                                activeTab === tab
                                    ? 'bg-white dark:bg-[#0E201E] text-black dark:text-white'
                                    : 'text-[#0E201E] dark:text-[#FFFFFF]'
                                }`}
                        >
                        {cryptoSymbol} {tab}
                        </Tabs.Trigger >
                    ))}
                    <Tabs.TriggerIndicator />
                </Tabs.List>
            </Tabs>
        </div>
    </div>
  );
};

export default CryptoDetailHeader;
