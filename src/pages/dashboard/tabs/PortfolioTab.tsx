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
  onAddKPI: () => void;
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({
  onAddKPI,
}) => {
  const navigate = useNavigate();

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
      <div className="md:px-6">
        <PortfolioAllocation />
      </div>

      {/* Holdings Table */}
      <div className="md:px-6">
        <HoldingsTable
          onCryptoClick={(symbol) => navigate(`/crypto/${symbol}`)}
        />
      </div>
    </>
  );
};

export default PortfolioTab;
