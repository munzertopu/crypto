import React, { useState } from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import DateRangeSelector from '../../../components/DateRangeSelector';
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { cryptoAssets, formatCurrency, formatCryptoAmount } from '../../../data/cryptoAssets';
import AssetDetailModal from '../components/AssetDetailModal';

interface TaxOptimizationTabProps {}

const TaxOptimizationTab: React.FC<TaxOptimizationTabProps> = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-05-29')
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [tooltipOpen, setTooltipOpen] = useState<string | null>(null);

  const TABLE_HEAD = ["Asset", "Market Value", "Potential Gains", "Amount held<12m.", "Long term gains", "Amount Held(>12m.)", "Short vs Long %"];

  const handleEyeClick = (asset: any, event: React.MouseEvent) => {
    // Toggle modal - if same asset is already open, close it
    if (modalOpen && selectedAsset && selectedAsset.id === asset.id) {
      setModalOpen(false);
      setSelectedAsset(null);
      return;
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    const modalHeight = 200; // Approximate modal height
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    let top = rect.bottom + 5; // Default: below the icon
    if (spaceBelow < modalHeight && spaceAbove > modalHeight) {
      top = rect.top - modalHeight - 5; // Above the icon if not enough space below
    }
    
    setModalPosition({ top, left: rect.left });
    setSelectedAsset(asset);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAsset(null);
  };

  const handleTooltipShow = (assetId: string) => {
    setTooltipOpen(assetId);
  };

  const handleTooltipHide = () => {
    setTooltipOpen(null);
  };

  
  const ShortVsLongBar: React.FC<{ shortPercentage: number; longPercentage: number }> = ({
    shortPercentage,
    longPercentage
  }) => {
    return (
      <div className="flex items-center space-x-2">
        <div 
          className="flex-1 h-5 bg-[#75AE46] rounded-full overflow-hidden"
          role="progressbar"
          aria-label={`Long term: ${longPercentage}%, Short term: ${shortPercentage}%`}
          aria-valuenow={longPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-[#8C5DF3] transition-all duration-300"
            style={{ width: `${longPercentage}%` }}
            aria-label={`Long term holdings: ${longPercentage}%`}
          />
          <div 
            className="h-full bg-[#75AE46] transition-all duration-300"
            style={{ width: `${shortPercentage}%` }}
            aria-label={`Short term holdings: ${shortPercentage}%`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Date Range and Legend Row */}
      <div className="flex justify-between items-center">
        {/* Date Range Selector - Left */}
        <div className="flex-1 max-w-xs">
          <DateRangeSelector
            selectedDateRange={selectedDateRange}
            onDateRangeChange={setSelectedDateRange}
            variant="inline"
          />
        </div>

        {/* Legend - Right */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className={'text-gray-700 dark:text-[#B6B8BA]'}>Long term</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className={'text-gray-700 dark:text-[#B6B8BA]'}>Short term</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <Card className={`h-full w-full border-transparent bg-transparent`}>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left" role="table" aria-label="Tax optimization cryptocurrency holdings">
               <thead className={`bg-table-header dark:bg-gray-800`}>
                 <tr role="row" className='bg-white dark:bg-[#0E201E]'>
                   <th>
                     
                   </th>
                   <th>
                   </th>
                   <th className='py-2'>
                     <span className="text-sm px-2 py-1 rounded-lg font-normal text-[#5F9339] bg-[#E3F3C7] dark:text-[#B6B8BA] dark:bg-transparent">
                       Short term
                     </span>
                   </th>
                   <th>
                   </th>
                   <th className='py-2'>
                     <span className="text-sm px-2 py-1 rounded-lg font-normal text-[#8C5DF3] bg-[#8C5DF31F] dark:text-[#B6B8BA] dark:bg-transparent">
                       Long term
                     </span>
                   </th>
                 </tr>
                 {/* Column Headers Row */}
                 <tr role="row">
                  {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`cursor-pointer px-3 py-3.5 ${
                      index === 0 ? "rounded-l-xl" : ""
                    } ${index === TABLE_HEAD.length - 1 ? "rounded-r-md" : ""}
                    ${head === "Potential Gains" ? "border-l-2 border-green-500" : ""}
                    ${head === "Long term gains" ? "border-l-2 border-[#8C5DF3]" : ""}
                    `}
                  >
                    <Typography
                      variant="small"
                      className="flex items-center gap-1.5 font-normal text-sm leading-none 
                        text-[#666868] dark:text-[#B6B8BA]"
                    >
                      {head}{" "}
                      {index !== 0 && index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                          role="button"
                          aria-label={`Sort by ${head}`}
                        />
                      )}
                    </Typography>
                  </th>
                ))}
                 </tr>
               </thead>
              <tbody>
                {cryptoAssets.map((asset, index) => (
                  <tr 
                    key={asset.id}
                    className={`border-b border-transparent`}
                    role="row"
                  >
                    {/* Asset */}
                     <td className="px-6 py-4" role="cell">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                           <img 
                             src={asset.logo} 
                             alt={`${asset.name} logo`}
                             className="w-6 h-6 rounded-full"
                           />
                          <div>
                            <Typography 
                              variant="small" 
                              className={`text-base font-normal text-primary
                                  dark:text-[#F3F5F7]`}
                             >
                               {asset.name}
                             </Typography>
                           </div>
                         </div>
                         <svg 
                             xmlns="http://www.w3.org/2000/svg" 
                             fill="none" 
                             viewBox="0 0 24 24" 
                             strokeWidth={1.5} 
                             stroke="currentColor" 
                             className={`size-4 cursor-pointer transition-all duration-200 ${
                               modalOpen && selectedAsset && selectedAsset.id === asset.id
                                 ? 'ring-1 ring-green-500 ring-offset-2 rounded-sm'
                                 : 'text-[#7C7C7C] dark:text-[#F3F5F7]'
                             }`}
                             onClick={(e) => handleEyeClick(asset, e)}
                           >
                           <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                           <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                         </svg>
                       </div>
                     </td>
                    
                    {/* Market Value */}
                      <td className="px-6 py-4 text-left" role="cell">
                        <Typography variant="small" className={`font-normal text-primary dark:text-[#F3F5F7]`}>
                          {formatCurrency(asset.marketValue)}
                        </Typography>
                      </td>

                      {/* Potential Gains */}
                      <td className="px-6 border-l-2 border-[#75ae46] py-4 text-left" role="cell">
                        <Typography variant="small" className={`font-normal text-primary dark:text-[#F3F5F7]`}>
                          {formatCurrency(asset.shortTerm.potentialGains)}
                        </Typography>
                      </td>
                      
                      {/* Amount Held <12m */}
                      <td className="px-6 py-4 text-left relative" role="cell">
                        <div 
                          className="cursor relative"
                          onMouseEnter={() => asset.shortTerm.longTermTransitionDate && handleTooltipShow(asset.id)}
                          onMouseLeave={handleTooltipHide}
                        >
                          <Typography variant="small" className={`font-normal text-primary dark:text-[#F3F5F7]`}>
                            {formatCryptoAmount(asset.shortTerm.amountHeldValue, asset.shortTerm.amountHeldUnit)}
                          </Typography>
                          
                          {/* Tooltip */}
                          {tooltipOpen === asset.id && asset.shortTerm.longTermTransitionDate && (
                            <div
                              className="absolute z-50 px-3 py-2 text-sm rounded-lg shadow-lg border whitespace-nowrap bg-[#0E201E] dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-white"
                              style={{
                                top: '25px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                              }}
                            >
                              <div className="relative">
                                {/* Caret pointing down */}
                                <div 
                                  className={`absolute w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                                    'border-t-white dark:border-t-gray-800'
                                  }`}
                                  style={{
                                    bottom: '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                  }}
                                />
                                <div className="text-center">
                                  This asset will become a long-term holding in {asset.shortTerm.monthsUntilLongTerm} months ({asset.shortTerm.longTermTransitionDate})
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Long term gains */}
                      <td className="px-6 py-4 border-l-2 border-[#8C5DF3] text-left" role="cell">
                        <Typography variant="small" className={`font-normal text-primary dark:text-[#F3F5F7]`}>
                          {formatCurrency(asset.longTerm.potentialGains)}
                        </Typography>
                      </td>

                      {/* Amount Held (>12m) */}
                      <td className="px-6 py-4 text-left" role="cell">
                        <Typography variant="small" className={`font-normal text-primary dark:text-[#F3F5F7]`}>
                          {formatCryptoAmount(asset.longTerm.amountHeldValue, asset.longTerm.amountHeldUnit)}
                        </Typography>
                      </td>
                      
                      {/* Short vs Long % */}
                      <td className="px-6 py-4 text-left relative" role="cell">
                        <div 
                          className="relative"
                          onMouseEnter={() => handleTooltipShow(asset.id + '-shortVsLong')}
                          onMouseLeave={handleTooltipHide}
                        >
                          <ShortVsLongBar 
                            shortPercentage={asset.shortVsLongPercentage.short}
                            longPercentage={asset.shortVsLongPercentage.long}
                          />
                          
                          {/* Tooltip */}
                          {tooltipOpen === asset.id + '-shortVsLong' && (
                            <div
                              className="absolute z-50 px-3 py-2 text-sm rounded-lg whitespace-nowrap bg-[#0E201E] dark:bg-gray-800 dark:border-gray-600 text-white"
                              style={{
                                top: '25px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                              }}
                            >
                              <div className="relative">
                                {/* Caret pointing down */}
                                <div 
                                  className={`absolute w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                                    'border-t-white dark:border-t-gray-800'
                                  }`}
                                  style={{
                                    bottom: '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                  }}
                                />
                                <div className="text-center">
                                  Short Term Gain: {asset.shortVsLongPercentage.short}%
                                  <br />
                                  Long Term Gain: {asset.shortVsLongPercentage.long}%
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
         </CardBody>
       </Card>
       
       {/* Asset Details Modal */}
       <AssetDetailModal
         isOpen={modalOpen}
         selectedAsset={selectedAsset}
         modalPosition={modalPosition}
         onClose={handleCloseModal}
       />
     </div>
   );
 };

export default TaxOptimizationTab;
