import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FinancialMetrics,
  PortfolioChart,
  KPISection,
  PortfolioAllocation,
  HoldingsTable,
} from "../components";

interface PortfolioTabProps {
  isDarkMode: boolean;
  onAddKPI: () => void;
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({
  isDarkMode,
  onAddKPI,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Financial Metrics */}
      <div className="px-6 mx-0 md:mx-0 sm:mx-3">
        <FinancialMetrics
          totalValue="$1,500,876"
          totalValueChange="+5.73%"
          costBasic="$550,132"
          costBasicChange="-2.38%"
          unrealizedGain="$1,000,744"
          unrealizedGainChange="+1.29%"
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Portfolio Chart */}
      <div className="px-2 mx-0 md:mx-0 sm:mx-1 lg:mx-0 mt-8">
        <PortfolioChart isDarkMode={isDarkMode} chartColor="#90C853" />
      </div>

      {/* Horizontal Separator */}
      <div className="hidden md:block md:my-5">
        <div className="w-full h-px bg-gray-200 dark:bg-[#2F3232]"></div>
      </div>

      {/* KPI Section */}
      <div className="p-6 mx-0 sm:mx-1 md:mr-9">
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
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Horizontal Separator */}
      <div className="hidden md:block md:my-5">
        <div className="w-full h-px bg-gray-200 dark:bg-[#2F3232]"></div>
      </div>

      {/* Portfolio Allocation */}
      <div className="px-6 py-3">
        <PortfolioAllocation isDarkMode={isDarkMode} />
      </div>

      {/* Holdings Table */}
      <div className="px-6 py-4">
        <HoldingsTable
          isDarkMode={isDarkMode}
          onCryptoClick={(symbol) => navigate(`/crypto/${symbol}`)}
        />
      </div>
    </>
  );
};

export default PortfolioTab;
