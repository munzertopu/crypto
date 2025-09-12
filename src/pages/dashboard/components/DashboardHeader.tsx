import React from "react";
import { useState } from "react";
import { Tabs } from "@material-tailwind/react";

import DateRangePickerPopover from "../../../components/DateRangePicker";

interface DashboardHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  dateRange?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab = "Portfolio",
  onTabChange,
}) => {
  const tabs = ["Portfolio", "Crypto", "NFT"];
  const [value, setValue] = useState<any>({
    startDate: null,
    endDate: null,
  });
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date("2025-05-01") as Date | null,
    endDate: new Date("2025-05-29") as Date | null,
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
    <div className="sm:px-4 lg:px-6 lg:pt-0 md:pb-8 pt-8">
      <div className="flex flex-row items-center justify-between gap-4 ">
        {/* Title */}
        <h4
          className={`text-lg md:text-h4 font-semibold text-gray-900
             dark:text-gray-250`}
        >
          Dashboard
        </h4>

        {/* Date Range Selector */}
        <div className={`max-w-[190px]`}>
          <DateRangePickerPopover
            selectedDateRange={selectedDateRange}
            onDateRangeChange={setSelectedDateRange}
          />
        </div>
      </div>
      {/* Tabs */}
      <div className="mt-4 md:mt-5 border-gray-200 dark:border-gray-700 md:mb-0 sm:mt-0">
        <Tabs>
          <Tabs.List className="p-1 bg-[#F3F5F7] dark:bg-[#2F3232] rounded-xl">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                onClick={() => onTabChange?.(tab)}
                className={`px-1.5 sm:px-5 md:px-2.5 py-2.5 sm:py-2 md:py-1.5 rounded-lg sm:rounded-xl md:rounded-lg text-smh sm:text-smh md:smh ${
                  activeTab === tab
                    ? "bg-white dark:bg-[#0E201E] text-gray-900 dark:text-gray-150"
                    : "text-gray-900 dark:text-gray-150 opacity-75"
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
