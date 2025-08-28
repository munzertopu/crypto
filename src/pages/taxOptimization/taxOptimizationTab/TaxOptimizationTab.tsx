import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import DateRangeSelector from '../../../components/DateRangeSelector';
import { cryptoAssets, formatCurrency, formatCryptoAmount, modalTableData } from '../../../data/cryptoAssets';

interface TaxOptimizationTabProps {
  isDarkMode?: boolean;
}

const TaxOptimizationTab: React.FC<TaxOptimizationTabProps> = ({
  isDarkMode = false
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-05-29')
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const [tooltipOpen, setTooltipOpen] = useState<string | null>(null);

  const TABLE_HEAD = ["Asset", "Market Value", "Potential Gains", "Amount held<12m.", "Long term gains", "Amount Held(>12m.)", "Short vs Long %"];
  const MODAL_TABLE_HEAD = ["Wallet", "Balance", "Price ($)", "Value ($)"];

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

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseModal();
      }
    };

    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);



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
    <div className="space-y-6">
             {/* Date Range and Legend Row */}
       <div className="flex justify-between items-center">
         {/* Date Range Selector - Left */}
         <div className="flex-1 max-w-xs">
           <DateRangeSelector
             selectedDateRange={selectedDateRange}
             onDateRangeChange={setSelectedDateRange}
             isDarkMode={isDarkMode}
             variant="inline"
           />
         </div>

        {/* Legend - Right */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Long term</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Short term</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <Card className={`h-full w-full border-transparent bg-transparent`}>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left" role="table" aria-label="Tax optimization cryptocurrency holdings">
               <thead className={`${isDarkMode ? "bg-[#2F3232]" : "bg-[#F3F5F7]"}`}>
                 <tr role="row" className='bg-white'>
                   <th>
                     
                   </th>
                   <th>
                   </th>
                   <th className='py-2'>
                     <span className={`text-md px-2 py-1 rounded-lg font-normal ${isDarkMode ? "text-[#B6B8BA]" : "text-[#5F9339] bg-[#E3F3C7]"}`}>
                       Short term
                     </span>
                   </th>
                   <th>
                   </th>
                   <th className='py-2'>
                     <span className={`text-md px-2 py-1 rounded-lg font-normal ${isDarkMode ? "text-[#B6B8BA]" : "text-[#8C5DF3] bg-[#8C5DF31F]"}`}>
                       Long term
                     </span>
                   </th>
                 </tr>
                 {/* Column Headers Row */}
                 <tr role="row">
                  <th className="p-4">
                      <div className={`text-lg font-normal leading-none ${isDarkMode ? "text-[#B6B8BA]" : "text-[#666868]"}`}>
                        Asset
                      </div>
                    </th>
                   <th className="p-4">
                     <div className={`flex text-lg items-center justify-between gap-2 font-normal leading-none ${isDarkMode ? "text-[#B6B8BA]" : "text-[#666868]"}`}>
                       Market Value
                       <div className="flex flex-col" role="button" aria-label="Sort by Market Value">
                         <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3" aria-hidden="true" />
                         <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" aria-hidden="true" />
                       </div>
                     </div>
                   </th>
                   <th className={`p-4 border-l-2 border-green-500`}>
                     <div className={`flex text-lg items-center justify-between gap-2 font-normal leading-none ${isDarkMode ? "text-[#B6B8BA]" : "text-[#666868]"}`}>
                       Potential Gains
                       <div className="flex flex-col" role="button" aria-label="Sort by Potential Gains">
                         <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3" aria-hidden="true" />
                         <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" aria-hidden="true" />
                       </div>
                     </div>
                   </th>
                   <th className="p-4">
                     <div className={`flex text-lg items-center justify-between gap-2 font-normal leading-none ${isDarkMode ? "text-[#B6B8BA]" : "text-[#666868]"}`}>
                       Amount held&lt;12m.
                       <div className="flex flex-col" role="button" aria-label="Sort by Amount held">
                         <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3" aria-hidden="true" />
                         <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" aria-hidden="true" />
                       </div>
                     </div>
                   </th>
                   <th className={`p-4 border-l-2 border-[#8C5DF3]`}>
                     <div className={`flex text-lg items-center justify-between gap-2 font-normal leading-none ${isDarkMode ? "text-[#B6B8BA]" : "text-[#666868]"}`}>
                       Long term gains
                       <div className="flex flex-col" role="button" aria-label="Sort by Long term gains">
                         <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3" aria-hidden="true" />
                         <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" aria-hidden="true" />
                       </div>
                     </div>
                   </th>
                   <th className="p-4">
                     <div className={`flex text-lg items-center justify-between gap-2 font-normal leading-none ${isDarkMode ? "text-[#B6B8BA]" : "text-[#666868]"}`}>
                       Amount Held(&gt;12m.)
                       <div className="flex flex-col" role="button" aria-label="Sort by Amount Held">
                         <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3" aria-hidden="true" />
                         <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" aria-hidden="true" />
                       </div>
                     </div>
                   </th>
                   <th className="p-4">
                     <div className={`text-lg font-normal leading-none ${isDarkMode ? "text-[#B6B8BA]" : "text-[#666868]"}`}>
                       Short vs Long %
                     </div>
                   </th>
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
                             className="w-8 h-8 rounded-full"
                           />
                           <div>
                             <Typography variant="small" className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                               {asset.name}
                             </Typography>
                             <Typography variant="small" className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                               {asset.symbol}
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
                                 : isDarkMode 
                                   ? 'text-gray-400 hover:text-gray-300'
                                   : 'text-[#7C7C7C] hover:text-gray-700'
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
                        <Typography variant="small" className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {formatCurrency(asset.marketValue)}
                        </Typography>
                      </td>

                      {/* Potential Gains */}
                      <td className="px-6 border-l-2 border-[#75ae46] py-4 text-left" role="cell">
                        <Typography variant="small" className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
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
                             <Typography variant="small" className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                               {formatCryptoAmount(asset.shortTerm.amountHeldValue, asset.shortTerm.amountHeldUnit)}
                             </Typography>
                             
                             {/* Tooltip */}
                             {tooltipOpen === asset.id && asset.shortTerm.longTermTransitionDate && (
                               <div
                                 className={`absolute z-50 px-3 py-2 text-sm rounded-lg shadow-lg border whitespace-nowrap ${
                                   isDarkMode 
                                     ? 'bg-gray-800 border-gray-600 text-white' 
                                     : 'bg-[#0E201E] border-gray-300 text-white'
                                 }`}
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
                                       isDarkMode ? 'border-t-gray-800' : 'border-t-white'
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
                        <Typography variant="small" className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {formatCurrency(asset.longTerm.potentialGains)}
                        </Typography>
                      </td>

                      {/* Amount Held (>12m) */}
                      <td className="px-6 py-4 text-left" role="cell">
                        <Typography variant="small" className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
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
                               className={`absolute z-50 px-3 py-2 text-sm rounded-lg whitespace-nowrap ${
                                 isDarkMode 
                                   ? 'bg-gray-800 border-gray-600 text-white' 
                                   : 'bg-[#0E201E] text-white'
                               }`}
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
                                     isDarkMode ? 'border-t-gray-800' : 'border-t-white'
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
        {modalOpen && selectedAsset && (
          <div
            ref={modalRef}
            className={`fixed z-50 w-1/2 rounded-lg shadow-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            style={{
              top: `${modalPosition.top}px`
            }}
          >
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full min-w-max table-auto text-left">
                  <thead className={`${isDarkMode ? "bg-[#2F3232]" : "bg-[#F3F5F7]"}`}>
                    <tr>
                      {MODAL_TABLE_HEAD.map((head, index) => (
                        <th
                          key={head}
                          className={`cursor-pointer p-3 ${index === 0 ? 'rounded-l-md' : ''} ${index === MODAL_TABLE_HEAD.length - 1 ? 'rounded-r-md' : ''}`}
                        >
                          <div className={`flex text-sm items-center justify-between gap-2 font-normal leading-none ${isDarkMode ? "text-[#B6B8BA]" : "text-[#666868]"}`}>
                            {head}
                            <div className="flex flex-col" role="button" aria-label={`Sort by ${head}`}>
                              <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3" aria-hidden="true" />
                              <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" aria-hidden="true" />
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {modalTableData.map((row) => (
                      <tr key={row.id} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center`}>
                              <img src={row.logo} />
                            </div>
                            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {row.wallet}
                            </span>
                          </div>
                        </td>
                                                 <td className={`p-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                           {row.balance}
                         </td>
                         <td className={`p-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                           {row.price}
                         </td>
                         <td className={`p-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                           {row.value}
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
     </div>
   );
 };

export default TaxOptimizationTab;
