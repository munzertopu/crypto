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
    isDarkMode = false,
    cryptoName,
    cryptoSymbol,
    cryptoLogo
}) => {
  const tabs = ['market', 'portfolio'];
  return (
    <div className="mb-6 bg-white dark:bg-[#0E201E]">
        <div className="flex items-center mb-4">
            <img src={cryptoLogo} alt={cryptoName} className="w-12 h-12 rounded-full mr-4" />
            <h1 className="text-3xl font-bold text-[#0E201E] dark:text-[#E1E3E5]">{cryptoName}</h1>
        </div>
        
        {/* Tabs */}
        <div className="border-gray-200 dark:border-gray-700">
            <Tabs>
                <Tabs.List className="my-2 lg:my-2 bg-[#F3F5F7] dark:bg-[#2F3232]">
                    {tabs.map((tab) => (
                        <Tabs.Trigger 
                            key={tab}
                            value={tab}
                            onClick={() => onTabChange?.(tab)}
                            className={`px-3 sm:px-5 py-1 sm:py-2 rounded-lg sm:rounded-xl text-sm sm:text-lg ${
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
