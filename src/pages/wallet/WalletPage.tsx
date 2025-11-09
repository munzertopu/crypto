import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Filter from "./components/Filter";
import Recommended from "./components/Recommended";
import CryptoPlatformGrid from "./components/CryptoPlatformGrid";

interface WalletPageProps {
  onLogout?: () => void;
}

const WalletPage: React.FC<WalletPageProps> = ({ onLogout }) => {
  const [showRecommendedAccounts, setShowRecommendedAccounts] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <NavigationBar onLogout={onLogout} currentPage="wallets" />

      <div className="px-4 md:px-10">
        <div className="pt-6 sm:pt-0 md:mx-auto md:px-0 md:py-5 pb-5 md:pb-0">
          {/* Main Title */}
          <h1
            className={`text-lg md:text-2xl font-semibold text-left text-[#0E201E]
              dark:text-[#E1E3E5]`}
          >
            Wallets
          </h1>

          {/* Recommended Accounts Section */}
          <div className="">
            <Recommended
              showRecommendedAccounts={showRecommendedAccounts}
              setShowRecommendedAccounts={setShowRecommendedAccounts}
            />
          </div>

          {/* Filter and Search Section */}
          <Filter
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Crypto Platforms Grid */}
          <CryptoPlatformGrid />
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
