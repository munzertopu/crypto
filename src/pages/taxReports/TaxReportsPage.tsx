import React from "react";
import { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import DateRangePickerPopover from "../../components/DateRangePicker";
import useScreenSize from "../../hooks/useScreenSize";
import FinancialMetrics from "./components/FinancialMetrics";
import TaxReportChart from "./components/TaxReportChart";
import TaxReportSummary from "./components/TaxReportSummary";

interface TaxReportsPageProps {
  onLogout: () => void;
}

const TaxReportsPage: React.FC<TaxReportsPageProps> = ({ onLogout }) => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date("2025-05-01") as Date | null,
    endDate: new Date("2025-05-29") as Date | null,
  });
  const [allCapitalGainMode, setAllCapitalGainMode] = useState(false);
  const screenSize = useScreenSize();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavigationBar onLogout={onLogout} currentPage="tax-reports" />

      {/* Tax report Content */}
      <div className="px-4 md:px-10 sm:px-6 md:pt-5 w-full pb-3 ">
        <div className="sm:px-4 lg:px-6 lg:pt-0 md:pb-8 pt-8">
          <div className="flex flex-row items-center justify-between gap-4 ">
            {/* Title */}
            <h4
              className={`text-lg md:text-h4 font-semibold text-gray-900
                dark:text-default`}
            >
              Tax Reports
            </h4>

            {/* Date Range Selector */}
            <div className={`max-w-[190px]`}>
              <DateRangePickerPopover
                selectedDateRange={selectedDateRange}
                onDateRangeChange={setSelectedDateRange}
                showSelectedDate={screenSize.width >= 640}
              />
            </div>
          </div>
        </div>
        
        {/* Financial maetics */}
        <div className="mx-0 md:mx-6 sm:mx-2">
          <FinancialMetrics
            totalValue="$3,960.72"
            totalValueChange="+5.73%"
            unrealizedGain="–$7,052"
            unrealizedGainChange="-2.38%"
            allCapitalGainMode={allCapitalGainMode}
            onAllCapitalGainModeChange={setAllCapitalGainMode}
          />
        </div>

        {/* Portfolio Chart */}
        <div className="mx-0 md:mx-6 sm:mx-2">
          <TaxReportChart
            chartColor="#90C853"
            allCapitalGains={allCapitalGainMode}
          />
        </div>

        <div className="mx-0 md:mx-6 sm:mx-2">
          <TaxReportSummary />
        </div>        
      </div>
    </div>
  );
};

export default TaxReportsPage;
