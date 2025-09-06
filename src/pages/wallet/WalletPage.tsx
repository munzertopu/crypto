import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Filter from "./components/Filter";
import Recommended from "./components/Recommended";
import CryptoPlatformGrid from "./components/CryptoPlatformGrid";

interface WalletPageProps {
  onLogout?: () => void;
}

const WalletPage: React.FC<WalletPageProps> = ({ onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showRecommendedAccounts, setShowRecommendedAccounts] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E201E]">
      <NavigationBar
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        onLogout={onLogout}
        currentPage="wallets"
      />

      <div className="px-4 md:px-2">
        <div className="pt-6 sm:pt-0 md:mx-auto md:px-12 md:py-8">
          {/* Main Title */}
          <h1
            className={`text-lg md:text-2xl font-semibold md:mb-8 text-left text-[#0E201E]
              dark:text-[#E1E3E5]`}
          >
            Wallets
          </h1>

          {/* Recommended Accounts Section */}
          <div className="hidden sm:block">
            <Recommended
              showRecommendedAccounts={showRecommendedAccounts}
              setShowRecommendedAccounts={setShowRecommendedAccounts}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Filter and Search Section */}
          <Filter
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isDarkMode={isDarkMode}
          />

          {/* Crypto Platforms Grid */}
          <CryptoPlatformGrid isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
