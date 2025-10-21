import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FinancialMetrics,
  PortfolioChart,
  KPISection,
  PortfolioAllocation,
  HoldingsTable,
} from "../components";
import { Tabs } from "@material-tailwind/react";

interface PortfolioTabProps {
  onAddKPI: () => void;
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({ onAddKPI }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Portfolio Allocation");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Financial Metrics */}
      <div className="mx-0 md:mx-6 sm:mx-2">
        <FinancialMetrics
          totalValue="$1,500,876"
          totalValueChange="+5.73%"
          costBasic="$550,132"
          costBasicChange="-2.38%"
          unrealizedGain="$1,000,744"
          unrealizedGainChange="+1.29%"
        />
      </div>

      {/* Portfolio Chart */}
      <div className="mx-0 sm:mx-2 lg:mx-1">
        <PortfolioChart chartColor="#90C853" />
      </div>

      {/* Horizontal Separator */}
      <div className="hidden md:block md:mb-6">
        <div className="w-full h-px bg-gray-150 dark:bg-gray-800"></div>
      </div>

      {/* KPI Section */}
      <div className="mx-0 md:mx-0 sm:mx-2">
        <KPISection
          income="$200,000"
          incomeChange="+5.73%"
          realizedGains="$100,000"
          realizedGainsChange="+2.25%"
          shortTerms="$50,000"
          shortTermsChange="-2.38%"
          longTerms="$150,000"
          longTermsChange="+0.93%"
          onAddKPI={onAddKPI}
        />
      </div>

      {/* Horizontal Separator */}
      <div className="hidden md:block my-4  md:my-5">
        <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
      </div>

      {/* Portfolio Allocation */}

      {/* Tabs */}
      <div className="md:hidden mb-4 mt-4 md:mt-5 border-gray-200 dark:border-gray-800 md:mb-0 sm:mt-0">
        <Tabs className="">
          <Tabs.List className="p-1 bg-[#F3F5F7] dark:bg-gray-800 rounded-xl w-full sm:w-[fit-content]">
            {["Portfolio Allocation", "Holdings"].map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                onClick={() => handleTabChange?.(tab)}
                className={`w-full sm:w-[inherit] px-1.5 sm:px-5 md:px-2.5 py-2.5 sm:py-2 md:py-1.5 rounded-lg sm:rounded-xl md:rounded-lg text-smh sm:text-smh md:smh ${
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

      <div className="hidden md:block md:px-6">
        <PortfolioAllocation />
        <HoldingsTable
          onCryptoClick={(symbol) => navigate(`/crypto/${symbol}`)}
        />
      </div>

      {/* Holdings Table */}
      <div className="md:hidden">
        {activeTab === "Portfolio Allocation" && <PortfolioAllocation />}
        {activeTab === "Holdings" && (
          <HoldingsTable
            onCryptoClick={(symbol) => navigate(`/crypto/${symbol}`)}
          />
        )}
      </div>
    </>
  );
};

export default PortfolioTab;
