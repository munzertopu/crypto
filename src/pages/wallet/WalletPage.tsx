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
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <NavigationBar
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        onLogout={onLogout}
        currentPage="wallets"
      />

      <div className="px-2">
        <div className="mx-auto px-12 py-8">
          {/* Main Title */}
          <h1
            className={`text-2xl font-semibold mb-8 text-left ${
              isDarkMode ? "text-white" : "text-[#0E201E]"
            }`}
          >
            Wallets
          </h1>

          {/* Recommended Accounts Section */}
          <Recommended
            showRecommendedAccounts={showRecommendedAccounts}
            setShowRecommendedAccounts={setShowRecommendedAccounts}
            isDarkMode={isDarkMode}
          />

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
