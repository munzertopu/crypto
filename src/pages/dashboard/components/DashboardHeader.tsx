import React from 'react';
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
  activeTab = 'Portfolio',
  onTabChange,
  isDarkMode = false
}) => {
  const tabs = ['Portfolio', 'Crypto', 'NFT'];
  const [value, setValue] = useState<any>({ 
    startDate: null, 
    endDate: null
  });

  // Create shortcuts with year dropdown
  const createShortcuts = () => {
    const shortcuts: any = {
      today: "Today",
      last7Days: {
        text: "Last 7 days",
        period: {
          start: new Date(new Date().setDate(new Date().getDate() - 7)),
          end: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      last30Days: {
        text: "Last 30 days",
        period: {
          start: new Date(new Date().setDate(new Date().getDate() - 30)),
          end: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      last6Months: {
        text: "Last 6 months",
        period: {
          start: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          end: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      last12Months: {
        text: "Last 12 months",
        period: {
          start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          end: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      byYear: {
        text: "By Year",
        period: {
          start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          end: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      }
    };

    return shortcuts;
  };

  return (
    <div className="px-2 sm:px-4 lg:px-6 py-2 lg:py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
        {/* Title */}
        <h1 className="text-xl lg:text-xl font-medium text-[#0E201E] dark:text-[#E1E3E5]">Dashboard</h1>

        {/* Date Range Selector */}
        <div className="flex items-center rounded-lg border p-2 shadow-sm w-full sm:w-auto border-[#E1E3E5] dark:border-[#4D5050] bg-white dark:bg-[#0E201E]">
          <Datepicker
            displayFormat="DD MMM YYYY"
            separator='-'
            placeholder=''
            value={value} 
            onChange={(newValue: any) => setValue(newValue)}
            showShortcuts={true}
            configs={{
                shortcuts: createShortcuts()
            }}
            
            primaryColor='green'
            inputClassName="w-full rounded-md bg-transparent mr-8 focus:outline-none text-sm sm:text-base placeholder:text-gray-800 dark:placeholder:text-white text-gray-800 dark:text-white"
            containerClassName="relative pr-6"
            toggleClassName="absolute rounded-r-lg px-0 right-0 top-0 h-full text-gray-800 dark:text-white"

          />
        </div>
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
                {tab}
              </Tabs.Trigger >
            ))}
            <Tabs.TriggerIndicator />
          </Tabs.List>
        </Tabs>
       </div>
    </div>
  );
};

export default DashboardHeader;
