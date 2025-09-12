import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown,
  faChevronUp,
  faCheck,
  faClock,
  faChartBar,
  faPercent,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, Typography } from "@material-tailwind/react";

interface TaxLossHarvestingCardsProps {
  isDarkMode?: boolean;
}

interface MetricData {
  shortTermGains: string;
  longTermGains: string;
  totalCapitalLosses: string;
  netCapitalGainLoss: string;
}

const TaxLossHarvestingCards: React.FC<TaxLossHarvestingCardsProps> = ({
}) => {
  const [selectedAsset, setSelectedAsset] = useState('All Assets');
  const [assetDropdownOpen, setAssetDropdownOpen] = useState(false);
  const [assetSearchTerm, setAssetSearchTerm] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const assetDropdownRef = useRef<HTMLDivElement>(null);

  // Asset options for the dropdown
  const assetOptions = [
    { id: 'all', name: 'All'},
    { id: 'ethereum', name: 'Ethereum', logo: 'crypto/ethereum-eth-logo.png' },
    { id: 'bitcoin', name: 'Bitcoin', logo: 'crypto/bitcoin-btc-logo.png' },
    { id: 'phantom', name: 'Phantom', logo: 'crypto/pahton.png' },
    { id: 'kraken', name: 'Kraken', logo: 'crypto/kraken.png' },
    { id: 'metamask', name: 'Meta mask', logo: 'crypto/metamask.png' },
    { id: 'solana', name: 'Solana', logo: 'crypto/solana-sol-logo.png' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (assetDropdownRef.current && !assetDropdownRef.current.contains(event.target as Node)) {
        setAssetDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredAssetOptions = assetOptions.filter(option =>
    option.name.toLowerCase().includes(assetSearchTerm.toLowerCase())
  );

  const handleAssetToggle = (assetId: string) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  // Mock data for the cards
  const realizedGains: MetricData = {
    shortTermGains: '$45,000',
    longTermGains: '$160,000',
    totalCapitalLosses: '$18,300',
    netCapitalGainLoss: '$186,700'
  };

  const postHarvestGains: MetricData = {
    shortTermGains: '$42,000',
    longTermGains: '$155,000',
    totalCapitalLosses: '$23,500',
    netCapitalGainLoss: '$173,500'
  };

  // Reusable metric item component
  const MetricItem: React.FC<{
    icon: any;
    label: string;
    value: string;
    valueColor?: string;
  }> = ({ icon, label, value, valueColor = "text-gray-900 dark:text-[#CDCFD1]" }) => (
    <div className='space-y-3'>
      <div className="flex items-center space-x-3">
        <FontAwesomeIcon icon={icon} className={`w-5 h-5 text-[#7C7C7C] dark:text-[#CDCFD1]`} />
        <Typography variant="small" className="text-[#0E201E] dark:text-[#B6B8BA]">{label}</Typography>
      </div>
      <Typography variant="small" className={`text-left text-h4 font-semibold ${valueColor}`}>{value}</Typography>
    </div>
  );

  const MetricCard: React.FC<{ 
    title: string; 
    metrics: MetricData;
    showDropdown?: boolean;
  }> = ({ title, metrics, showDropdown = false }) => (
    <Card className={`py-6 bg-white dark:bg-transparent 
      border border-default dark:border-[#E1E3E5] overflow-hidden`}>
      <CardBody className="p-0 overflow-hidden">
        <div className="flex items-center justify-between mb-4 px-8">
          <div className="flex items-center space-x-2">
            <Typography variant="h2" className={`text-h6 font-semibold text-gray-900 dark:text-[#B6B8BA]`}>
              {title}
            </Typography>
            <svg className="w-5 h-5 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
            </svg>
          </div>
          {showDropdown && (
             <div className="relative mb-4" ref={assetDropdownRef}>
              <button
                onClick={() => setAssetDropdownOpen(!assetDropdownOpen)}
                className={`flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-lg text-sm 
                  bg-white border-gray-300 text-gray-700'
                  dark:bg-transparent
                `}
              >
                <span className={'text-gray-700  dark:text-[#F3F5F7]'}>
                   All Assets
                 </span>
                <FontAwesomeIcon 
                  icon={assetDropdownOpen ? faChevronUp : faChevronDown} 
                  className="w-3 h-3 text-gray-500 dark:text-[#F3F5F7]" 
                />
              </button>
              
              {assetDropdownOpen && (
                <div className={`absolute top-full right-0 mt-1 w-52 rounded-lg border shadow-lg z-50 bg-white border-gray-300
                  dark:bg-gray-800 dark:border-gray-600'
                `}>
                  {/* Search Input */}
                  <div className="px-3 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Type asset name"
                      value={assetSearchTerm}
                      onChange={(e) => setAssetSearchTerm(e.target.value)}
                      className={`w-full px-3 py-2 rounded text-sm text-gray-900 placeholder-gray-500 
                        dark:text-white dark:placeholder-gray-400 focus:outline-none`}
                    />
                  </div>
                  
                  {/* Wallet Options List */}
                  <div className="max-h-48 overflow-y-auto">
                    {filteredAssetOptions.map((option) => {
                      const isSelected = selectedAssets.includes(option.id);
                      return (
                        <div
                          key={option.id}
                          onClick={() => handleAssetToggle(option.id)}
                          className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 hover:bg-gray-50
                          `}
                        >
                          <div className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-3 transition-colors ${
                            isSelected 
                              ? 'bg-[#90C853] border-[#90C853]' 
                              : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <FontAwesomeIcon 
                                icon={faCheck} 
                                className="w-2.5 h-2.5 text-white" 
                              />
                            )}
                          </div>
                          {option.name !== 'All' &&
                            <img src={option.logo} className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3`}>
                            </img>
                          }
                          <span className={`text-sm text-gray-900 dark:text-white`}>
                            {option.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 px-8">
          <MetricItem
            icon={faClock}
            label="Short Terms Gains"
            value={metrics.shortTermGains}
          />
          <MetricItem
            icon={faChartBar}
            label="Long Terms Gains"
            value={metrics.longTermGains}
          />
        </div>
        
        {/* Horizontal Separator */}
        <div className="py-4">
          <div className={`w-full h-px bg-default dark:bg-gray-700`}></div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-8">
          <MetricItem
            icon={faPercent}
            label="Total Capital Losses"
            value={metrics.totalCapitalLosses}
          />
          
          <MetricItem
            icon={faChartLine}
            label="Net Capital Gain/Loss"
            value={metrics.netCapitalGainLoss}
          />
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MetricCard title="Realized Capital Gains" metrics={realizedGains} />
      <MetricCard title="Post-Harvest Capital Gains" metrics={postHarvestGains} showDropdown={true} />
    </div>
  );
};

export default TaxLossHarvestingCards;
