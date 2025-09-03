import React from "react";
import { useState } from "react";
import { Tabs } from "@material-tailwind/react";
import Datepicker from "react-tailwindcss-datepicker";

interface DashboardHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  dateRange?: string;
  isDarkMode?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab = "Portfolio",
  onTabChange,
  isDarkMode = false,
}) => {
  const tabs = ["Portfolio", "Crypto", "NFT"];
  const [value, setValue] = useState<any>({
    startDate: null,
    endDate: null,
  });

  // Create shortcuts with year dropdown
  const createShortcuts = () => {
    const shortcuts: any = {
      today: "Today",
      last7Days: {
        text: "Last 7 days",
        period: {
          start: new Date(new Date().setDate(new Date().getDate() - 7)),
          end: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
      last30Days: {
        text: "Last 30 days",
        period: {
          start: new Date(new Date().setDate(new Date().getDate() - 30)),
          end: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
      last6Months: {
        text: "Last 6 months",
        period: {
          start: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          end: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
      last12Months: {
        text: "Last 12 months",
        period: {
          start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          end: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
      byYear: {
        text: "By Year",
        period: {
          start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          end: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
    };

    return shortcuts;
  };

  return (
    <div className="px-2 sm:px-4 lg:px-6 py-2 lg:py-4">
      <div className="flex flex-row items-center justify-between gap-4 ">
        {/* Title */}
        <h1
          className={`text-lg lg:text-xl font-medium`}
          style={{ color: `${isDarkMode ? "#E1E3E5" : "#0E201E"}` }}
        >
          Dashboard
        </h1>

        {/* Date Range Selector */}
        <div
          className={`flex items-center rounded-lg border p-2 shadow-sm w-full sm:w-auto`}
          style={{
            borderColor: `${isDarkMode ? "#4D5050" : "#E1E3E5"}`,
            backgroundColor: `${isDarkMode ? "#0E201E" : "#FFFFFF"}`,
          }}
        >
          <Datepicker
            displayFormat="DD MMM YYYY"
            separator="-"
            placeholder=""
            value={value}
            onChange={(newValue: any) => setValue(newValue)}
            showShortcuts={true}
            configs={{
              shortcuts: createShortcuts(),
            }}
            primaryColor="green"
            inputClassName={`w-full rounded-md bg-transparent mr-8 focus:outline-none text-sm sm:text-base ${
              isDarkMode
                ? "placeholder:text-white text-white"
                : "placeholder:text-gray-800 text-gray-800"
            }`}
            containerClassName="relative pr-6"
            toggleClassName={`absolute rounded-r-lg px-0 right-0 top-0 h-full ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          />
        </div>
      </div>
      {/* Tabs */}
      <div className={`${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        <Tabs>
          <Tabs.List
            className={`my-2 lg:my-2 space-x-1 ${
              isDarkMode ? "bg-[#2F3232]" : "bg-[#F3F5F7]"
            }`}
          >
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                onClick={() => onTabChange?.(tab)}
                className={`px-3 sm:px-5 py-1 sm:py-2 rounded-lg sm:rounded-xl text-sm sm:text-lg ${
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
    </div>
  );
};

export default DashboardHeader;
