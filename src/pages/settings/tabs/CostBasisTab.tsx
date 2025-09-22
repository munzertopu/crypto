import React, { useState } from 'react';
import { Typography, Button } from "@material-tailwind/react";
import OverrideCostModal from '../components/OverrideCostModal';

interface CostBasisTabProps {
  
}

interface CostBasisMethod {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

interface TaxRule {
  id: string;
  name: string;
  enabled: boolean;
}

interface OverrideCard {
  costBasisMethod: string;
  taxYears: string[];
}

const CostBasisTab: React.FC<CostBasisTabProps> = ({  }) => {
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [overrideCard, setOverrideCard] = useState<OverrideCard | null>(null);
  const [costBasisMethods, setCostBasisMethods] = useState<CostBasisMethod[]>([
    { id: 'acb', name: 'ACB', description: 'Average Cost Basic', selected: false },
    { id: 'fifo', name: 'FIFO', description: 'First in First Out', selected: true },
    { id: 'lifo', name: 'LIFO', description: 'Last in Fist Out', selected: false },
    { id: 'hifo', name: 'HIFO', description: 'Highest in First Out', selected: false }
  ]);

  const [taxRules, setTaxRules] = useState<TaxRule[]>([
    { id: 'wallet-cost-tracking', name: 'Wallet based cost-tracking', enabled: false },
    { id: 'crypto-trades', name: 'Realize gains on crypto -> crypto trades?', enabled: false },
    { id: 'liquidity-transactions', name: 'Realize gains on liquidity transactions?', enabled: false },
    { id: 'transfer-fees', name: 'Realize gains on transfer fees?', enabled: false },
    { id: 'deductible-costs', name: 'Treat transfer fees as deductible costs?', enabled: false },
    { id: 'capital-gains', name: 'Treat other gains as capital gains', enabled: false },
    { id: 'cashbacks-refunds', name: 'Treat cashbacks and fee refunds as zero-cost deposits?', enabled: false }
  ]);

  const handleCostBasisMethodSelect = (methodId: string) => {
    setCostBasisMethods(prev => 
      prev.map(method => ({
        ...method,
        selected: method.id === methodId
      }))
    );
  };

  const handleTaxRuleToggle = (ruleId: string) => {
    setTaxRules(prev => 
      prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, enabled: !rule.enabled }
          : rule
      )
    );
  };

  const handleRecalculate = () => {
    console.log('Recalculate clicked');
  };

  const handleSaveChanges = () => {
    console.log('Save changes clicked');
  };

  const handleAddOverride = () => {
    setIsOverrideModalOpen(true);
  };

  const handleCloseOverrideModal = () => {
    setIsOverrideModalOpen(false);
  };

  const handleOverrideSubmit = (selectedTaxYears: string[], selectedCostBasisMethod: string) => {
    const newOverride: OverrideCard = {
      costBasisMethod: selectedCostBasisMethod,
      taxYears: selectedTaxYears
    };
    setOverrideCard(newOverride);
    setIsOverrideModalOpen(false);
    
    // Show loading modal for 2 seconds
    setIsLoadingModalOpen(true);
    setTimeout(() => {
      setIsLoadingModalOpen(false);
      // Show notification for 2 seconds after loading modal closes
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }, 2000);
  };

  const handleRemoveOverride = () => {
    setOverrideCard(null);
  };

  const getYearRangeText = (years: string[]) => {
    if (years.length === 1) {
      return years[0];
    }
    return `${years[years.length - 1]}-${years[0]}`;
  };

  return (
    <div>
      {/* Cost Basis Section */}
      <div className="space-y-4">
        <div>
          <Typography variant="h4" className={`font-medium text-sm text-left mb-2 text-gray-900 dark:text-gray-150`}>
            Cost Basis
          </Typography>
          <Typography variant="small" className={`text-left text-sm text-700 dark:text-gray-400`}>
            This affects how your crypto gains and losses are calculated.
          </Typography>
        </div>

        {/* Cost Basis Method */}
        <div>
          <div className="flex items-center mt-6 mb-2 space-x-2">
            <Typography variant="h6" className={`font-medium text-[#2F3232] dark:text-white`}>
              Cost Basis Method
            </Typography>
            <svg className="size-4 text-[#7C7C7C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
            </svg>
          </div>

          {/* Radio Button Options */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {costBasisMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handleCostBasisMethodSelect(method.id)}
                className={`relative cursor-pointer border rounded-lg px-5 py-4 transition-all shadow-sm border-default bg-transparent 
                  dark:border-gray-700
                  `}
              >
                {/* Radio Button */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold text-base text-[#0E201E] dark:text-white`}>
                    {method.name}
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    method.selected 
                      ? 'border-[#75AE46]' 
                      : 'border-gray-700'
                  }`}>
                    {method.selected && (
                      <div className="w-4 h-4 bg-transparent rounded-full flex items-center justify-center">
                        <div className='w-3 h-3 bg-[#75AE46] rounded-full' />
                      </div>
                    )}
                  </div>
                </div>
                <div className={`text-sm text-left text-[#4D5050] dark:text-gray-300`}>
                  {method.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Horizontal Separator */}
      <div className="py-6 hidden md:block">
        <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
      </div>

      {/* Override Cost Section */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h4" className={`font-bold text-lg text-left mb-2 text-gray-900 dark:text-gray-150`}>
              Override cost
            </Typography>
            <Typography variant="small" className={`text-left text-sm text-gray-500 dark:text-gray-400`}>
              You can override the cost basis method for previous years by creating migrations.
            </Typography>
          </div>
          {!overrideCard && (
            <button 
              onClick={handleAddOverride}
              className="text-[#5F9339] font-medium hover:underline"
            >
              + Add override
            </button>
          )}
        </div>

        {/* Override Card */}
        {overrideCard && (
          <div
            className={`relative w-full sm:w/2 lg:w-1/4 bg-white border border-[#E1E3E5] rounded-lg px-5 py-4 mt-2`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className={`font-bold text-lg text-[#0E201E] dark:text-white`}>
                  {overrideCard.costBasisMethod}
                </div>
                <div className={`text-sm text-[#0E201E] dark:text-gray-300`}>
                  {getYearRangeText(overrideCard.taxYears)}
                </div>
              </div>
              <button
                onClick={handleRemoveOverride}
                className={`p-2 rounded-full hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600`}
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Horizontal Separator */}
        <div className="py-6 hidden md:block">
          <div className="w-full h-px bg-gray-150 dark:bg-[#2F3232]"></div>
        </div>
      </div>

      {/* Tax Calculation Rules Section */}
      <div className="space-y-4 mb-5">
        <Typography variant="h4" className={`font-bold text-left mb-4 text-[#0E201E] dark:text-white`}>
          Tax Calculation Rules
        </Typography>

        <div className="space-y-2">
          {taxRules.map((rule) => (
            <div key={rule.id} className="flex items-center py-3">
              {/* Toggle Switch */}
              <button
                onClick={() => handleTaxRuleToggle(rule.id)}
                className={`relative inline-flex h-6 w-11 mr-3 items-center rounded-full transition-colors ${
                  rule.enabled ? 'bg-[#90C853]' : 'bg-[#CDCFD1] dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:bg-gray-900 ${
                    rule.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-base text-left text-[#0E201E] dark:text-gray-300`}>
                {rule.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 my-8">
        <Button
          onClick={handleRecalculate}
          className={`border-[#E1E3E5] px-5 py-3 rounded-lg font-medium bg-white border-[#E1E3E5] text-[#0E201E]
            dartk:border-gray-600 dartk:text-gray-300
          `}
        >
          Recalculate
        </Button>
        
        <Button
          onClick={handleSaveChanges}
          className="bg-[#90C853] text-[#0E201E] px-5 py-3 rounded-lg font-medium border-0"
        >
          Save changes
        </Button>
      </div>

      {/* Override Cost Modal */}
      <OverrideCostModal
        isOpen={isOverrideModalOpen}
        onClose={handleCloseOverrideModal}
        onSubmit={handleOverrideSubmit}
      />

      {/* Loading Modal */}
      {isLoadingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-16 py-8 flex flex-col items-center">
            {/* Loading Spinner */}
            <div className="w-14 h-14 border-8 border-gray-200 border-t-[#90C853] rounded-full animate-spin mb-4"></div>
            
            {/* Title */}
            <h2 className="text-xl font-bold text-[#191919] mb-2">
              Recalculating the value
            </h2>
            
            {/* Description */}
            <p className="text-[#191919]">
              Hold on, this may take few seconds.
            </p>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-px right-4 bg-white border border-[#419F45] rounded-xl shadow-lg z-50 py-3 max-w-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1 px-4">
              {/* First row: Tick mark and text */}
              <div className="flex items-center space-x-3 mb-2">
                {/* Green checkmark icon */}
                <div className="w-6 h-6 bg-[#419F45] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Main message */}
                <p className="text-[#0E201E] font-medium">
                  The tax was recalculated
                </p>
              </div>
              
              {/* Second row: Action buttons */}
              <div className="flex space-x-4 text-sm">
                <button 
                  onClick={() => setShowNotification(false)}
                  className="text-[#5F9339] font-medium"
                >
                  Refresh
                </button>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="text-[#4D5050] font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
            
            {/* Dismiss X button */}
            <div className='px-3'>
              <button 
                onClick={() => setShowNotification(false)}
                className="text-[#7C7C7C]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostBasisTab;
