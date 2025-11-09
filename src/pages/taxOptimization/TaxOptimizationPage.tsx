import React, { useState } from "react";
import { Tabs } from "@material-tailwind/react";
import NavigationBar from "../../components/NavigationBar";
import TaxOptimizationTab from "./taxOptimizationTab/TaxOptimizationTab";
import TaxLossHarvestingTab from "./taxLossHarvestingTab/TaxLossHarvestingTab";
import TaxWizardTab from "./taxWizardTab/TaxWizardTab";

interface TaxOptimizationPageProps {
  onLogout?: () => void;
}

const TaxOptimizationPage: React.FC<TaxOptimizationPageProps> = ({
  onLogout,
}) => {
  const tabs = ["Tax Optimization", "Tax Loss Harvesting", "Tax Wizard"];
  const [activeTab, setActiveTab] = useState("Tax Optimization");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-150">
      <NavigationBar onLogout={handleLogout} currentPage="tax-optimization" />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-5 pb-5 md:pb-0">
        {/* Header */}
        <div className="mb-5">
          <h1
            className={`text-2xl font-semibold mb-5 text-left text-[#0E201E] dark:text-[#E1E3E5]`}
          >
            Tax Holding Maturity
          </h1>

          {/* Sub Navigation Tabs */}
          <div className="border-gray-200 dark:border-gray-700">
            <Tabs className="overflow-x-auto scrollbar-hide">
              <Tabs.List className="my-2 lg:my-0 bg-[#F3F5F7] dark:bg-[#2F3232]">
                {tabs.map((tab) => (
                  <Tabs.Trigger
                    key={tab}
                    value={tab}
                    onClick={() => handleTabChange?.(tab)}
                    className={`px-3 sm:px-5 md:px-2.5 py-1 sm:py-2 md:py-1.5 rounded-lg sm:rounded-xl 
                      text-sm sm:text-lg md:text-sm ${
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
        </div>

        {/* Main Content */}
        {activeTab === "Tax Optimization" && <TaxOptimizationTab />}

        {activeTab === "Tax Loss Harvesting" && <TaxLossHarvestingTab />}

        {activeTab === "Tax Wizard" && <TaxWizardTab />}
      </div>
    </div>
  );
};

export default TaxOptimizationPage;
