import React from "react";
import { Tabs } from "@material-tailwind/react";

interface FilterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-0 sm:mb-8 md:mb-6">
      {/* Tabs */}
      <div className="flex mb-4 mt-5 md:mt-0 sm:mb-0">
        <Tabs className="overflow-x-auto scrollbar-hide">
          <Tabs.List className="my-2 lg:my-0 bg-[#F3F5F7] dark:bg-gray-800">
            {["All", "Exchanges", "Exchanges vs Blockchains"].map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm ${
                  activeTab === tab
                    ? "bg-white dark:bg-gray-0 text-gray-900 dark:text-gray-900"
                    : "text-gray-900 dark:text-gray-200"
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
      <div className="flex flex-row-reverse md:flex-row justify-end items-center gap-3 w-full sm:w-auto">
        <button
          onClick={() => {}}
          className={`text-base font-medium  px-4 py-3  sm:px-6 sm:py-3 md:py-3 rounded-md sm:rounded-2xl bg-[#90C853] text-[#0E201E]`}
          aria-label={"Add new wallet"}
        >
          <span className="hidden sm:inline">Add Wallet</span>
          <span className="block sm:hidden text-white">+</span>
        </button>
        <div
          className="flex flex-row justify-start items-center 
         px-4 py-3 
         box-border 
         border border-[rgba(225,227,229,1)] dark:border-gray-700
         rounded-[12px] 
         shadow-[0px_1px_2px_0px_rgba(20,21,26,0.05)] 
         bg-[rgba(255,255,255,1)] dark:bg-[#0E201E] w-full sm:w-auto"
        >
          <div className="flex flex-row justify-start items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-900 dark:text-gray-150 opacity-70"
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
              className={`text-base w-full  border-gray-700 text-gray-900 dark:text-gray-150 placeholder-gray-400 focus:outline-none bg-transparent
            dark:bg-transparent dark:border-[#4D5050]`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
