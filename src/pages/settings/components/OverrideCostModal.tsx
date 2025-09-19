import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface OverrideCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedTaxYears: string[], selectedCostBasisMethod: string) => void;
}

interface TaxYear {
  value: string;
  label: string;
}

interface CostBasisMethod {
  value: string;
  label: string;
  description: string;
}

const OverrideCostModal: React.FC<OverrideCostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedTaxYears, setSelectedTaxYears] = useState<string[]>([]);
  const [selectedCostBasisMethod, setSelectedCostBasisMethod] = useState<string>('');
  const [isTaxYearDropdownOpen, setIsTaxYearDropdownOpen] = useState(false);
  const [isCostBasisDropdownOpen, setIsCostBasisDropdownOpen] = useState(false);
  const taxYearRef = useRef<HTMLDivElement>(null);
  const costBasisRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (taxYearRef.current && !taxYearRef.current.contains(event.target as Node)) {
        setIsTaxYearDropdownOpen(false);
      }
      if (costBasisRef.current && !costBasisRef.current.contains(event.target as Node)) {
        setIsCostBasisDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const taxYears: TaxYear[] = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' }
  ];

  const costBasisMethods: CostBasisMethod[] = [
    { value: 'acb', label: 'ACB', description: 'Average Cost Basic' },
    { value: 'fifo', label: 'FIFO', description: 'First in First Out' },
    { value: 'lifo', label: 'LIFO', description: 'Last in First Out' },
    { value: 'hifo', label: 'HIFO', description: 'Highest in First Out' }
  ];

  const handleTaxYearToggle = (yearValue: string) => {
    setSelectedTaxYears(prev => {
      if (prev.includes(yearValue)) {
        return prev.filter(year => year !== yearValue);
      } else {
        return [...prev, yearValue];
      }
    });
  };

  const getDisplayText = () => {
    if (selectedTaxYears.length === 0) {
      return 'Select tax year';
    }
    if (selectedTaxYears.length === 1) {
      return selectedTaxYears[0];
    }
    return selectedTaxYears.join(', ');
  };

  const isSubmitDisabled = selectedTaxYears.length === 0 || !selectedCostBasisMethod;

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    onSubmit(selectedTaxYears, selectedCostBasisMethod);
  };

  const handleCancel = () => {
    setSelectedTaxYears([]);
    setSelectedCostBasisMethod('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`relative max-w-md w-full p-8 mx-4 rounded-lg shadow-lg bg-white text-gray-900
      dark:bg-gray-800 dark:text-gray-250`}>
        {/* Header */}
        <div className="flex text-left items-start justify-between">
          <div>
            <h2 className={`text-h5 font-bold text-[#191919] dark:text-gray-300`}>Override cost basis method</h2>
            <p className={`text-base mt-1.5 text-[#191919] dark:text-gray-300`}>
              Apply a different cost basis method for selected tax years, overriding your default setting.
            </p>
          </div>
          <button
            onClick={onClose}
            className={`rounded-full`}
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4 text-[#7C7C7C]" />
          </button>
        </div>

        {/* Content */}
        <div className="text-left space-y-3 mt-6">
          {/* Tax Year Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#4D5050] dark:text-gray-300">
              Tax year
            </label>
            <div className="relative" ref={taxYearRef}>
              <button
                onClick={() => setIsTaxYearDropdownOpen(!isTaxYearDropdownOpen)}
                className={`w-full flex items-center justify-between px-3 py-2 border border-[#E1E3E5] rounded-lg focus:outline-none ${
                  'bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-250'
                }`}
              >
                <span className={selectedTaxYears.length > 0 ? '' : 'text-gray-500'}>
                  {getDisplayText()}
                </span>
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className={`w-3 h-3 transition-transform ${isTaxYearDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {isTaxYearDropdownOpen && (
                <div className={`absolute z-10 w-full mt-1 border border-gray-300 rounded-lg max-h-48 overflow-y-auto ${
                  'bg-white dark:bg-gray-700 dark:border-gray-600'
                }`}>
                  {taxYears.map((year) => (
                    <button
                      key={year.value}
                      onClick={() => handleTaxYearToggle(year.value)}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center ${
                        'text-gray-900 dark:hover:bg-gray-600 dark:text-gray-250'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                        selectedTaxYears.includes(year.value)
                          ? 'border-[#90C853] bg-[#90C853]'
                          : 'border-default'
                      }`}>
                        {selectedTaxYears.includes(year.value) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>{year.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cost Basis Method Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#4D5050] dark:text-gray-300">
              Cost basis method
            </label>
            <div className="relative" ref={costBasisRef}>
              <button
                onClick={() => setIsCostBasisDropdownOpen(!isCostBasisDropdownOpen)}
                className={`w-full flex items-center justify-between px-3 py-2 border border-[#E1E3E5] rounded-lg focus:outline-none ${
                  'bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-250'
                }`}
              >
                <span className={selectedCostBasisMethod ? '' : 'text-gray-500'}>
                  {selectedCostBasisMethod || 'Select cost basis method'}
                </span>
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className={`w-3 h-3 transition-transform ${isCostBasisDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {isCostBasisDropdownOpen && (
                <div className={`absolute z-10 w-full mt-1 border border-gray-300 rounded-lg ${
                  'bg-white dark:bg-gray-700 dark:border-gray-600'
                }`}>
                  {costBasisMethods.map((method) => (
                    <button
                      key={method.value}
                      onClick={() => {
                        setSelectedCostBasisMethod(method.label);
                        setIsCostBasisDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${
                        'text-gray-900 dark:hover:bg-gray-600 dark:text-gray-250'
                      } ${selectedCostBasisMethod === method.label ? 'bg-gray-100' : ''}`}
                    >
                      <div>
                        <div className="font-medium">{method.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleCancel}
            className={`px-4 py-3 font-medium ${
              'text-[#7C7C7C] dark:text-gray-300 dark:hover:text-white'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              isSubmitDisabled
                ? 'bg-[#E1E3E5] text-[#8C8E90] cursor-not-allowed'
                : 'bg-[#90C853] text-[#0E201E] hover:bg-[#7AB342] cursor-pointer'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverrideCostModal;
