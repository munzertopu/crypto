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
    <div className={`mb-6 bg-white`}>
        <div className="flex items-center mb-4">
            <img src={cryptoLogo} alt={cryptoName} className="w-12 h-12 rounded-full mr-4" />
            <h1 className="text-3xl font-bold">{cryptoName}</h1>
        </div>
        
        {/* Tabs */}
        <div className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <Tabs>
                <Tabs.List className='bg-gray-200'>
                    {tabs.map((tab) => (
                        <Tabs.Trigger 
                            key={tab}
                            value={tab}
                            onClick={() => onTabChange?.(tab)}
                            className={`py-2 px-3 border-b-2 rounded-md ${
                            activeTab === tab
                                ? 'bg-white'
                                : `border-transparent ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`
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
