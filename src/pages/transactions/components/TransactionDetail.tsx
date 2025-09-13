import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faExchange } from "@fortawesome/free-solid-svg-icons";
import { Card, Typography, CardBody } from "@material-tailwind/react";
import { ledgerData, costAnalysisData } from "../../../data/transactionAssets";

interface TransactionDetailProps {}

const TransactionDetail: React.FC<TransactionDetailProps> = ({}) => {
  const [activeTab, setActiveTab] = useState("Details");

  return (
    <div className="space-y-2 md:mx-4 md:px-6 rounded-xl bg-background dark:bg-[#0E201E]">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["Details", "Ledger", "Cost analysis"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mx-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[#75AE46] dark:text-gray-250"
                : `border-transparent text-gray-500 hover:text-gray-700 dark: text-gray-400 dark: hover:text-gray-300`
            }`}
            aria-label={`View transaction ${tab.toLowerCase()}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Details" && (
        <div className="flex justify-between items-start py-2">
          {/* Transaction Type and Date - Left Side */}
          <div className="w-1/4">
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-250">
              Transfer
            </h3>
            <p className={`text-sm text-gray-600 dark:text-gray-400`}>
              May 11, 2025, 8:37 PM
            </p>
          </div>

          {/* Transfer Card - Right Side */}
          <Card
            className={`bg-white border border-gray-200 w-2/4 dark:bg-transparent`}
          >
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                {/* Phantom (Sent) */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faGhost}
                      className="w-6 h-6 text-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      className="font-normal dark:text-gray-250"
                    >
                      Phantom
                    </Typography>
                    <Typography variant="small" className="text-sm font-medium">
                      -0.32348600 ETH
                    </Typography>
                  </div>
                </div>

                {/* Transfer Arrow */}
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faExchange}
                      className="w-5 h-5 text-[#75AE46]"
                    />
                  </div>
                </div>

                {/* Bitcoin (Received) */}
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      className="font-normal dark:text-gray-250"
                    >
                      Bitcoin
                    </Typography>
                    <Typography variant="small" className="text-sm font-medium">
                      +0.292096470 ETH
                    </Typography>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">₿</span>
                  </div>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <Typography
                    variant="small"
                    className={`text-base text-gray-700 dark:text-gray-250`}
                  >
                    Fiat Value:
                  </Typography>
                  <Typography
                    variant="small"
                    className="test-sm font-medium text-gray-900 dark:text-gray-150"
                  >
                    $780.98
                  </Typography>
                </div>
                <div>
                  <hr className="border-dashed border-gray-500 opacity-20 dark:border-[#2F3232]" />
                </div>
                <div className="flex justify-between">
                  <Typography
                    variant="small"
                    className={`text-base text-gray-700 dark:text-gray-250`}
                  >
                    Cost Basis:
                  </Typography>
                  <Typography
                    variant="small"
                    className="test-sm font-medium text-gray-900 dark:text-gray-150"
                  >
                    $579.60
                  </Typography>
                </div>
                <div>
                  <hr className="border-dashed border-gray-500 opacity-20 dark:border-[#2F3232]" />
                </div>
                <div className="flex justify-between">
                  <Typography
                    variant="small"
                    className={`text-base text-gray-700 dark:text-gray-250`}
                  >
                    Gain:
                  </Typography>
                  <Typography
                    variant="small"
                    className="test-sm font-medium text-gray-900 dark:text-gray-150"
                  >
                    $0.00
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === "Ledger" && (
        <div className="py-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="py-3 px-4 font-normal text-sm">
                    <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                      Identifier
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm">
                    <div className="flex items-center space-x-1">
                      <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                        Date
                      </span>
                      <div className="flex flex-col">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm">
                    <div className="flex items-center space-x-1">
                      <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                        Type
                      </span>
                      <div className="flex flex-col">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm">
                    <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                      Leger
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm">
                    <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                      Change
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm">
                    <div className="flex items-center space-x-1">
                      <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                        Balance
                      </span>
                      <div className="flex flex-col">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm">
                    <span
                      className={`text-gray-700 dark:text-[#B6B8BA]`}
                    ></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ledgerData.map((row) => (
                  <tr key={row.id} className={`border-b border-gray-100`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 ${row.identifier.color} rounded-full flex items-center justify-center`}
                        >
                          <span className="text-white text-sm font-bold">
                            {row.identifier.icon}
                          </span>
                        </div>
                        <span
                          className={`text-base text-gray-900 dark:text-gray-150`}
                        >
                          {row.identifier.text}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-base text-gray-900 dark:text-gray-150`}
                      >
                        {row.date}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-abse font-medium ${
                          row.type === "Send"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-base text-gray-900 dark:text-gray-150`}
                      >
                        {row.ledger}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-base text-gray-900 dark:text-gray-150`}
                      >
                        {row.change}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-base font-medium ${
                          row.balance.startsWith("-")
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {row.balance}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-6 h-6 flex items-center justify-center text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
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

      {activeTab === "Cost analysis" && (
        <div className="py-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                      Date
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                      Info
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                      Holding period
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                      Amount
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                      Cost(USD)
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <div className="flex items-center justify-end space-x-1">
                      <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                        Gain(USD)
                      </span>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left"></th>
                </tr>
              </thead>
              <tbody>
                {costAnalysisData.map((row, index) => (
                  <tr key={row.id} className={`bg-white`}>
                    <td
                      className={`py-2.5 px-5
                        ${
                          index === costAnalysisData.length - 1
                            ? "rounded-bl-lg"
                            : ""
                        }
                      `}
                    >
                      <span
                        className={`text-base text-gray-700 dark:text-[#B6B8BA]`}
                      >
                        {row.date}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-base text-gray-700 dark:text-[#B6B8BA]`}
                      >
                        {row.info}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-base text-gray-700 dark:text-[#B6B8BA]`}
                      >
                        {row.holdingPeriod}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`text-base font-medium text-gray-700 dark:text-[#B6B8BA]`}
                      >
                        {row.amount}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`text-base text-gray-700 dark:text-[#B6B8BA]`}
                      >
                        {row.costUSD}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`text-base font-medium ${
                          row.gainUSD === "0.00"
                            ? "text-gray-500"
                            : row.gainUSD.startsWith("-")
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {row.gainUSD}
                      </span>
                    </td>
                    <td
                      className={`py-3 px-4 text-right
                        ${
                          index === costAnalysisData.length - 1
                            ? "rounded-br-lg"
                            : ""
                        }
                      `}
                    >
                      {row.isMarked && (
                        <svg
                          className="w-5 h-5 mx-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01"
                          />
                        </svg>
                      )}
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
