import React from "react";
import { Tabs } from "@material-tailwind/react";

interface CryptoDetailHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  isDarkMode?: boolean;
  cryptoName: string;
  cryptoSymbol: string;
  cryptoLogo: string;
}

const CryptoDetailHeader: React.FC<CryptoDetailHeaderProps> = ({
  activeTab = "market",
  onTabChange,
  cryptoName,
  cryptoSymbol,
  cryptoLogo,
}) => {
  const tabs = ["market", "portfolio"];
  return (
    <div className="mb-6 bg-white dark:bg-[#0E201E]">
      <div className="flex items-center mb-4">
        <img
          src={cryptoLogo}
          alt={cryptoName}
          className="w-10 h-10 rounded-full mr-2"
        />
        <h1 className="text-h4 font-semibold text-[#0E201E] dark:text-[#E1E3E5]">
          {cryptoName}
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-gray-200 dark:border-gray-700">
        <Tabs className="">
          <Tabs.List className="p-1 bg-[#F3F5F7] dark:bg-gray-800 rounded-xl w-full sm:w-[fit-content]">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                onClick={() => onTabChange?.(tab)}
                className={`w-full sm:w-[inherit] px-1.5 sm:px-5 md:px-2.5 py-2.5 sm:py-2 md:py-1.5 rounded-lg sm:rounded-xl md:rounded-lg text-smh sm:text-smh md:smh ${
                  activeTab === tab
                    ? "bg-white dark:bg-gray-0 text-gray-900 dark:text-gray-900"
                    : "text-gray-900 dark:text-gray-200"
                }`}
              >
                {cryptoSymbol} {tab}
              </Tabs.Trigger>
            ))}
            <Tabs.TriggerIndicator />
          </Tabs.List>
        </Tabs>
      </div>
    </div>
  );
};

export default CryptoDetailHeader;
