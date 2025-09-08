import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";
import { WelcomeBanner, DashboardHeader } from "./components";
import PortfolioTab from "./tabs/PortfolioTab";
import NFTTab from "./tabs/NftTab";

interface DashboardPageProps {
  onLogout?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Portfolio");
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddKPI = () => {
    console.log("Add KPI clicked");
    // Add KPI functionality would go here
  };

  const handleWelcomeBannerClose = () => {
    setShowWelcomeBanner(false);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E201E]
    ">
      {/* Navigation Bar */}
      <NavigationBar
        userName="Kristin Watson"
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        onLogout={handleLogout}
      />

      {/* Dashboard Content */}
      <div className="px-10 md:px-16 sm:px-6 py-3 md:py-4 w-full">
        {/* Welcome Banner */}
        {showWelcomeBanner && (
          <>
            <div>
              <WelcomeBanner
                userName="Kristin Watson"
                onClose={handleWelcomeBannerClose}
                isDarkMode={isDarkMode}
              />
            </div>
            {/* Horizontal Separator */}
            <div className="py-2 hidden md:block">
              <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
            </div>
          </>
        )}

        {/* Dashboard Header */}
        <DashboardHeader
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isDarkMode={isDarkMode}
        />
        <div className="mx-0 md:mx-0 sm:mx-1">
          {/* Portfolio Tab */}
          {activeTab === "Portfolio" && (
            <PortfolioTab isDarkMode={isDarkMode} onAddKPI={handleAddKPI} />
          )}

          {/* NFT Tab */}
          {activeTab === "NFT" && <NFTTab isDarkMode={isDarkMode} />}

          {/* Crypto Tab */}
          {activeTab === "Crypto" && (
            <div className="mx-3 p-8 text-center">
              <div className="text-lg text-gray-600 dark:text-gray-400">
                Crypto tab content coming soon...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
