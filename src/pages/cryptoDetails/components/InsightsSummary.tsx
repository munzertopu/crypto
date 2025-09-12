import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface InsightCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface InsightsSummaryProps {
  isDarkMode?: boolean;
}

const InsightsSummary: React.FC<InsightsSummaryProps> = ({
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const insightCards: InsightCard[] = [
    {
      id: '1',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      title: 'Long Term',
      description: 'You currently have $1,020 tax liability if you sell your long term holdings. You have $200 in long term holdings that will reduce your long term tax liability by $20.'
    },
    {
      id: '2',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      ),
      title: 'Soon Long Term',
      description: 'Hold for 17 days to reduce your tax liability by an estimated $100 using current market value.'
    },
    {
      id: '3',
      icon: (
        <svg
          className="w-5 h-5 md:h-6 md:w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.88 18.1501V16.0801"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M12 18.1498V14.0098"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M17.12 18.1502V11.9302"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M17.12 5.8501L16.66 6.3901C14.11 9.3701 10.69 11.4801 6.88 12.4301"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M14.1899 5.8501H17.1199V8.7701"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      title: 'Short Term',
      description: 'You have 0.00310 with a $500 lose value, Dolly recommends that you sell these allotments to reduce your overall tax liability by $150.'
    },
    {
      id: '4',
      icon: (
        <svg
          className="w-5 h-5 md:h-6 md:w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51001 10.9402 9.51001 10.0202C9.51001 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 7.5V16.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17 3V7H21"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 2L17 7"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      title: 'Taxes',
      description: 'You have incurred $50,000 in tax liability this tax year.'
    }
  ];

  return (
    <div className="bg-white dark:bg-[#0E201E]">
      <div className="pt-6 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-h6 font-semibold text-left text-[#0E201E] dark:text-[#E1E3E5]">Insights Summary</h3>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-[#75AE46]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
        </div>
        
        {/* Dismissible Banner */}
        {showBanner && (
          <div className="mb-4 px-5 py-4 rounded-lg border border-blue-200 bg-white dark:bg-[#2F3232] dark:border-[#4D5050]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 text-[#2186D7] bg-white rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                  </svg>


                </div>
                <span className="text-base text-gray-700 dark:text-[#CDCFD1]">
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
               className="px-6 py-5 rounded-xl border border-[#E3F3C7] bg-[#F4FAEB] dark:bg-[#2F3232]"
             >
               <div className="flex flex-col items-left text-left">
                 <div className="mb-3">
                   <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-[#90C853]"
                  >
                     <div className={`text-white`}>
                       {card.icon}
                     </div>
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
