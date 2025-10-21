import React, { useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface TradeDetail {
  acquiredOn: string;
  holdingPeriod: string;
  amount: string;
  costUSD: string;
  gainUSD: string;
}

interface TradeDetailsTableProps {
  details: TradeDetail[];
}

const TradeDetailsTable: React.FC<TradeDetailsTableProps> = ({ details }) => {
  const TABLE_HEAD = ["Aquired on", "Holding period", "Amount", "Cost(USD)", "Gain(USD)"];
  
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItemSelection = (index: number) => {
    setSelectedItems(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };

  const toggleAllSelection = () => {
    if (selectedItems.size === details.length && details.length > 0) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(details.map((_, index) => index)));
    }
  };

  const toggleItemExpansion = (index: number) => {
    setExpandedItems(prevExpanded => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(index)) {
        newExpanded.delete(index);
      } else {
        newExpanded.add(index);
      }
      return newExpanded;
    });
  };


  return (
    <div className="md:px-5 relative">
      {/* Mobile Accordion Layout */}
      <div className="block sm:hidden space-y-2">
        {details.map((detail, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center p-4">
              {/* Checkbox */}
              <div
                className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors cursor-pointer ${
                  selectedItems.has(index)
                    ? "bg-green-600 border-green-600"
                    : "border-gray-300"
                }`}
                onClick={() => toggleItemSelection(index)}
              >
                {selectedItems.has(index) && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              
              {/* Title and Chevron */}
              <button
                onClick={() => toggleItemExpansion(index)}
                className="flex-1 flex justify-between items-center ml-3 text-left focus:outline-none"
              >
                <span className="text-base font-medium text-gray-900 dark:text-white">
                  {detail.acquiredOn}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                    expandedItems.has(index) ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            
            {/* Expanded Content */}
            {expandedItems.has(index) && (
              <div className="px-4 pb-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Amount:
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {detail.amount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Holding Period:
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {detail.holdingPeriod}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Cost(USD):
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      ${detail.costUSD}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Gain(USD):
                    </span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {detail.gainUSD}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Mobile Selected Items Bar */}
        {selectedItems.size > 0 && (
          <div className="sticky bottom-0 left-0 right-0 z-50 px-5">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedItems.size} selected
                  </span>
                  <button 
                    onClick={() => setSelectedItems(new Set())}
                    className="text-sm font-medium px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
                  >
                    Clear All
                  </button>
                </div>
                <button
                  onClick={() => setSelectedItems(new Set())}
                  className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <Card className="hidden sm:block h-full w-full border-transparent bg-transparent shadow-none relative z-10">
        <CardBody className="bg-table-header dark:bg-gray-800 px-1 pt-5 pb-6 rounded-lg sm:overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="hidden sm:table-header-group">
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`px-5 pb-2 ${
                      index === 0 ? "rounded-l-xl" : ""
                    } ${index === TABLE_HEAD.length - 1 ? "rounded-r-md" : ""}`}
                  >
                    {index === 0 ? (
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors cursor-pointer ${
                            selectedItems.size === details.length && details.length > 0
                              ? "bg-green-600 border-green-600"
                              : "border-gray-300"
                          }`}
                          onClick={toggleAllSelection}
                        >
                          {selectedItems.size === details.length && details.length > 0 && (
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <Typography
                          variant="small"
                          className="font-normal text-sm leading-none text-[#666868] dark:text-[#B6B8BA]"
                        >
                          {head}
                        </Typography>
                      </div>
                    ) : (
                      <Typography
                        variant="small"
                        className="flex items-center justify-start gap-2 font-normal text-sm leading-none text-[#666868] dark:text-[#B6B8BA]"
                      >
                        {head}
                      </Typography>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              {details.map((detail, index) => (
                <tr key={index}>
                  <td className="px-5 py-6 md:px-5 md:py-6 sm:p-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors cursor-pointer ${
                          selectedItems.has(index)
                            ? "bg-green-600 border-green-600"
                            : "border-gray-300"
                        }`}
                        onClick={() => toggleItemSelection(index)}
                      >
                        {selectedItems.has(index) && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <Typography
                        variant="small"
                        className="font-normal text-base text-gray-900 dark:text-gray-100"
                      >
                        {detail.acquiredOn}
                      </Typography>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-5">
                    <Typography
                      variant="small"
                      className="font-normal text-base text-gray-900 dark:text-gray-100"
                    >
                      {detail.holdingPeriod}
                    </Typography>
                  </td>
                  <td className="hidden sm:table-cell px-5">
                    <Typography
                      variant="small"
                      className="font-normal text-base text-gray-900 dark:text-gray-100"
                    >
                      {detail.amount}
                    </Typography>
                  </td>
                  <td className="hidden sm:table-cell px-5">
                    <Typography
                      variant="small"
                      className="font-normal text-base text-gray-900 dark:text-gray-100"
                    >
                      {detail.costUSD}
                    </Typography>
                  </td>
                  <td className="hidden sm:table-cell px-5">
                    <Typography
                      variant="small"
                      className="font-medium text-base text-green-600 dark:text-green-400"
                    >
                      {detail.gainUSD}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Desktop Selected Items Bar */}
      {selectedItems.size > 0 && (
        <div className="hidden sm:block absolute px-6 py-3 -bottom-15 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center rounded-xl shadow-sm border border-default w-max z-50">
          <div className="flex items-center gap-4">
            <Typography variant="small" className="text-sm text-gray-600 dark:text-white">
              {selectedItems.size} selected
            </Typography>
            <button className="text-sm font-medium px-2.5 py-1.5 bg-white dark:bg-gray-700 border border-default text-gray-900 dark:text-gray-200 rounded-md">
              Remove
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-default dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              onClick={() => setSelectedItems(new Set())}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default TradeDetailsTable;
