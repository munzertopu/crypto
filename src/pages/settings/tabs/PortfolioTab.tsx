import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPencil,
  faChevronDown,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
import { Input, Button } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PortfolioTabProps {
  isDarkMode: boolean;
}

// Country data with flags and names
const countries = [
  { code: 'US', name: 'United States', flag: 'usa.png' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' }
];

// Currency data
const currencies = [
  { code: 'USD', name: 'USD' },
  { code: 'EUR', name: 'EUR' },
  { code: 'GBP', name: 'GBP' },
  { code: 'CAD', name: 'CAD' },
  { code: 'AUD', name: 'AUD' },
  { code: 'JPY', name: 'JPY' },
  { code: 'CHF', name: 'CHF' },
  { code: 'CNY', name: 'CNY' }
];

const PortfolioTab: React.FC<PortfolioTabProps> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    fullName: 'Kristin Watson',
    email: 'kristin.watson@gmail.com',
    country: 'United States',
    currency: 'USD',
    timezone: 'Pacific Daylight Time (GMT-7)',
    lockTransactionDate: '',
    dustValueThreshold: '1.00',
    taxReportingYear: '07/01/2025'
  });
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [taxReportingYearDate, setTaxReportingYearDate] = useState<Date | null>(new Date('2025-07-01'));
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [isDustCurrencyDropdownOpen, setIsDustCurrencyDropdownOpen] = useState(false);
  const [selectedDustCurrency, setSelectedDustCurrency] = useState(currencies[0]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const dustCurrencyDropdownRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setFormData(prev => ({
      ...prev,
      country: country.name
    }));
    setIsCountryDropdownOpen(false);
  };

  const handleCurrencySelect = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
    setFormData(prev => ({
      ...prev,
      currency: currency.code
    }));
    setIsCurrencyDropdownOpen(false);
  };

  const handleDustCurrencySelect = (currency: typeof currencies[0]) => {
    setSelectedDustCurrency(currency);
    setIsDustCurrencyDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false);
      }
      if (dustCurrencyDropdownRef.current && !dustCurrencyDropdownRef.current.contains(event.target as Node)) {
        setIsDustCurrencyDropdownOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log('Saving changes:', formData);
  };

  return (
    <div className="space-y-6">
      {/* User Avatar Section */}
      <div className="flex items-start">
        <div className="relative">
          <img 
            src="/kristin.png" 
            alt="Kristin Watson" 
            className="w-28 h-28 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#F3F5F7] border-2 border-white rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faPencil} className="w-3 h-3 text-[#7C7C7C]" />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium text-left mb-2 ${isDarkMode ? 'text-gray-300' : 'text-[#2F3232]'}`}>
              Full name
            </label>
            <Input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`text-md ${isDarkMode ? 'bg-gray-700 border-[#E1E3E5] text-white' : 'bg-white border-[#E1E3E5]'}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-left mb-2 ${isDarkMode ? 'text-gray-300' : 'text-[#2F3232]'}`}>
              Email
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`text-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-[#E1E3E5]'}`}
            />
          </div>
        </div>
        <div className="py-8">
          <div className={`w-full h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium text-left mb-2 ${isDarkMode ? 'text-gray-300' : 'text-[#2F3232]'}`}>
                Country
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className={`w-full px-3 border border-[#E1E3E5] rounded-lg focus:outline-none flex items-center justify-between ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={selectedCountry.flag} className="mr-3 py-1.5"></img>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`w-3 h-3 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`}
                    />
                    <div className={`w-px h-10 my-0 ${isDarkMode ? 'bg-gray-600' : 'bg-[#E1E3E5]'} mx-3`}></div>
                    <span className="py-1.5 font-medium">{selectedCountry.name}</span>
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                {isCountryDropdownOpen && (
                  <div className={`absolute z-10 w-full mt-1 border border-gray-300 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'
                  }`}>
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        className={`w-full px-3 py-2 flex items-center hover:bg-gray-50 ${
                          isDarkMode ? 'hover:bg-gray-600 text-white' : 'text-gray-900'
                        } ${selectedCountry.code === country.code ? 'bg-gray-100' : ''}`}
                      >
                        <img src={country.flag} className="text-lg mr-3"></img>
                        <span className="font-medium">{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium text-left mb-2 ${isDarkMode ? 'text-gray-300' : 'text-[#2F3232]'}`}>
                Currency
              </label>
              <div className="relative" ref={currencyDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                  className={`w-full px-3 py-2 border border-[#E1E3E5] rounded-lg focus:outline-none flex items-center justify-between ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <span className="font-medium">{selectedCurrency.name}</span>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronDown} 
                      className={`w-3 h-3 transition-transform ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>
                
                {/* Currency Dropdown Menu */}
                {isCurrencyDropdownOpen && (
                  <div className={`absolute z-10 w-full mt-1 border border-gray-300 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'
                  }`}>
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        type="button"
                        onClick={() => handleCurrencySelect(currency)}
                        className={`w-full px-3 py-2 flex items-center hover:bg-gray-50 ${
                          isDarkMode ? 'hover:bg-gray-600 text-white' : 'text-gray-900'
                        } ${selectedCurrency.code === currency.code ? 'bg-gray-100' : ''}`}
                      >
                        <span className="font-medium">{currency.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium text-left mb-1 ${isDarkMode ? 'text-gray-300' : 'text-[#2F3232]'}`}>
                Lock transaction prior to this date
              </label>
              <div className="relative" ref={datePickerRef}>
                <DatePicker
                  selected={startDate} 
                  onChange={(date) => setStartDate(date)} 
                  className={`w-full px-3 py-2 border border-[#E1E3E5] rounded-lg focus:outline-none flex items-center justify-between cursor-pointer ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white text-gray-900'
                  }`}
                  placeholderText="MM/DD/YYYY"
                  dateFormat="MM/dd/yyyy"
                  wrapperClassName="w-full"
                  popperPlacement="bottom-start"
                  customInput={
                    <div className="flex items-center justify-between w-full">
                      <span className="flex-1 text-left">
                        {startDate ? startDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'MM/DD/YYYY'}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronDown} 
                        className="w-3 h-3"
                      />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium text-left mb-2 ${isDarkMode ? 'text-gray-300' : 'text-[#2F3232]'}`}>
                California Time zone
              </label>
              <div className="relative">
                <select
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white text-gray-900'
                  }`}
                >
                  <option value="Pacific Daylight Time (GMT-7)">Pacific Daylight Time (GMT-7)</option>
                  <option value="Pacific Standard Time (GMT-8)">Pacific Standard Time (GMT-8)</option>
                  <option value="Eastern Daylight Time (GMT-4)">Eastern Daylight Time (GMT-4)</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex space-x-2">
                <label className={`block text-sm font-medium text-left mb-2 ${isDarkMode ? 'text-gray-300' : 'text-[#2F3232]'}`}>
                  Dust valur threshold
                </label>
                <svg className="w-5 h-5 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                </svg>
              </div>
              <div className="flex space-x-0 pl-3 py-2 border border-[#E1E3E5] rounded-lg">
                  <input
                    type="text"
                    value={formData.dustValueThreshold}
                    onChange={(e) => handleInputChange('dustValueThreshold', e.target.value)}
                    className={`flex-1 focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-[#E1E3E5]'}`}
                  />
                  <div className="relative" ref={dustCurrencyDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDustCurrencyDropdownOpen(!isDustCurrencyDropdownOpen)}
                      className={`px-3 focus:outline-none flex items-center justify-between ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white text-gray-900'
                      }`}
                    >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <span className="px-3 font-medium">{selectedDustCurrency.name}</span>
                      </div>
                      <FontAwesomeIcon
                        icon={faChevronDown} 
                        className={`w-3 h-3 transition-transform ${isDustCurrencyDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </button>
                  
                  {/* Dust Currency Dropdown Menu */}
                  {isDustCurrencyDropdownOpen && (
                    <div className={`absolute z-10 w-full mt-1 border border-gray-300 rounded-lg ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'
                    }`}>
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          type="button"
                          onClick={() => handleDustCurrencySelect(currency)}
                                                  className={`w-full px-3 py-2 flex items-center ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        } ${selectedDustCurrency.code === currency.code ? 'bg-gray-100' : ''}`}
                        >
                          <span className="font-medium">{currency.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
               <label className={`block text-sm font-medium text-left mb-2 ${isDarkMode ? 'text-gray-300' : 'text-[#2F3232]'}`}>
                 Beginning of tax reporting year
               </label>
               <div className="relative">
                 <DatePicker
                   selected={taxReportingYearDate} 
                   onChange={(date) => setTaxReportingYearDate(date)} 
                   className={`w-full px-3 py-2 border border-[#E1E3E5] rounded-lg focus:outline-none flex items-center justify-between cursor-pointer ${
                     isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white text-gray-900'
                   }`}
                   placeholderText="MM/DD/YYYY"
                   dateFormat="MM/dd/yyyy"
                   wrapperClassName="w-full"
                   popperPlacement="bottom-start"
                   customInput={
                     <div className="flex items-center justify-between w-full">
                       <svg className="text-[#7C7C7C] size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
                        </svg>

                       <span className="flex-1 text-left ml-3">
                         {taxReportingYearDate ? taxReportingYearDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'MM/DD/YYYY'}
                       </span>
                     </div>
                   }
                 />
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-100 my-6" role="separator"></div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSaveChanges}
          className="bg-[#90C853] text-[#0E201E] px-6 py-2 border-0 rounded-lg font-medium"
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default PortfolioTab;
