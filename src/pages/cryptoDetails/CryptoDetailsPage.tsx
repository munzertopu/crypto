import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../../components/NavigationBar';
import CryptoDetailHeader from './components/CryptoDetailHeader';
import AllocationTable from './components/AllocationTable';
import TaxLotTable from './components/TaxLotTable';
import InsightsSummary from './components/InsightsSummary';
import MarketTab from './tabs/MarketTab';
import PortfolioTab from './tabs/PortfolioTab';
import { Tabs } from "@material-tailwind/react";

interface CryptoDetailsPageProps {
  isDarkMode?: boolean;
}

const CryptoDetailsPage: React.FC<CryptoDetailsPageProps> = ({
  isDarkMode = false
}) => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  
  // Map symbol to crypto details
  const getCryptoDetails = (symbol: string) => {
    const cryptoMap: { [key: string]: { name: string; symbol: string; logo: string } } = {
      'ETH': { name: 'Ethereum', symbol: 'ETH', logo: '/crypto/ethereum-eth-logo.png' },
      'BTC': { name: 'Bitcoin', symbol: 'BTC', logo: '/crypto/bitcoin-btc-logo.png' },
      'SOL': { name: 'Solana', symbol: 'SOL', logo: '/crypto/solana-sol-logo.png' },
      'USDT': { name: 'Tether', symbol: 'USDT', logo: '/crypto/tether-usdt-logo.png' },
      'LINK': { name: 'Chainlink', symbol: 'LINK', logo: '/crypto/chainlink-link-logo.png' },
      'SHIB': { name: 'Shiba Inu', symbol: 'SHIB', logo: '/crypto/shiba-inu-shib-logo.png' },
      'SNX': { name: 'Synthetix', symbol: 'SNX', logo: '/crypto/synthetix-network-token-snx-logo.png' },
      'TFUEL': { name: 'Theta Fuel', symbol: 'TFUEL', logo: '/crypto/theta-fuel-tfuel-logo.png' }
    };
    
    return cryptoMap[symbol?.toUpperCase() || 'ETH'] || cryptoMap['ETH'];
  };
  
  const cryptoDetails = getCryptoDetails(symbol || 'ETH');
  const { name: cryptoName, symbol: cryptoSymbol, logo: cryptoLogo } = cryptoDetails;
  const [activeTab, setActiveTab] = useState<'market' | 'portfolio'>('market');
  const [activeTimeRange, setActiveTimeRange] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'All'>('1M');
  const [activeTableTab, setActiveTableTab] = useState<'allocations' | 'taxlots' | 'insightssummary'>('allocations');
  const [isDarkModeState, setIsDarkModeState] = useState(isDarkMode);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as 'market' | 'portfolio');
  };
  
  const handleTimeRangeChange = (timeRange: string) => {
    setActiveTimeRange(timeRange as '1D' | '1W' | '1M' | '3M' | '1Y' | 'All');
  };
  
  const handleThemeToggle = () => {
    setIsDarkModeState(!isDarkModeState);
  };

  const tableTabs = ['Allocations', 'Tax Lots', 'Insights Summary'];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E201E] text-gray-900 dark:text-white">
      <NavigationBar 
        userName="Kristin Watson"
        isDarkMode={isDarkModeState}
        onThemeToggle={handleThemeToggle}
        onLogout={() => navigate('/login')} 
      />
      
      <div className="px-4 md:px-10 sm:px-6 md:pt-5 md:pb-2 w-full">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/dashboard" className="inline-flex items-center text-base font-normal text-[#8C8E90] dark:text-gray-400 dark:hover:text-white">
                Dashboard
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                <span className="ml-1 text-base font-medium text-[#0E201E] dark:text-gray-500 md:ml-2">
                  {cryptoName} details
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Crypto Header */}
        <div>
          <CryptoDetailHeader 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isDarkMode={isDarkMode}
            cryptoName={cryptoName}
            cryptoSymbol={cryptoSymbol}
            cryptoLogo={cryptoLogo}
          />
        </div>
        
        {/* Tab Content */}
        {activeTab === 'market' && (
          <MarketTab 
            isDarkMode={isDarkModeState}
            activeTimeRange={activeTimeRange}
            onTimeRangeChange={handleTimeRangeChange}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioTab 
            isDarkMode={isDarkModeState}
            activeTimeRange={activeTimeRange}
            onTimeRangeChange={handleTimeRangeChange}
          />
        )}

        {/* Horizontal Separator */}
        <div className="pb-6 hidden md:block">
          <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
        </div>
        
        {/* Table Tabs */}
        <div className="border-gray-100 dark:border-gray-700">
          <Tabs>
            <Tabs.List className='bg-gray-100 dark:bg-[#2F3232]'>
              {tableTabs.map((tab) => (
                <Tabs.Trigger 
                  key={tab}
                  value={tab}
                  onClick={() => setActiveTableTab(tab.toLowerCase().replace(/\s+/g, '') as any)}
                  className={`py-1.5 px-2.5 rounded-lg text-sm ${
                    activeTableTab === tab.toLowerCase().replace(/\s+/g, '')
                      ? 'bg-white dark:bg-[#0E201E] text-black dark:text-white'
                      :'text-[#0E201E] dark:text-[#FFFFFF]'
                  }`}
                >
                  {tab}
                </Tabs.Trigger >
              ))}
              <Tabs.TriggerIndicator />
            </Tabs.List>
          </Tabs>
        </div>

        {/* Allocations Table */}
        {activeTableTab === 'allocations' && (
          <AllocationTable 
            isDarkMode={isDarkModeState}
          />
        )}

        {/* Tax Lots Tab */}
        {activeTableTab === 'taxlots' && (
          <TaxLotTable 
            isDarkMode={isDarkModeState}
          />
        )}

        {/* Insights Summary Tab */}
        {activeTableTab === 'insightssummary' && (
          <InsightsSummary 
            isDarkMode={isDarkModeState}
          />
        )}
      </div>
    </div>
  );
};

export default CryptoDetailsPage;
