import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Typography } from "@material-tailwind/react";
import NavigationBar from '../../../components/NavigationBar';
import ImportTransactionsModal from './ImportTransactionsModal';
import ImportHistoryModal from './ImportHistoryModal';
import TableSortIcon from '../../../components/Icons/TableSortIcon';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface WalletDetailsPageProps {}

interface CryptoAsset {
  name: string;
  symbol: string;
  balance: string;
  marketValue: string;
  logo: string;
  color: string;
  percentage: number;
}

const WalletDetailsPage: React.FC<WalletDetailsPageProps> = () => {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isImportHistoryModalOpen, setIsImportHistoryModalOpen] = useState(false);
  
  // Map platform to wallet details
  const getWalletDetails = (platform: string) => {
    const walletMap: { [key: string]: { name: string; logo: string; totalValue: string; transactions: number } } = {
      'coinbase': { name: 'Coinbase', logo: '/crypto/coinbase.png', totalValue: '$1,567,640', transactions: 6 },
      'bitcoin': { name: 'Bitcoin', logo: '/crypto/bitcoin-btc-logo.png', totalValue: '$1,567,640', transactions: 6 },
      'metamask': { name: 'Meta mask', logo: '/crypto/metamask.png', totalValue: '$1,567,640', transactions: 6 },
      'phantom': { name: 'Phantom', logo: '/crypto/Phantom.png', totalValue: '$1,567,640', transactions: 6 },
      'kraken': { name: 'Kraken', logo: '/crypto/kraken.png', totalValue: '$1,567,640', transactions: 6 },
      'gemini': { name: 'Gemini', logo: '/crypto/gemini.png', totalValue: '$1,567,640', transactions: 6 },
      'crypto': { name: 'Crypto.com', logo: '/crypto/crypto.png', totalValue: '$1,567,640', transactions: 6 },
      'exodus': { name: 'Exodus', logo: '/crypto/exodus.png', totalValue: '$1,567,640', transactions: 6 },
      'trezor': { name: 'Trezor', logo: '/crypto/trezor.png', totalValue: '$1,567,640', transactions: 6 },
      'zengo': { name: 'Zengo', logo: '/crypto/zengo.png', totalValue: '$1,567,640', transactions: 6 }
    };
    
    return walletMap[platform?.toLowerCase() || 'coinbase'] || walletMap['coinbase'];
  };
  
  const walletDetails = getWalletDetails(platform || 'coinbase');
  const { name: walletName, logo: walletLogo, totalValue, transactions } = walletDetails;

  // Sample data for the donut chart and assets
  const cryptoAssets: CryptoAsset[] = [
    { name: 'Bitcoin', symbol: 'BTC', balance: '21.004856252', marketValue: '1,323,47', logo: '/crypto/bitcoin-btc-logo.png', color: '#F7931A', percentage: 27 },
    { name: 'Ethereum', symbol: 'ETH', balance: '45.123456789', marketValue: '1,023,47', logo: '/crypto/ethereum-eth-logo.png', color: '#627EEA', percentage: 21 },
    { name: 'Solana', symbol: 'SOL', balance: '125.987654321', marketValue: '923,47', logo: '/crypto/solana-sol-logo.png', color: '#9945FF', percentage: 19 },
    { name: 'Tether', symbol: 'USDT', balance: '50,000.123456', marketValue: '823,47', logo: '/crypto/tether-usdt-logo.png', color: '#26A17B', percentage: 16 },
    { name: 'Chainlink', symbol: 'LINK', balance: '2,500.987654', marketValue: '523,47', logo: '/crypto/chainlink-link-logo.png', color: '#2A5ADA', percentage: 11 },
    { name: 'Synthetix', symbol: 'SNX', balance: '1,250.456789', marketValue: '323,47', logo: '/crypto/synthetix-network-token-snx-logo.png', color: '#5FCDF9', percentage: 6 }
  ];

  const chartData = cryptoAssets.map(asset => ({
    name: asset.name,
    value: asset.percentage,
    color: asset.color
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-[#0E201E] border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {payload[0].name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E201E] text-gray-900 dark:text-gray-250">
      <NavigationBar 
        userName="Kristin Watson"
        onLogout={() => navigate('/login')} 
        currentPage="wallets"
      />
      
      <div className="grid grid-row gap-6 px-4 md:px-10 sm:px-6 md:pt-5 mb-15 md:pb-15 w-full">
        {/* Breadcrumb */}
        <nav className="flex mb-2" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link to="/wallets" className="inline-flex items-center text-base font-normal text-gray-400 dark:text-gray-400 dark:hover:text-white">
                Wallets
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="w-4 h-4 text-sm text-gray-400 dark:text-gray-600">/</span>
                {/* <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400 dark:text-gray-600" /> */}
                <span className="ml-1 text-base font-medium text-gray-900 dark:text-gray-500 md:ml-2">
                  {walletName} details
                </span>
              </div>
            </li>
          </ol>
        </nav>

         {/* Header Row - Wallet Header and Action Buttons */}
         <div className="flex items-center justify-between">
           {/* Wallet Header */}
           <div className="flex items-center space-x-2">
             <img 
               src={walletLogo} 
               alt={walletName}
               className="w-10 h-10 rounded-lg"
             />
             <h1 className="text-[32px] font-semibold text-gray-900 dark:text-white">
               {walletName}
             </h1>
           </div>

           {/* Action Buttons */}
           <div className="flex space-x-3">
             <button 
               onClick={() => setIsImportHistoryModalOpen(true)}
               className="flex items-center space-x-2 px-4 py-2 bg-transparent border border-default dark:border-default rounded-xl text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2F3232] transition-colors"
             >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
               <span className="text-base font-medium">View History</span>
             </button>
               <button 
                 onClick={() => setIsImportModalOpen(true)}
                 className="flex items-center space-x-2 px-5 py-3 bg-green-500 text-gray-900 rounded-xl"
               >
                 <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                   <path d="M10.96 5.93335C13.36 6.14002 14.34 7.37335 14.34 10.0733V10.16C14.34 13.14 13.1467 14.3333 10.1667 14.3333H5.82665C2.84665 14.3333 1.65332 13.14 1.65332 10.16V10.0733C1.65332 7.39335 2.61999 6.16002 4.97999 5.94002" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                   <path d="M8 10V2.41333" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                   <path d="M10.2333 3.89996L7.99994 1.66663L5.7666 3.89996" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                 </svg>
                 <span className="text-base font-medium">Import File</span>
               </button>
           </div>
         </div>

         {/* Content Row - Donut Chart and Asset Table */}
         <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-10">
           {/* Left Panel - Portfolio Distribution (1 column) */}
           <div className="lg:col-span-1 relative">
             {/* Donut Chart */}
             <div className="bg-white dark:bg-[#1A1D1E] pl-3 mr-10">
               <div className="relative">
                 <ResponsiveContainer width="100%" height={400}>
                   <PieChart>
                     <Pie
                       data={chartData}
                       cx="50%"
                       cy="50%"
                       innerRadius="64%"
                       outerRadius="100%"
                       paddingAngle={2}
                       dataKey="value"
                     >
                       {chartData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip content={<CustomTooltip />} />
                   </PieChart>
                 </ResponsiveContainer>
                 
                 {/* Center Content */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <div className="text-center">
                     <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                       {totalValue}
                     </div>
                     <div className="text-base text-gray-600 dark:text-gray-400">
                       {transactions} transactions
                     </div>
                   </div>
                 </div>
               </div>

               {/* Legend */}
               <div className="space-y-3">
                 {cryptoAssets.map((asset, index) => (
                   <div key={index} className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                       <div 
                         className="w-3 h-3 rounded-full" 
                         style={{ backgroundColor: asset.color }}
                       ></div>
                       <span className="text-base font-medium text-gray-900 dark:text-white">
                         {asset.name}
                       </span>
                     </div>
                     <span className="text-base font-medium text-gray-700 dark:text-gray-400">
                       {asset.percentage}%
                     </span>
                   </div>
                 ))}
               </div>
             </div>
             
             {/* Vertical Separator at right edge */}
             <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-default"></div>
           </div>

           {/* Right Panel - Asset Details Table (3 columns) */}
           <div className="lg:col-span-3 space-y-6">
             {/* Assets Table */}
             <div className="h-full w-full border-transparent bg-transparent shadow-none">
               <div className="px-0 rounded-lg sm:overflow-x-auto">
                 <table className="w-full min-w-max table-auto text-left">
                  <thead className="bg-table-header dark:bg-gray-800 hidden sm:table-header-group">
                     <tr className="">
                       {['Coin', 'Balance', 'Market Value', ''].map((head, index) => (
                         <th
                           key={head}
                           className={`cursor-pointer px-5 py-3.5 ${
                             index === 0 ? "rounded-l-xl" : ""
                           } ${index === 3 ? "rounded-r-md" : ""}`}
                         >
                           <Typography
                              variant="small"
                              className="flex items-center justify-start gap-2 font-normal text-sm leading-none text-gray-600 dark:text-[#B6B8BA]"
                            >
                              {head}{" "}
                              {head !== "" && (
                                <TableSortIcon
                                  width={8}
                                  height={16}
                                  fillColor="currentColor"
                                  className="opacity-50"
                                />
                              )}
                            </Typography>
                         </th>
                       ))}
                     </tr>
                   </thead>
                   <tbody>
                     {cryptoAssets.map((asset, index) => (
                       <tr key={index}>
                         <td className="md:px-5 md:py-3 sm:p-5">
                           <div className="flex items-center gap-3">
                             <img 
                               src={asset.logo} 
                               alt={asset.name}
                               className="w-12 h-12 rounded-full"
                             />
                             <div className="flex flex-col">
                               <span className="text-base text-gray-900 dark:text-gray-100">
                                 {asset.name}
                               </span>
                             </div>
                           </div>
                         </td>
                         <td className="hidden sm:table-cell">
                           <div className="flex flex-col">
                             <span className="font-normal text-base text-gray-900 dark:text-gray-100">
                               {asset.balance}
                             </span>
                           </div>
                         </td>
                         <td className="hidden sm:table-cell">
                           <span className="font-normal text-base text-gray-900 dark:text-gray-100">
                             ${asset.marketValue}
                           </span>
                         </td>
                         <td className="hidden sm:table-cell text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
         </div>
      </div>

      {/* Import Transactions Modal */}
      <ImportTransactionsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        walletName={walletName}
      />

      {/* Import History Modal */}
      <ImportHistoryModal
        isOpen={isImportHistoryModalOpen}
        onClose={() => setIsImportHistoryModalOpen(false)}
        walletName={walletName}
      />
    </div>
  );
};

export default WalletDetailsPage;
