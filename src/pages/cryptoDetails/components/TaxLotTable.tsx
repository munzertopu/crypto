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
  data = [],
  isDarkMode = false
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
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="pt-6 pb-2">
        <h3 className="text-lg font-semibold text-left">Tax Lots</h3>
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
                        <Avatar src={item.acquisitionAccount.logo} alt={item.acquisitionAccount.name} size="sm" className="mr-3" />
                        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.acquisitionAccount.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar src={item.currentAccount.logo} alt={item.currentAccount.name} size="sm" className="mr-3" />
                        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.currentAccount.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.currentPrice.current}</div>
                      <div className="text-sm text-gray-500">{item.currentPrice.original}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.change.value}</div>
                      <div className="text-sm text-gray-600">{item.change.percentage}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${item.unrealizedGL.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.unrealizedGL.value}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
