import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import UpgradeModal from '../components/UpgradeModal';

interface PlansTabProps {
  isDarkMode: boolean;
}

const PlansTab: React.FC<PlansTabProps> = ({ isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleUpgradeClick = (planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan('');
  };
  const plans = [
    {
      name: 'Newbie',
      price: '$49',
      status: 'Current',
      statusColor: 'bg-[#FDEAD8]',
      textColor: 'text-[#AE590A]',
      features: [
        '100 transactions',
        'Unlimited revisions',
        'Unlimited wallets',
        'Comprehensive tax reports',
        'Basic portfolio tracking'
      ]
    },
    {
      name: 'Trader',
      price: '$99',
      status: 'Most Popular',
      statusColor: 'bg-[#E3EAFD]',
      textColor: 'text-[#133A9A]',
      features: [
        '1,000 transactions',
        'Unlimited revisions',
        'Unlimited wallets',
        'Comprehensive tax reports',
        'Basic portfolio tracking'
      ]
    },
    {
      name: 'Pro',
      price: '$299',
      status: null,
      statusColor: '',
      textColor: 'text-[#AE590A]',
      features: [
        '10,000 transactions',
        'Unlimited revisions',
        'Unlimited wallets',
        'Comprehensive tax reports',
        'Basic portfolio tracking'
      ]
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="my-8">
        <h3 className={`text-lg font-bold text-left mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Plans
        </h3>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`relative bg-white text-left h-min rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-[#E1E3E5]'}`}
          >
            <div className='p-8'>
              {/* Status Badge */}
              {plan.status && (
                <div className={`absolute top-6 right-6 ${plan.statusColor} ${plan.textColor} px-3 py-1 rounded-full text-sm font-medium`}>
                  {plan.status}
                </div>
              )}

              {/* Plan Name */}
              <h4 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h4>

              {/* Price */}
              <div className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {plan.price}
              </div>
            </div>
              
            {/* Separator */}
            <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} my-2`}></div>
            <div className='py-4 px-8'>
              {/* Features */}
              <div className="mb-6">
                <h5 className={`text-lg font-medium mb-3`}>
                  Features:
                </h5>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <FontAwesomeIcon 
                        icon={faCheck} 
                        className="w-4 h-4 text-[#5F9339] mr-3 flex-shrink-0"
                      />
                      <span className={`text-md ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              {plan.name !== 'Newbie' && (
                <button 
                  onClick={() => handleUpgradeClick(plan.name)}
                  className={`w-full py-2 px-4 bg-white border border-[#E1E3E5] rounded-lg text-gray-700 font-semibold ${isDarkMode ? 'border-gray-600 text-gray-300' : 'text-[#0E201E]'}`}
                >
                  Upgrade
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isDarkMode={isDarkMode}
        planName={selectedPlan}
      />
    </div>
  );
};

export default PlansTab;
