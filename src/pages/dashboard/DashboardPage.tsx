import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import {
  WelcomeBanner,
  DashboardHeader
} from './components';
import PortfolioTab from './tabs/PortfolioTab';
import NFTTab from './tabs/NftTab';

interface DashboardPageProps {
  onLogout?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Portfolio');
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddKPI = () => {
    console.log('Add KPI clicked');
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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Navigation Bar */}
      <NavigationBar
        userName="Kristin Watson" 
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        onLogout={handleLogout}
      />
      
      {/* Dashboard Content */}
      <div className="w-full px-4 sm:px-6 lg:px-6">
        {/* Welcome Banner */}
        {showWelcomeBanner && (
          <div className="mx-2 sm:mx-4 lg:mx-8">
            <WelcomeBanner 
              userName="Kristin Watson" 
              onClose={handleWelcomeBannerClose}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* Horizontal Separator */}
        <div className="p-2">
          <div className={`w-full h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
        
        {/* Dashboard Header */}
        <div className="mx-2">
          <DashboardHeader 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isDarkMode={isDarkMode}
          />
        </div>
        <div className='mx-1 sm:mx-2 lg:mx-3'>
          {/* Portfolio Tab */}
          {activeTab === 'Portfolio' && (
            <PortfolioTab 
              isDarkMode={isDarkMode}
              onAddKPI={handleAddKPI}
            />
          )}

          {/* NFT Tab */}
          {activeTab === 'NFT' && (
            <NFTTab 
              isDarkMode={isDarkMode}
            />
          )}

          {/* Crypto Tab */}
          {activeTab === 'Crypto' && (
            <div className="mx-3 p-8 text-center">
              <div className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
