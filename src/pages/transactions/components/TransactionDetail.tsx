import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faGhost, faChevronUp, faChevronDown, faEye, faExchange } from '@fortawesome/free-solid-svg-icons';
import {
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";

interface TransactionDetailProps {
  isDarkMode: boolean;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('Details');

  const ledgerData = [
    {
      id: 1,
      identifier: { icon: '₿', color: 'bg-orange-500', text: 'View txn' },
      date: '4 Jan, 2025, 17:47',
      type: 'Send',
      ledger: 'ETH - Bitocion',
      change: '-0.32348600',
      balance: '+23.9830191'
    },
    {
      id: 2,
      identifier: { icon: '♦', color: 'bg-blue-500', text: 'View txn' },
      date: '21 Nov, 2024, 13:09',
      type: 'Receive',
      ledger: 'ETH - Phantom',
      change: '+0.292096470',
      balance: '+23.9830191'
    },
    {
      id: 3,
      identifier: { icon: '☰', color: 'bg-purple-600', text: 'View txn' },
      date: '19 Sep, 2024, 08:23',
      type: 'Send',
      ledger: 'ETH - Metamask',
      change: '-0.1',
      balance: '-2.903724'
    }
  ];

  const costAnalysisData = [
    {
      id: 1,
      date: '4 Jan, 2025, 17:47',
      info: 'Own transfer',
      holdingPeriod: '212 days (Short)',
      amount: '-0.2535',
      costUSD: '579.56',
      gainUSD: '0.00',
      isMarked: false
    },
    {
      id: 2,
      date: '4 Jan, 2025, 17:49',
      info: 'Invested in ETH',
      holdingPeriod: '212 days (Short)',
      amount: '-0.2535',
      costUSD: '579.56',
      gainUSD: '0.00',
      isMarked: true
    }
  ];
  return (
    <div className="space-y-2">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {['Details', 'Ledger', 'Cost analysis'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-green-500'
                : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} border-transparent`
            }`}
            aria-label={`View transaction ${tab.toLowerCase()}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Details' && (
        <div className="flex justify-between items-start py-2">
          {/* Transaction Type and Date - Left Side */}
          <div className='w-1/4'>
            <h3 className="text-2xl font-bold mb-2">Transfer</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              May 11, 2025, 8:37 PM
            </p>
          </div>

          {/* Transfer Card - Right Side */}
          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} border border-gray-200 w-2/4`}>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                {/* Phantom (Sent) */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faGhost} className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="small" className="font-medium">
                      Phantom
                    </Typography>
                    <Typography variant="small" className="text-red-600 font-medium">
                      -0.32348600 ETH
                    </Typography>
                  </div>
                </div>

                {/* Transfer Arrow */}
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faExchange}  className="w-5 h-5 text-[#75AE46]"/>
                  </div>
                </div>

                {/* Bitcoin (Received) */}
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col">
                    <Typography variant="small" className="font-medium">
                      Bitcoin
                    </Typography>
                    <Typography variant="small" className="text-green-600 font-medium">
                      +0.292096470 ETH
                    </Typography>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">₿</span>
                  </div>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <Typography variant="small" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Fiat Value:
                  </Typography>
                  <Typography variant="small" className="font-medium">
                    $780.98
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="small" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Cost Basis:
                  </Typography>
                  <Typography variant="small" className="font-medium">
                    $579.60
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="small" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Gain:
                  </Typography>
                  <Typography variant="small" className="font-medium">
                    $0.00
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'Ledger' && (
        <div className="py-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="py-3 px-4 font-medium text-sm">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Identifier</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm">
                    <div className="flex items-center space-x-2">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</span>
                      <div className="flex flex-col">
                        <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3" />
                        <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
                      </div>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm">
                    <div className="flex items-center space-x-2">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</span>
                      <div className="flex flex-col">
                        <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3" />
                        <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
                      </div>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Leger</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Change</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm">
                    <div className="flex items-center space-x-2">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Balance</span>
                      <div className="flex flex-col">
                        <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3" />
                        <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
                      </div>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ledgerData.map((row) => (
                  <tr key={row.id} className={`border-b border-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${row.identifier.color} rounded-full flex items-center justify-center`}>
                          <span className="text-white text-sm font-bold">{row.identifier.icon}</span>
                        </div>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.identifier.text}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {row.date}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium ${row.type === 'Send' ? 'text-red-600' : 'text-green-600'}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {row.ledger}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium`}>
                        {row.change}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium ${row.balance.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                        {row.balance}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Cost analysis' && (
        <div className="py-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="py-3 px-4 font-medium text-sm text-left">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm text-left">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Info</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm text-left">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Holding period</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm text-right">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm text-right">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cost(USD)</span>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gain(USD)</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm text-right">
                    
                  </th>
                </tr>
              </thead>
              <tbody>
                {costAnalysisData.map((row) => (
                  <tr key={row.id} className={`border-b border-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {row.date}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {row.info}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {row.holdingPeriod}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`text-sm font-medium`}>
                        {row.amount}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {row.costUSD}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`text-sm font-medium ${row.gainUSD === '0.00' ? 'text-gray-500' : row.gainUSD.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                        {row.gainUSD}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {row.isMarked && 
                        <svg className="w-5 h-5 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                        </svg>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetail;
