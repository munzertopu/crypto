import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from "@material-tailwind/react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

interface AdditionalService {
  id: string;
  name: string;
  price: string;
  checked: boolean;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, planName }) => {
  const [additionalServices, setAdditionalServices] = useState<AdditionalService[]>([
    { id: 'tax-report', name: 'Tax report', price: 'Free', checked: false },
    { id: 'dual-nationality', name: 'Dual Nationality', price: '$49', checked: false },
    { id: 'expert-review', name: 'Expert review', price: '$999', checked: false }
  ]);

  const handleServiceToggle = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, checked: !service.checked }
          : service
      )
    );
  };

  const calculateSubtotal = () => {
    return additionalServices
      .filter(service => service.checked && service.price !== 'Free')
      .reduce((total, service) => {
        const price = parseInt(service.price.replace('$', ''));
        return total + price;
      }, 0);
  };

  const calculateAdditionalServicesTotal = () => {
    return additionalServices
      .filter(service => service.checked)
      .reduce((total, service) => {
        if (service.price === 'Free') return total;
        const price = parseInt(service.price.replace('$', ''));
        return total + price;
      }, 0);
  };

  const subtotal = calculateSubtotal();
  const additionalServicesTotal = calculateAdditionalServicesTotal();
  const total = subtotal + additionalServicesTotal;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
      <div className={`relative p-6 md:p-8 max-w-md w-full mx-0 md:mx-4 rounded-t-3xl md:rounded-lg shadow-lg ${
        'bg-white text-[#191919] dark:bg-gray-800 dark:text-white'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-0">
          <h2 className="text-lg md:text-h6 font-semibold dark:text-gray-100">Upgrade to the {planName} plan</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-gray-100
              hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4 text-[#7C7C7C]" />
          </button>
        </div>

        {/* Content */}
        <div>
          {/* Additional Services */}
          <div className="mb-6">
            <h3 className="text-left text-xs md:text-[13px] font-semibold mt-2 mb-4 text-[#4D5050] dark:text-gray-300">ADDITIONAL SERVICES:</h3>
            <div className="space-y-4 md:space-y-3">
              {additionalServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      checked={service.checked}
                      onChange={() => handleServiceToggle(service.id)}
                      className='w-4 h-4 md:w-5 md:h-5 border-[#E1E3E5] rounded rounded-md dark:border-gray-700'
                    >
                      <Checkbox.Indicator className="text-white bg-[#75AE46] border-[#75AE46]"/>
                    </Checkbox>
                    <span className="text-sm md:text-base text-gray-900 dark:text-gray-100">{service.name}</span>
                    <svg className="size-3 md:size-4 mx-1 md:mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base font-medium">{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary of Charges */}
          <div className="border-t border-default dark:border-gray-700 py-4">
            <div className="space-y-3 md:space-y-2">
              <div className="flex justify-between dark:text-gray-300">
                <span className="text-sm md:text-base">Subtotal:</span>
                <span className="text-sm md:text-base">${subtotal}</span>
              </div>
              <div className="flex justify-between dark:text-gray-300">
                <span className="text-sm md:text-base">Additional services:</span>
                <span className="text-sm md:text-base">${additionalServicesTotal}</span>
              </div>
              <div className="flex justify-between font-bold text-base md:text-lg border-t border-default dark:text-gray-100 dark:border-gray-700 pt-2">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="py-4 md:py-6">
          <button
            onClick={onClose}
            className="w-full bg-[#90C853] text-[#0E201E] py-3 md:py-3 px-6 rounded-lg font-semibold hover:bg-[#7AB342] transition-colors text-sm md:text-base"
          >
            Upgrade to {planName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
