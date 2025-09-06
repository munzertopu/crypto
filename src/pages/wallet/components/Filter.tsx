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
      <div className="flex space-x-1 mb-4 mt-5 md:mt-0 sm:mb-0">
        <Tabs>
          <Tabs.List className="my-2 lg:my-2 bg-[#F3F5F7] dark:bg-[#2F3232]">
            {["All", "Exchanges", "Blockchains"].map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm ${
                  activeTab === tab
                    ? "bg-white dark:bg-[#0E201E] text-gray-900 dark:text-white"
                    : "text-gray-900 dark:text-[#FFFFFF] opacity-70"
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
      <div
        className="flex flex-row justify-start items-center 
         px-4 py-3 
         box-border 
         border border-[rgba(225,227,229,1)] dark:border-gray-700
         rounded-[12px] 
         shadow-[0px_1px_2px_0px_rgba(20,21,26,0.05)] 
         bg-[rgba(255,255,255,1)] dark:bg-[#0E201E]"
      >
        <div className="flex flex-row justify-start items-center gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-900 dark:text-[#FFFFFF] opacity-70"
          >
            <path
              d="M9.6 17.2C13.7974 17.2 17.2 13.7974 17.2 9.6C17.2 5.40264 13.7974 2 9.6 2C5.40264 2 2 5.40264 2 9.6C2 13.7974 5.40264 17.2 9.6 17.2Z"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.0004 17.9999L16.4004 16.3999"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`text-base w-full  border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none bg-transparent
            dark:bg-transparent dark:border-[#4D5050]`}
          />
        </div>
      </div>
      {/* <div className="relative">
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
          className={`pl-14 pr-4 py-4 rounded-2xl border text-base w-full  border-gray-700 text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent
            dark:bg-transparent dark:border-[#4D5050]`}
        />
      </div> */}
    </div>
  );
};

export default Filter;
