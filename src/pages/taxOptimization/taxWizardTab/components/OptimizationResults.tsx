import React, { useState } from "react";
import CloudUploadIcon from "../../../../components/Icons/CloudUploadIcon";
import ButtonArrowCircleIcon from "../../../../components/Icons/ButtonArrowCircleIcon";
import BitcoinIcon from "../../../../components/Icons/BitcoinIcon";
import StackedCoinIcon from "../../../../components/Icons/StackedCoinIcon";
import ChartBoxIcon from "../../../../components/Icons/ChartBoxIcon";
import PercentCircleIcon from "../../../../components/Icons/PercentCircleIcon";
import { ChevronUpDownIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import TradeDetailsTable from "./TradeDetailsTable";
import TickCircleIcon from "../../../../components/Icons/TickCircleIcon";

const OptimizationResults: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
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
        <BitcoinIcon width={24} height={24} />
      ),
      label: "Transactions",
      value: "3"
    },
    {
      icon: (
        <StackedCoinIcon width={24} height={24}/>
      ),
      label: "Est. Short-term Tax",
      value: "$420"
    },
    {
      icon: (
        <ChartBoxIcon width={24} height={24}/>
      ),
      label: "Est. Long-term Tax",
      value: "$37"
    },
    {
      icon: (
        <PercentCircleIcon width={24} height={24}/>
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
      period: "May 25, 2025",
      details: [
        { acquiredOn: "Jan 5, 2025, 5:57 PM", holdingPeriod: "212 days (Short)", amount: "8.2500 USDT", costUSD: "403.26", gainUSD: "+234.90" },
        { acquiredOn: "Feb 21, 2025, 1:39 PM", holdingPeriod: "80 days (Short)", amount: "12.400000 USDT", costUSD: "579.56", gainUSD: "+200.21" },
        { acquiredOn: "Mar 12, 2025, 9:19 AM", holdingPeriod: "55 days (Short)", amount: "5.20000 USDT", costUSD: "520.10", gainUSD: "+189" },
        { acquiredOn: "May 31, 2025, 2:31 PM", holdingPeriod: "35 days (Short)", amount: "3.40000 USDT", costUSD: "289.10", gainUSD: "+155.30" }
      ]
    },
    {
      asset: "Coinbase",
      assetLogo: "/crypto/coinbase.png",
      walletExchange: "Bitcoin",
      quantity: "229 USDT",
      estProceeds: "$900",
      gainLoss: "-$720",
      isGain: false,
      period: "Jul 13, 2025",
      details: [
        { acquiredOn: "Jan 5, 2025, 5:57 PM", holdingPeriod: "212 days (Short)", amount: "8.2500 USDT", costUSD: "403.26", gainUSD: "+234.90" },
        { acquiredOn: "Feb 21, 2025, 1:39 PM", holdingPeriod: "80 days (Short)", amount: "12.400000 USDT", costUSD: "579.56", gainUSD: "+200.21" },
        { acquiredOn: "Mar 12, 2025, 9:19 AM", holdingPeriod: "55 days (Short)", amount: "5.20000 USDT", costUSD: "520.10", gainUSD: "+189" }
      ]
    },
    {
      asset: "Tether",
      assetLogo: "/crypto/tether-usdt-logo.png",
      walletExchange: "Coinbase",
      quantity: "1200 USDT",
      estProceeds: "$5,700",
      gainLoss: "+$1,900",
      isGain: true,
      period: "May 8, 2025",
      details: [
        { acquiredOn: "Jan 5, 2025, 5:57 PM", holdingPeriod: "212 days (Short)", amount: "8.2500 USDT", costUSD: "403.26", gainUSD: "+234.90" },
        { acquiredOn: "Feb 21, 2025, 1:39 PM", holdingPeriod: "80 days (Short)", amount: "12.400000 USDT", costUSD: "579.56", gainUSD: "+200.21" },
        { acquiredOn: "Mar 12, 2025, 9:19 AM", holdingPeriod: "55 days (Short)", amount: "5.20000 USDT", costUSD: "520.10", gainUSD: "+189" },
        { acquiredOn: "May 31, 2025, 2:31 PM", holdingPeriod: "35 days (Short)", amount: "3.40000 USDT", costUSD: "289.10", gainUSD: "+155.30" }
      ]
    },
    {
      asset: "Kraken",
      assetLogo: "/crypto/kraken.png",
      walletExchange: "Bitcoin",
      quantity: "843.90 USDT",
      estProceeds: "$590",
      gainLoss: "-$500.60",
      isGain: false,
      period: "Jun 13, 2025",
      details: [
        { acquiredOn: "Jan 5, 2025, 5:57 PM", holdingPeriod: "212 days (Short)", amount: "8.2500 USDT", costUSD: "403.26", gainUSD: "+234.90" },
        { acquiredOn: "Feb 21, 2025, 1:39 PM", holdingPeriod: "80 days (Short)", amount: "12.400000 USDT", costUSD: "579.56", gainUSD: "+200.21" },
        { acquiredOn: "Mar 12, 2025, 9:19 AM", holdingPeriod: "55 days (Short)", amount: "5.20000 USDT", costUSD: "520.10", gainUSD: "+189" }
      ]
    }
  ];

  const toggleRowExpansion = (index: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

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
           <button className="flex items-center gap-2 bg-green-500 text-gray-900 px-5 py-3 rounded-lg font-medium">
             <ButtonArrowCircleIcon width={16} height={16} className="text-gray-900" />
             Recalculate
           </button>
        </div>
      </div>

      {/* Optimization Results */}
      <div className="text-left bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
        <div className="flex items-center mb-1 gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Optimization Results
          </h3>
          <div className="flex items-center gap-2 px-1.5 py-1 bg-green-200 dark:bg-[#4D772F] rounded-full text-[#F4FAEB]">
            <TickCircleIcon
              height={16}
              width={16}
            />
            <span className="text-sm font-medium text-green-700 dark:text-[#F4FAEB]">
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
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg px-8 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="opacity-80 text-gray-900 dark:text-gray-100">
                  {metric.icon}
                </div>
                <p className="text-base opacity-80 text-gray-500 dark:text-gray-100">{metric.label}</p>
              </div>
              <p className={`text-lg font-semibold text-gray-900 dark:text-gray-100`}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Proposed Trade Plan */}
      <div className="text-left bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Proposed Trade Plan
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-5">
          You'll keep your BTC and ETH untouched.
        </p>

        {/* Trade Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-900 rounded-lg">
            <thead>
              <tr className="border-b border-default dark:border-gray-700">
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`cursor-pointer px-5 py-3.5 ${
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
                <React.Fragment key={index}>
                  <tr 
                    className="cursor-pointer"
                    onClick={() => toggleRowExpansion(index)}
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        {expandedRows.has(index) ? (
                          <ChevronDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-500" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                        )}
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
                    <td className="py-3.5 px-5 text-base text-gray-900 dark:text-gray-100">
                      {trade.walletExchange}
                    </td>
                    <td className="py-3.5 px-5 text-base text-gray-900 dark:text-gray-100">
                      {trade.quantity}
                    </td>
                    <td className="py-3.5 px-5 text-base text-gray-900 dark:text-gray-100">
                      {trade.estProceeds}
                    </td>
                    <td className={`py-3.5 px-5 text-base font-medium ${
                      trade.isGain 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-red-600 dark:text-red-400"
                    }`}>
                      {trade.gainLoss}
                    </td>
                    <td className="py-3.5 px-5 text-base text-gray-900 dark:text-gray-100">
                      {trade.period}
                    </td>
                  </tr>
                  
                  {/* Expanded Row Content */}
                  {expandedRows.has(index) && (
                    <tr>
                      <td colSpan={6} className="p-0">
                        <TradeDetailsTable details={trade.details} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* What If Analysis */}
      <div className="text-left bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          What IF Analysis
        </h3>
        
        <div className="space-y-4">
          <div className="relative">
            <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300 mb-2">
              <span>$8,000</span>
              <span className="text-base ">Target: <span className="text-gray-900 dark:text-gray-100">$10,000</span></span>
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
              <style jsx>{`
                .slider::-webkit-slider-thumb {
                  appearance: none;
                  height: 20px;
                  width: 20px;
                  border-radius: 50%;
                  background: #5F9339;
                  cursor: pointer;
                  border: 2px solid #ffffff;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .slider::-moz-range-thumb {
                  height: 20px;
                  width: 20px;
                  border-radius: 50%;
                  background: #5F9339;
                  cursor: pointer;
                  border: 2px solid #ffffff;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationResults;
