import React from 'react';
import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";

interface AllocationData {
  id: string;
  wallet: { name: string; logo: string };
  balance: string;
  value: string;
  allocation: string;
  longTermGain: string;
  shortTermGain: string;
}

interface AllocationTableProps {
  data?: AllocationData[];
  isDarkMode?: boolean;
}

const AllocationTable: React.FC<AllocationTableProps> = ({
  data = [],
  isDarkMode = false
}) => {
      const TABLE_HEAD = ["Wallet", "Balance", "Value", "Allocation", "Long-Term Gain", "Short-Term Gain"];
      
      // Default mock data if no data provided
      const defaultData: AllocationData[] = [
      {
        id: '1',
        wallet: { name: 'Anchorage', logo: '/google.png' },
        balance: '870.48320432',
        value: '3,226,854.26',
        allocation: '99%',
        longTermGain: '78%',
        shortTermGain: '22%'
      },
      {
        id: '2',
        wallet: { name: 'Exponential.FI', logo: '/google.png' },
        balance: '10,0428402',
        value: '37,071.50',
        allocation: '1%',
        longTermGain: '47%',
        shortTermGain: '53%'
      },
      {
        id: '3',
        wallet: { name: 'Coinbase', logo: '/google.png' },
        balance: '1,0234372',
        value: '3,714.83',
        allocation: '0%',
        longTermGain: '63%',
        shortTermGain: '37%'
      },
      {
        id: '4',
        wallet: { name: 'Bittrex', logo: '/google.png' },
        balance: '0,019045',
        value: '37.01',
        allocation: '0%',
        longTermGain: '18%',
        shortTermGain: '82%'
      }
    ];

  const tableData = data.length > 0 ? data : defaultData;

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="pt-6 pb-2">
        <h3 className="text-lg font-semibold text-left">Allocations</h3>
      </div>
      <div className="overflow-x-auto">
        <Card className="h-full w-full border-transparent">
          <CardBody className="px-0 rounded-lg">
            <table className="w-full min-w-max table-auto text-left">
              <thead className='bg-gray-200'>
                <tr className=''>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className={`cursor-pointer p-4 ${index === 0 ? 'rounded-l-md' : ''} ${index === TABLE_HEAD.length - 1 ? 'rounded-r-md' : ''}`}
                    >
                      <Typography
                        variant="small"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}{" "}
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`${isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                {tableData.map((item) => (
                  <tr key={item.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.wallet.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.balance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.allocation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-2/3 h-5 bg-gray-200 rounded-full">
                          <div 
                            className="bg-green-500 h-5 rounded-l-full" 
                            style={{ width: `${item.longTermGain}` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {item.longTermGain}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-2/3 h-5 bg-gray-200 rounded-full">
                          <div 
                            className="bg-red-500 h-5 rounded-l-full" 
                            style={{ width: `${item.shortTermGain}` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {item.shortTermGain}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AllocationTable;
