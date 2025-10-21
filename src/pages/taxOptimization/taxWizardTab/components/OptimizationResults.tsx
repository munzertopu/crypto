import React, { useState } from "react";
import CloudUploadIcon from "../../../../components/Icons/CloudUploadIcon";
import ButtonArrowCircleIcon from "../../../../components/Icons/ButtonArrowCircleIcon";
import BitcoinIcon from "../../../../components/Icons/BitcoinIcon";
import StackedCoinIcon from "../../../../components/Icons/StackedCoinIcon";
import ChartBoxIcon from "../../../../components/Icons/ChartBoxIcon";
import PercentCircleIcon from "../../../../components/Icons/PercentCircleIcon";
import {
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import TradeDetailsTable from "./TradeDetailsTable";
import TickCircleIcon from "../../../../components/Icons/TickCircleIcon";
import SecondaryButton from "../../../../components/UI/Buttons/SecondaryButton";
import MobileDrawer from "../../../../components/Drawers/MobileDrawer";
import { Accordion } from "../../../../components/Accordion";

const OptimizationResults: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [selectedTradeIndex, setSelectedTradeIndex] = useState<number | null>(
    null
  );
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<any>(null);
  const TABLE_HEAD = [
    "Asset",
    "Wallet/Exchange",
    "Quantity",
    "Est. Proceeds",
    "Gain/Loss",
    "Period",
  ];
  const metrics = [
    {
      icon: <BitcoinIcon width={24} height={24} />,
      label: "Transactions",
      value: "3",
    },
    {
      icon: <StackedCoinIcon width={24} height={24} />,
      label: "Est. Short-term Tax",
      value: "$420",
    },
    {
      icon: <ChartBoxIcon width={24} height={24} />,
      label: "Est. Long-term Tax",
      value: "$37",
    },
    {
      icon: <PercentCircleIcon width={24} height={24} />,
      label: "Total tax impact",
      value: "+$458",
    },
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
        {
          acquiredOn: "Jan 5, 2025, 5:57 PM",
          holdingPeriod: "212 days (Short)",
          amount: "8.2500 USDT",
          costUSD: "403.26",
          gainUSD: "+234.90",
        },
        {
          acquiredOn: "Feb 21, 2025, 1:39 PM",
          holdingPeriod: "80 days (Short)",
          amount: "12.400000 USDT",
          costUSD: "579.56",
          gainUSD: "+200.21",
        },
        {
          acquiredOn: "Mar 12, 2025, 9:19 AM",
          holdingPeriod: "55 days (Short)",
          amount: "5.20000 USDT",
          costUSD: "520.10",
          gainUSD: "+189",
        },
        {
          acquiredOn: "May 31, 2025, 2:31 PM",
          holdingPeriod: "35 days (Short)",
          amount: "3.40000 USDT",
          costUSD: "289.10",
          gainUSD: "+155.30",
        },
      ],
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
        {
          acquiredOn: "Jan 5, 2025, 5:57 PM",
          holdingPeriod: "212 days (Short)",
          amount: "8.2500 USDT",
          costUSD: "403.26",
          gainUSD: "+234.90",
        },
        {
          acquiredOn: "Feb 21, 2025, 1:39 PM",
          holdingPeriod: "80 days (Short)",
          amount: "12.400000 USDT",
          costUSD: "579.56",
          gainUSD: "+200.21",
        },
        {
          acquiredOn: "Mar 12, 2025, 9:19 AM",
          holdingPeriod: "55 days (Short)",
          amount: "5.20000 USDT",
          costUSD: "520.10",
          gainUSD: "+189",
        },
      ],
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
        {
          acquiredOn: "Jan 5, 2025, 5:57 PM",
          holdingPeriod: "212 days (Short)",
          amount: "8.2500 USDT",
          costUSD: "403.26",
          gainUSD: "+234.90",
        },
        {
          acquiredOn: "Feb 21, 2025, 1:39 PM",
          holdingPeriod: "80 days (Short)",
          amount: "12.400000 USDT",
          costUSD: "579.56",
          gainUSD: "+200.21",
        },
        {
          acquiredOn: "Mar 12, 2025, 9:19 AM",
          holdingPeriod: "55 days (Short)",
          amount: "5.20000 USDT",
          costUSD: "520.10",
          gainUSD: "+189",
        },
        {
          acquiredOn: "May 31, 2025, 2:31 PM",
          holdingPeriod: "35 days (Short)",
          amount: "3.40000 USDT",
          costUSD: "289.10",
          gainUSD: "+155.30",
        },
      ],
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
        {
          acquiredOn: "Jan 5, 2025, 5:57 PM",
          holdingPeriod: "212 days (Short)",
          amount: "8.2500 USDT",
          costUSD: "403.26",
          gainUSD: "+234.90",
        },
        {
          acquiredOn: "Feb 21, 2025, 1:39 PM",
          holdingPeriod: "80 days (Short)",
          amount: "12.400000 USDT",
          costUSD: "579.56",
          gainUSD: "+200.21",
        },
        {
          acquiredOn: "Mar 12, 2025, 9:19 AM",
          holdingPeriod: "55 days (Short)",
          amount: "5.20000 USDT",
          costUSD: "520.10",
          gainUSD: "+189",
        },
      ],
    },
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

  const handleMobileCardClick = (index: number) => {
    setSelectedTradeIndex(index);
    setIsMobileDrawerOpen(true);
  };

  const closeMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
    setSelectedTradeIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-row md:flex-col justify-between md:justify-start">
          <div className="text-left">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sales Wizard
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Turn portfolio into cash, tax-optimized.
            </p>
          </div>
          <SecondaryButton
            icon={
              <CloudUploadIcon
                width={16}
                height={16}
                className="text-gray-600 dark:text-gray-400"
              />
            }
          />
        </div>

        <div className="hidden sm:flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 text-gray-900 dark:text-gray-300">
            <CloudUploadIcon
              width={16}
              height={16}
              className="text-gray-600 dark:text-gray-400"
            />
            Export CSV/JSON
          </button>
          <button className="flex items-center gap-2 bg-green-500 text-gray-900 px-5 py-3 rounded-lg font-medium">
            <ButtonArrowCircleIcon
              width={16}
              height={16}
              className="text-gray-900"
            />
            Recalculate
          </button>
        </div>
      </div>

      {/* Optimization Results */}
      <div className="text-left bg-gray-100 dark:bg-gray-800 rounded-xl p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center md:mb-1 gap-2 md:gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Optimization Results
          </h3>
          <p className="text-gray-700 dark:text-gray-300   md:hidden">
            We found a smarter way to raise $10,000.
          </p>

          <div className="flex items-center gap-2 px-1.5 py-1 bg-green-200 dark:bg-[#4D772F] rounded-full text-[#F4FAEB]">
            <TickCircleIcon height={16} width={16} />
            <span className="text-sm font-medium text-green-700 dark:text-[#F4FAEB]">
              High Confidence
            </span>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6 hidden md:block">
          We found a smarter way to raise $10,000.
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg px-4 py-3 md:px-8 md:py-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="opacity-80 text-gray-900 dark:text-gray-100">
                  {metric.icon}
                </div>
                <p className="text-base opacity-80 text-gray-500 dark:text-gray-100">
                  {metric.label}
                </p>
              </div>
              <p
                className={`text-lg font-semibold text-gray-900 dark:text-gray-100`}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Proposed Trade Plan */}
      <div className="text-left bg-gray-100 dark:bg-gray-800 rounded-xl p-4 md:p-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Proposed Trade Plan
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-5">
          You'll keep your BTC and ETH untouched.
        </p>

        {/* Mobile Card Layout */}
        <div className="block md:hidden space-y-3">
          {tradePlan.map((trade, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg p-4 cursor-pointer"
              onClick={() => setSelectedDetails(trade)}
            >
              {/* Header with Asset and Eye Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={trade.assetLogo}
                    alt={trade.asset}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {trade.asset}
                  </span>
                </div>
                <button className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>

              {/* Key-Value Pairs */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Wallet/Exchange:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {trade.walletExchange}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Quantity:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {trade.quantity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Est Proceeds:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {trade.estProceeds}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Gains/Losses:
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      trade.isGain
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {trade.gainLoss}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Period:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {trade.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
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
                    <td
                      className={`py-3.5 px-5 text-base font-medium ${
                        trade.isGain
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
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
              <span className="text-base ">
                Target:{" "}
                <span className="text-gray-900 dark:text-gray-100">
                  $10,000
                </span>
              </span>
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
                  WebkitAppearance: "none",
                  appearance: "none",
                }}
              />
              <style>{`
                .slider {
                  background: linear-gradient(
                    to right,
                    #5f9339 0%,
                    #5f9339 50%,
                    #e5e7eb 50%,
                    #e5e7eb 100%
                  );
                }
                .dark .slider {
                  background: linear-gradient(
                    to right,
                    #5f9339 0%,
                    #5f9339 50%,
                    #4d5050 50%,
                    #4d5050 100%
                  );
                }
                .slider::-webkit-slider-thumb {
                  appearance: none;
                  height: 20px;
                  width: 20px;
                  border-radius: 50%;
                  background: #5f9339;
                  cursor: pointer;
                  border: 2px solid #ffffff;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .slider::-moz-range-thumb {
                  height: 20px;
                  width: 20px;
                  border-radius: 50%;
                  background: #5f9339;
                  cursor: pointer;
                  border: 2px solid #ffffff;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
      <button className="md:hidden flex items-center justify-center gap-2 bg-green-500 text-gray-900 px-5 py-3 rounded-lg font-medium w-full my-4">
        <ButtonArrowCircleIcon
          width={16}
          height={16}
          className="text-gray-900"
        />
        Recalculate
      </button>

      {/* Mobile Drawer for Trade Details */}
      <MobileDrawer
        isOpen={selectedDetails !== null}
        onClose={() => setSelectedDetails(null)}
        header={
          selectedDetails !== null ? `${selectedDetails?.asset} details` : ""
        }
        height={600}
        hideFooter={true}
        className="px-0"
        
      >
        {selectedDetails !== null && (
          <TradeDetailsTable details={selectedDetails?.details} />
        )}
      </MobileDrawer>
    </div>
  );
};

export default OptimizationResults;
