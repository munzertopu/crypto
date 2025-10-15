import React from "react";
import CloudUploadIcon from "../../../../utils/icons/CloudUploadIcon";
import ButtonArrowCircleIcon from "../../../../utils/icons/ButtonArrowCircleIcon";
import BitcoinIcon from "../../../../utils/icons/BitcoinIcon";
import StackedCoinIcon from "../../../../utils/icons/StackedCoinIcon";
import ChartBoxIcon from "../../../../utils/icons/ChartBoxIcon";
import PercentCircleIcon from "../../../../utils/icons/PercentCircleIcon";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";

const OptimizationResults: React.FC = () => {
  const TABLE_HEAD = [
    "Asset",
    "Wallet/Exchange",
    "Quantity",
    "Est. Proceeds",
    "Gain/Loss",
    "Period"
  ];
  const metrics = [
    {
      icon: (
        <BitcoinIcon width={20} height={20} className="text-gray-600 dark:text-gray-400" />
      ),
      label: "Transactions",
      value: "3"
    },
    {
      icon: (
        <StackedCoinIcon width={20} height={20} className="text-gray-600 dark:text-gray-400" />
      ),
      label: "Est. Short-term Tax",
      value: "$420"
    },
    {
      icon: (
        <ChartBoxIcon width={20} height={20} className="text-gray-600 dark:text-gray-400" />
      ),
      label: "Est. Long-term Tax",
      value: "$37"
    },
    {
      icon: (
        <PercentCircleIcon width={20} height={20} className="text-gray-600 dark:text-gray-400" />
      ),
      label: "Total tax impact",
      value: "+$458"
    }
  ];

  const tradePlan = [
    {
      asset: "Bitcoin",
      assetLogo: "/crypto/bitcoin-btc-logo.png",
      walletExchange: "Coinbase Pro",
      quantity: "45.7 USDT",
      estProceeds: "$4,570",
      gainLoss: "+$1,307",
      isGain: true,
      period: "May 25, 2025"
    },
    {
      asset: "Coinbase",
      assetLogo: "/crypto/coinbase.png",
      walletExchange: "Bitcoin",
      quantity: "229 USDT",
      estProceeds: "$900",
      gainLoss: "-$720",
      isGain: false,
      period: "Jul 13, 2025"
    },
    {
      asset: "Tether",
      assetLogo: "/crypto/tether-usdt-logo.png",
      walletExchange: "Coinbase",
      quantity: "1200 USDT",
      estProceeds: "$5,700",
      gainLoss: "+$1,900",
      isGain: true,
      period: "May 8, 2025"
    },
    {
      asset: "Kraken",
      assetLogo: "/crypto/kraken.png",
      walletExchange: "Bitcoin",
      quantity: "843.90 USDT",
      estProceeds: "$590",
      gainLoss: "-$500.60",
      isGain: false,
      period: "Jun 13, 2025"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-left">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sales Wizard
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Turn portfolio into cash, tax-optimized.
          </p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-5 py-3 text-gray-900 dark:text-gray-300">
             <CloudUploadIcon width={16} height={16} className="text-gray-600 dark:text-gray-400" />
             Export CSV/JSON
           </button>
           <button className="flex items-center gap-2 bg-green-500 hover:bg-green-500 text-gray-900 px-5 py-3 rounded-lg font-medium transition-colors">
             <ButtonArrowCircleIcon width={16} height={16} className="text-gray-900" />
             Recalculate
           </button>
        </div>
      </div>

      {/* Optimization Results */}
      <div className="text-left bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
        <div className="flex items-center mb-1 gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Optimization Results
          </h3>
          <div className="flex items-center gap-2 px-1.5 py-1 bg-green-200 dark:bg-green-900 rounded-full text-[#4D772F]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.00065 14.6668C11.6673 14.6668 14.6673 11.6668 14.6673 8.00016C14.6673 4.3335 11.6673 1.3335 8.00065 1.3335C4.33398 1.3335 1.33398 4.3335 1.33398 8.00016C1.33398 11.6668 4.33398 14.6668 8.00065 14.6668Z" stroke="currentColo" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.16602 7.99995L7.05268 9.88661L10.8327 6.11328" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              High Confidence
            </span>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          We found a smarter way to raise $10,000.
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg px-8 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-gray-600 dark:text-gray-400">
                  {metric.icon}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</p>
              </div>
              <p className={`text-lg font-semibold ${
                metric.label === "Total tax impact" 
                  ? "text-gray-900 dark:text-white" 
                  : "text-gray-700 dark:text-gray-300"
              }`}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Proposed Trade Plan */}
      <div className="text-left bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Proposed Trade Plan
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-5">
          You'll keep your BTC and ETH untouched.
        </p>

        {/* Trade Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-700 rounded-lg">
            <thead>
              <tr className="border-b border-default dark:border-gray-700">
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`cursor-pointer p-6 ${
                      index === 0 ? "rounded-l-xl" : ""
                    } ${index === TABLE_HEAD.length - 1 ? "rounded-r-md" : ""}`}
                  >
                    <Typography
                      variant="small"
                      className="flex text-left py-3.5 px-5 text-sm font-normal text-gray-600 dark:text-gray-300"
                    >
                      {head}{" "}
                      <ChevronUpDownIcon
                        strokeWidth={2}
                        className="h-4 w-4"
                        role="button"
                        aria-label={`Sort by ${head}`}
                      />
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tradePlan.map((trade, index) => (
                <tr key={index} className="">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <img 
                        src={trade.assetLogo} 
                        alt={trade.asset}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        {trade.asset}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-base text-gray-900 dark:text-gray-300">
                    {trade.walletExchange}
                  </td>
                  <td className="py-3.5 px-5 text-base text-gray-900 dark:text-gray-300">
                    {trade.quantity}
                  </td>
                  <td className="py-3.5 px-5 text-base text-gray-900 dark:text-gray-300">
                    {trade.estProceeds}
                  </td>
                  <td className={`py-3.5 px-5 text-base font-medium ${
                    trade.isGain 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {trade.gainLoss}
                  </td>
                  <td className="py-3.5 px-5 text-base text-gray-900 dark:text-gray-300">
                    {trade.period}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* What If Analysis */}
      <div className="text-left bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          What IF Analysis
        </h3>
        
        <div className="space-y-4">
          <div className="relative">
            <div className="flex justify-between text-xs text-gray-700 dark:text-gray-400 mb-2">
              <span>$8,000</span>
              <span className="text-base ">Target: <span className="text-gray-900">$10,000</span></span>
              <span>$12,000</span>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min="8000"
                max="12000"
                step="1000"
                defaultValue="10000"
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: 'linear-gradient(to right, #5F9339 0%, #5F9339 50%, #e5e7eb 50%, #e5e7eb 100%)',
                  WebkitAppearance: 'none',
                  appearance: 'none'
                }}
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationResults;
