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
          <Tabs.List
            className={`my-1 space-x-1 ${
              isDarkMode ? "bg-[#2F3232]" : "bg-[#F3F5F7]"
            }`}
          >
            {["All", "Exchanges", "Blockchains"].map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm ${
                  activeTab === tab
                    ? `${
                        isDarkMode
                          ? "bg-[#0E201E] text-white"
                          : "bg-white text-black"
                      }`
                    : `${isDarkMode ? "text-[#FFFFFF]" : "text-[#0E201E]"}`
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
          className={`absolute size-6 text-xl ml-6 top-1/2 transform -translate-y-1/2 ${
            isDarkMode ? "text-gray-400" : "text-[#7C7C7C]"
          }`}
        />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-14 pr-4 py-4 rounded-2xl border text-base w-full ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-[#E1E3E5] text-[#0E201E] placeholder-gray-500"
          } focus:outline-none`}
        />
      </div>
    </div>
  );
};

export default Filter;
