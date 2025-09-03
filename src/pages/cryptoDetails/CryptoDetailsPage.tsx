import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../../components/NavigationBar';
import PortfolioChart from '../../components/PortfolioChart';
import CryptoDetailHeader from './components/CryptoDetailHeader';
import AllocationTable from './components/AllocationTable';
import TaxLotTable from './components/TaxLotTable';
import InsightsSummary from './components/InsightsSummary';
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

  const timeRanges = ['1D', '1W', '1M', '3M', '1Y', 'All time'];
  const tableTabs = ['Allocations', 'Tax Lots', 'Insights Summary'];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E201E] text-gray-900 dark:text-white">
      <NavigationBar 
        isDarkMode={isDarkModeState} 
        onThemeToggle={handleThemeToggle}
        onLogout={() => navigate('/login')} 
      />
      
      <div className="mx-10 my-4">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Dashboard
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                <span className="ml-1 text-sm font-bold text-gray-500 dark:text-gray-500 md:ml-2">
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
        {/* Market Performance Section */}
        <div className="mb-6 bg-white dark:bg-[#0E201E]">
           {/* Header and Time Range in one row */}
           <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-semibold text-left text-[#0E201E] dark:text-[#E1E3E5]">Market Performance</h2>
             {/* Time Range Selector */}
             <div className="border-gray-200 dark:border-gray-700">
                 <Tabs>
                     <Tabs.List className='bg-gray-200 dark:bg-[#2F3232]'>
                         {timeRanges.map((timeRange) => (
                             <Tabs.Trigger 
                                 key={timeRange}
                                 value={timeRange}
                                 onClick={() => handleTimeRangeChange?.(timeRange)}
                                 className={`py-2 px-3 rounded-md ${
                                 activeTimeRange === timeRange
                                     ? 'bg-white dark:bg-[#0E201E] text-black dark:text-white'
                                      :'text-[#0E201E] dark:text-[#FFFFFF]'
                                 }`}
                             >
                             {timeRange}
                             </Tabs.Trigger >
                         ))}
                         <Tabs.TriggerIndicator />
                     </Tabs.List>
                 </Tabs>
             </div>
           </div>

          {/* Chart */}
          <PortfolioChart 
            isDarkMode={isDarkModeState} 
            chartColor="#3A6FF8"
          />
        </div>

        {/* Table Tabs */}
        <div className="border-gray-200 dark:border-gray-700">
          <Tabs>
            <Tabs.List className='bg-gray-200 dark:bg-[#2F3232]'>
              {tableTabs.map((tab) => (
                <Tabs.Trigger 
                  key={tab}
                  value={tab}
                  onClick={() => setActiveTableTab(tab.toLowerCase().replace(/\s+/g, '') as any)}
                  className={`py-2 px-3 rounded-md ${
                    activeTableTab === tab.toLowerCase().replace(/\s+/g, '')
                      ? 'bg-white dark:bg-[#0E201E] text-black dark:text-white'
                      : 'text-[#0E201E] dark:text-[#FFFFFF]'
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
