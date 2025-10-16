import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

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

  return (
    <div className="px-5">
      <Card className="h-full w-full border-transparent bg-transparent shadow-none">
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
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
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
            <tbody className="bg-white">
              {details.map((detail, index) => (
                <tr key={index}>
                  <td className="px-5 py-6 md:px-5 md:py-6 sm:p-5">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
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
    </div>
  );
};

export default TradeDetailsTable;
