import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { Typography, Input, Button } from "@material-tailwind/react";

interface FormInfoTabProps {
  
}

// Country data with flags and names
const countries = [
  { code: 'US', name: 'United States', flag: 'usa.png', dialCode: '+1' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52' }
];

const FormInfoTab: React.FC<FormInfoTabProps> = ({ }) => {
  const [formData, setFormData] = useState({
    name: '',
    personalId: '',
    city: '',
    postalCode: '',
    phoneNumber: '201-555-3333',
    state: '',
    inn: ''
  });

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log('Saving form info changes:', formData);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <Typography variant="h4" className="font-bold text-lg text-left mb-2 text-gray-900 dark:text-gray-150">
          Form Info
        </Typography>
        <Typography variant="small" className="text-left text-sm text-gray-600 dark:text-gray-400">
          You do not need to fill in anything on this page unless you want this information to be shown on your tax reports
        </Typography>
      </div>

      {/* Form Fields */}
      {/* Name Field - Full Width */}
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300`}>
            Name (optional)
          </label>
          <Input
            type="text"
            placeholder="Type your name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`text-base bg-white border-[#E1E3E5] dark:bg-gray-700 dark:border-[#E1E3E5] text-white`}
          />
        </div>
      </div>

      {/* Other Form Fields - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300">
              Personal ID Number (optional)
            </label>
            <Input
              type="text"
              placeholder="000000000"
              value={formData.personalId}
              onChange={(e) => handleInputChange('personalId', e.target.value)}
              className="text-base bg-white border-[#E1E3E5] dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300">
              City
            </label>
            <Input
              type="text"
              placeholder="Type your city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="text-base bg-white border-[#E1E3E5] dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300">
              Postal Code
            </label>
            <Input
              type="text"
              placeholder="00000"
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              className="text-base bg-white border-[#E1E3E5] dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className='relative'>
            <label className="block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300">
              Phone number (optional)
            </label>
            <div className="relative flex border border-[#E1E3E5] rounded-lg overflow-hidden">
              {/* Country Dropdown Section */}
              <div className="relative flex" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className={`flex items-center px-3 py-2 focus:outline-none ${
                    'bg-white text-gray-900 dark:text-gray-150 dark:bg-gray-700'
                  }`}
                >
                  <img src={selectedCountry.flag} className="mr-2"></img>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`w-3 h-3 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {/* Vertical Separator */}
                <div className="w-px bg-[#E1E3E5] dark:bg-gray-600"></div>

                {/* Phone Number Input Section */}
                <div className="flex-1">
                  <input
                    type="tel"
                    placeholder={`(${selectedCountry.dialCode}) 201-555-3333`}
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`w-full px-3 py-2 focus:outline-none ${
                      'bg-white text-gray-900 dark:text-gray-150 dark:bg-gray-700'
                    }`}
                  />
                </div>
              </div>
            </div>
            {/* Country Dropdown Menu */}
            {isCountryDropdownOpen && (
              <div className={`absolute z-50 w-full mt-1 border border-gray-300 rounded-lg ${
                'bg-white dark:bg-gray-700 dark:border-gray-600'
              }`}>
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full px-3 py-2 flex items-center hover:bg-gray-50 ${
                      'text-gray-900 dark:text-gray-150 dark:hover:bg-gray-600'
                    } ${selectedCountry.code === country.code ? 'bg-gray-100' : ''}`}
                  >
                    <img src={country.flag} className="mr-2"></img>
                    <span className="font-medium">{country.name}</span>
                    <span className="ml-auto text-sm text-gray-500">({country.dialCode})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300">
              State (optional)
            </label>
            <Input
              type="text"
              placeholder="00000"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="text-base bg-white border-[#E1E3E5] dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-left mb-1 text-[#2F3232] dark:text-gray-300">
                INN
              </label>
              <svg className="w-4 h-4 mx-2 -mt-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
              </svg>
            </div>
            <Input
              type="text"
              placeholder="000000000"
              value={formData.inn}
              onChange={(e) => handleInputChange('inn', e.target.value)}
              className="text-base bg-white border-[#E1E3E5] dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={handleSaveChanges}
          className="bg-[#90C853] text-[#0E201E] px-6 py-2 rounded-lg font-medium border-0"
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default FormInfoTab;
