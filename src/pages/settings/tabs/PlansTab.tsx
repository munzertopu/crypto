import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import UpgradeModal from '../components/UpgradeModal';

interface PlansTabProps {}

const PlansTab: React.FC<PlansTabProps> = () => {
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
      <div className="mb-6">
        <h3 className="text-lg font-bold text-left mb-2 text-gray-900 dark:text-gray-150">
          Plans
        </h3>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className="relative bg-white text-left h-min rounded-lg shadow-sm border border-default dark:border-gray-700"
          >
            <div className='py-10 px-8'>
              {/* Status Badge */}
              {plan.status && (
                <div className={`absolute right-8 ${plan.statusColor} ${plan.textColor} px-3 py-1 rounded-full text-sm font-medium`}>
                  {plan.status}
                </div>
              )}

              {/* Plan Name */}
              <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-150">
                {plan.name}
              </h4>

              {/* Price */}
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-150">
                {plan.price}
              </div>
            </div>
              
            {/* Separator */}
            <div className={`border-t border-default dark:border-gray-700`}></div>
            <div className='py-6 px-8'>
              {/* Features */}
              <div className="mb-6">
                <h5 className={`text-lg font-medium mb-3`}>
                  Features:
                </h5>
                <ul className="space-y-5">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <FontAwesomeIcon 
                        icon={faCheck} 
                        className="w-4 h-4 text-[#5F9339] mr-3 flex-shrink-0"
                      />
                      <span className="text-base text-gray-700 dark:text-gray-300">
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
                  className={`w-full py-2 px-4 text-base bg-white border border-default rounded-lg text-gray-700 font-semibold text-primary dark:border-gray-600 dark:text-gray-300`}
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
        planName={selectedPlan}
      />
    </div>
  );
};

export default PlansTab;
