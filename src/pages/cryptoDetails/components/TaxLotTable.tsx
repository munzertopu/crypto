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

interface TaxLotData {
  id: string;
  acquisitionAccount: { name: string; logo: string };
  currentAccount: { name: string; logo: string };
  type: string;
  amount: string;
  currentPrice: { current: string; original: string };
  change: { value: string; percentage: string; change: 'positive' | 'negative' };
  value: string;
  unrealizedGL: { value: string; type: 'positive' | 'negative' };
  purchaseDate: string;
}

interface TaxLotTableProps {
  data?: TaxLotData[];
  isDarkMode?: boolean;
}

const TaxLotTable: React.FC<TaxLotTableProps> = ({
  data = []
}) => {
  const TABLE_HEAD = ["Acquisition Account", "Current Account", "Type", "Amount", "Current Price", "Change", "Value", "Unrealized G/L", "Purchase Date"];
  
  // Default mock data if no data provided
  const defaultData: TaxLotData[] = [
    {
      id: '1',
      acquisitionAccount: { name: 'Coinbase', logo: 'coinbase.png' },
      currentAccount: { name: 'Metamask', logo: 'metamask.png' },
      type: 'ETH',
      amount: '125 ETH',
      currentPrice: { current: '$2,000.00', original: '$1,250.00' },
      change: { value: '+$937.50', percentage: '+60%', change: 'positive'  },
      value: '$2,500.00',
      unrealizedGL: { value: '+$1,250.00', type: 'positive' },
      purchaseDate: '03/15/2023'
    },
    {
      id: '2',
      acquisitionAccount: { name: 'Pahton', logo: 'pahton.png' },
      currentAccount: { name: 'Ethereum', logo: 'ethereum-eth-logo.png' },
      type: 'BTC',
      amount: '125 ETH',
      currentPrice: { current: '$2,000.00', original: '$1,250.00' },
      change: { value: '+$937.50', percentage: '+60%', change: 'positive'  },
      value: '$2,500.00',
      unrealizedGL: { value: '+$1,250.00', type: 'positive' },
      purchaseDate: '03/15/2023'
    },
    {
      id: '3',
      acquisitionAccount: { name: 'Solana', logo: 'solana-sol-logo.png' },
      currentAccount: { name: 'Ethereum', logo: 'ethereum-eth-logo.png' },
      type: 'USDT',
      amount: '125 ETH',
      currentPrice: { current: '$2,000.00', original: '$1,250.00' },
      change: { value: '+$937.50', percentage: '+60%', change: 'positive' },
      value: '$2,500.00',
      unrealizedGL: { value: '+$1,250.00', type: 'positive' },
      purchaseDate: '03/15/2023'
    }
  ];

  const tableData = data.length > 0 ? data : defaultData;

  return (
    <div className="bg-white dark:bg-[#0E201E]">
      <div className="pt-6 pb-2">
        <h3 className="text-lg font-semibold text-left text-[#0E201E] dark:text-[#E1E3E5]">Tax Lots</h3>
      </div>
      <div className="overflow-x-auto">
        <Card className="h-full w-full border-transparent bg-transprent shadow-none">
          <CardBody className="px-0 rounded-lg m-0 p-0">
            <table className="w-full min-w-max table-auto text-left">
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
                        <Avatar src={item.acquisitionAccount.logo} alt={item.acquisitionAccount.name} size="sm" className="mr-1.5" />
                        <span className="text-base text-[#0E201E] dark:text-gray-250">
                          {item.acquisitionAccount.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar src={item.currentAccount.logo} alt={item.currentAccount.name} size="sm" className="mr-1.5" />
                        <span className="text-base text-[#0E201E] dark:text-gray-250">
                          {item.currentAccount.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-base text-[#0E201E] dark:text-gray-250">
                      {item.type}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-base text-[#0E201E] dark:text-gray-250">
                      {item.amount}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="text-base text-[#0E201E] dark:text-gray-250">{item.currentPrice.current}</div>
                      <div className="text-sm text-gray-500 dark:text-[#A1A3A5]">{item.currentPrice.original}</div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="text-base text-[#0E201E] dark:text-gray-250">{item.change.value}</div>
                      <div className="text-sm text-gray-600 dark:text-[#8C8E90]">{item.change.percentage}</div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-base text-[#0E201E] dark:text-gray-250">
                      {item.value}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className={`text-base font-medium ${item.unrealizedGL.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.unrealizedGL.value}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-base text-[#0E201E] dark:text-gray-250">
                      {item.purchaseDate}
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

export default TaxLotTable;
