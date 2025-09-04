import React from "react";
import { Tabs } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface FilterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isDarkMode: boolean;
}

const Filter: React.FC<FilterProps> = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  isDarkMode,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      {/* Tabs */}
      <div className="flex space-x-1 mb-4 sm:mb-0">
        <Tabs>
          <Tabs.List className="my-2 lg:my-2 bg-[#F3F5F7] dark:bg-[#2F3232]">
            {["All", "Exchanges", "Blockchains"].map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm ${
                  activeTab === tab
                    ? 'bg-white dark:bg-[#0E201E] text-black dark:text-white'
                    : 'text-[#0E201E] dark:text-[#FFFFFF]'
                }`}
              >
                {tab}
              </Tabs.Trigger>
            ))}
            <Tabs.TriggerIndicator />
          </Tabs.List>
        </Tabs>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FontAwesomeIcon
          icon={faSearch}
          className={`absolute size-6 text-xl ml-6 top-1/2 transform -translate-y-1/2 text-[#7C7C7C]
           dark:text-[#CDCFD1]`}
        />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-14 pr-4 py-4 rounded-2xl border text-base w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:outline-none
            dark:bg-transparent dark:border-[#4D5050]`}
        />
      </div>
    </div>
  );
};

export default Filter;
