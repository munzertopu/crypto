import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faHourglassHalf, 
  faChartBar, 
  faDollarSign,
  faStar,
  faExclamationCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

interface InsightCard {
  id: string;
  icon: any;
  title: string;
  description: string;
}

interface InsightsSummaryProps {
  isDarkMode?: boolean;
}

const InsightsSummary: React.FC<InsightsSummaryProps> = ({
  isDarkMode = false
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const insightCards: InsightCard[] = [
    {
      id: '1',
      icon: faClock,
      title: 'Long Term',
      description: 'You currently have $1,020 tax liability if you sell your long term holdings. You have $200 in long term holdings that will reduce your long term tax liability by $20.'
    },
    {
      id: '2',
      icon: faHourglassHalf,
      title: 'Soon Long Term',
      description: 'Hold for 17 days to reduce your tax liability by an estimated $100 using current market value.'
    },
    {
      id: '3',
      icon: faChartBar,
      title: 'Short Term',
      description: 'You have 0.00310 with a $500 lose value, Dolly recommends that you sell these allotments to reduce your overall tax liability by $150.'
    },
    {
      id: '4',
      icon: faDollarSign,
      title: 'Taxes',
      description: 'You have incurred $50,000 in tax liability this tax year.'
    }
  ];

  return (
    <div className="bg-white dark:bg-[#0E201E]">
      <div className="pt-6 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-left text-[#0E201E] dark:text-[#E1E3E5]">Insights Summary</h3>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#75AE46]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
        </div>
        
        {/* Dismissible Banner */}
        {showBanner && (
          <div className="mb-4 p-3 rounded-lg border border-blue-200 bg-white dark:bg-[#2F3232] dark:border-[#4D5050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon 
                    icon={faExclamationCircle} 
                    className="text-white text-xs" 
                  />
                </div>
                <span className="text-sm text-gray-700 dark:text-[#CDCFD1]">
                  Insights are estimates only and subject to change with reconciliation and tax rules.
                </span>
              </div>
              <button 
                onClick={() => setShowBanner(false)}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-[#A1A3A5] dark:hover:text-[#CDCFD1] transition-colors"
                aria-label="Close insights banner"
              >
                <FontAwesomeIcon icon={faTimes} className="text-sm" aria-hidden="true" />
                <span className="text-sm">Close</span>
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insightCards.map((card) => (
            <div 
               key={card.id}
               className="p-4 bg-[#F4FAEB] dark:bg-[#2F3232]"
             >
               <div className="flex flex-col items-left text-left">
                 <div className="mb-3">
                   <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#90C853' }}
                  >
                     <FontAwesomeIcon 
                       icon={card.icon} 
                       className="text-white text-sm" 
                       style={{ color: '#1B5E20' }}
                     />
                   </div>
                 </div>
                 
                 <h4 className="text-base font-semibold mb-2 text-[#0E201E] dark:text-[#E1E3E5]">
                   {card.title}
                 </h4>
                 
                 <p className="text-sm leading-relaxed text-[#0E201E] dark:text-[#CDCFD1]">
                   {card.description}
                 </p>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsSummary;
