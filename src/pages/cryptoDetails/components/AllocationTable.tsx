import React from 'react';
import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  Typography,
  CardBody,
  Avatar,
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
}) => {
      const TABLE_HEAD = ["Wallet", "Balance", "Value", "Allocation", "Short-term vs Long-term Holdings"];
      
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
    <div className="bg-white dark:bg-[#0E201E]">
      <div className="pt-6 pb-2">
        <h3 className="text-lg font-semibold text-left text-[#0E201E] dark:text-[#E1E3E5]">Allocations</h3>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Card className="h-full w-full border-transparent bg-transprent shadow-none">
          <CardBody className="px-0 rounded-lg m-0 p-0 border-0">
            <table className="w-full min-w-max table-auto text-left shadow-none">
              <thead className='bg-table-header dark:bg-gray-800'>
                <tr className=''>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className={`cursor-pointer px-4 py-5 ${index === 0 ? 'rounded-l-md' : ''} ${index === TABLE_HEAD.length - 1 ? 'rounded-r-md' : ''}`}
                    >
                      <Typography
                        variant="small"
                        className="flex items-center gap-2 font-normal leading-none opacity-70 text-sm text-[#0E201E] 
                        dark:text-[#B6B8BA]"
                      >
                        {head}{" "}
                        {(index < TABLE_HEAD.length - 1 && index > 0 ) && (
                          <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#0E201E] divide-gray-200 dark:divide-[#2F3232]">
                {tableData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-[#2F3232]">
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-[#0E201E] dark:text-gray-250">
                          {item.wallet.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-[#0E201E] dark:text-gray-250">
                      {item.balance}
                    </td>
                    <td className="pl-5 pr-8 py-3 whitespace-nowrap text-sm text-[#0E201E] dark:text-gray-250">
                      {item.value}
                    </td>
                    <td className="pl-5 pr-8 py-3 whitespace-nowrap text-sm text-[#0E201E] dark:text-gray-250">
                      {item.allocation}
                    </td>
                    <td className="pl-3 pr-5 py-3 whitespace-nowrap">
                      <div className="w-full h-5 bg-error-500 dark:bg-error-500 rounded-md">
                        <div 
                          className="bg-[#419F45] h-5 rounded-l-md" 
                          style={{ width: `${item.longTermGain}` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {tableData.map((item) => (
          <div key={item.id} className="bg-white dark:bg-[#0E201E] border-b border-default dark:border-[#2F3232] py-4">
            {/* First Row: Wallet Name + Allocation | Balance + Value */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              {/* First Column: Wallet Name + Allocation */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <Typography variant="small" className="text-base text-gray-900 dark:text-gray-100">
                    {item.wallet.name}
                  </Typography>
                </div>
                <Typography variant="small" className="text-left text-sm opacity-70 text-[#0E201E] dark:text-gray-100">
                  {item.allocation} allocation
                </Typography>
              </div>
              
              {/* Second Column: Balance + Value */}
              <div className="space-y-1 text-right">
                <Typography variant="small" className="text-base text-gray-900 dark:text-gray-100">
                  {item.balance}
                </Typography>
                <Typography variant="small" className="text-base text-gray-600 dark:text-gray-250">
                  ${item.value}
                </Typography>
              </div>
            </div>
            
            {/* Second Row: Progress Bar spanning both columns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <div className="w-full h-4 bg-error-500 dark:bg-error-500 rounded-md">
                  <div 
                    className="bg-success-500 h-4 rounded-l-md" 
                    style={{ width: `${parseInt(item.longTermGain)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllocationTable;
