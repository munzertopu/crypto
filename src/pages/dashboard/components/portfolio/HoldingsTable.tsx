import React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Card, Typography, CardBody, Avatar } from "@material-tailwind/react";
import useScreenSize from "../../../../hooks/useScreenSize";

interface Holding {
  id: string;
  name: string;
  symbol: string;
  logo?: string; // Optional logo for the asset
  balance: string;
  roi: string;
  roiChange: "positive" | "negative";
  cost: string;
  marketValue: string;
  trend24h: "up" | "down";
  trendData?: number[]; // Add trend data for the chart
}

interface HoldingsTableProps {
  holdings?: Holding[];
  isDarkMode?: boolean;
  onCryptoClick?: (symbol: string) => void;
}

const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings = [],
  onCryptoClick,
}) => {
  const TABLE_HEAD = [
    "Asset",
    "Balance",
    "ROI",
    "Cost",
    "Market Value",
    "Statistic for 24h",
    "",
  ];
  // Mock data based on the image
  const defaultHoldings: Holding[] = [
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      logo: "crypto/bitcoin-btc-logo.png",
      balance: "62,305",
      roi: "+29%",
      roiChange: "positive",
      cost: "+296,48 USDT",
      marketValue: "$5,311,117",
      trend24h: "up",
      trendData: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      logo: "crypto/ethereum-eth-logo.png",
      balance: "54,490",
      roi: "-12%",
      roiChange: "negative",
      cost: "+296,48 USDT",
      marketValue: "$481,203",
      trend24h: "down",
      trendData: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
    },
  ];

  const data = holdings.length > 0 ? holdings : defaultHoldings;
  const screenSize = useScreenSize();

  const TrendChart: React.FC<{
    trend: "up" | "down";
    data?: number[];
    mobileView?: boolean;
  }> = ({ trend, data = [], mobileView = false }) => {
    const chartColor = trend === "up" ? "#10b981" : "#ef4444";

    const options: ApexOptions = {
      chart: {
        type: "line",
        sparkline: {
          enabled: true,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: [chartColor],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.05,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              color: chartColor,
              opacity: 0.3,
            },
            {
              offset: 100,
              color: chartColor,
              opacity: 0.05,
            },
          ],
        },
      },
      colors: [chartColor],
      xaxis: {
        categories: Array.from({ length: data.length }, (_, i) => i + 1),
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        enabled: false,
      },
    };

    const series = [
      {
        name: "Trend",
        data: data.length > 0 ? data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ];

    return (
      <div className="flex items-center justify-between w-full">
        <div className="w-full sm:w-full h-12">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={32}
            width={!mobileView ? 210 : screenSize.width < 380 ? 60 : 100}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="mb-6 md:pt-6">
      <h3 className="text-lg md:text-xl font-semibold text-[#0E201E] dark:text-white text-left">
        Holdings
      </h3>

      <Card className="h-full w-full border-transparent bg-transprent shadow-none">
        <CardBody className="px-0 rounded-lg sm:overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-table-header dark:bg-gray-800 hidden sm:table-header-group">
              <tr className="">
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`cursor-pointer p-6 ${
                      index === 0 ? "rounded-l-xl" : ""
                    } ${index === TABLE_HEAD.length - 1 ? "rounded-r-md" : ""}`}
                  >
                    <Typography
                      variant="small"
                      className="flex items-center justify-start gap-2 font-normal text-sm leading-none text-[#666868] dark:text-[#B6B8BA]"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                          role="button"
                          aria-label={`Sort by ${head}`}
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(
                (
                  {
                    id,
                    name,
                    symbol,
                    logo,
                    balance,
                    roi,
                    roiChange,
                    cost,
                    marketValue,
                    trend24h,
                    trendData,
                  },
                  index
                ) => {
                  const roiClasses = `flex items-center gap-1 font-medium text-base ${
                    roiChange === "positive" ? "text-green-600" : "text-red-600"
                  }`;
                  return (
                    <tr key={id}>
                      <td className="md:p-1 sm:p-5">
                        <div className="flex items-center gap-3">
                          <Avatar src={logo} alt={name} size="md" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              className={`text-base ${
                                onCryptoClick ? "cursor-pointer" : ""
                              } text-[#0E201E] dark:text-gray-250`}
                              onClick={() =>
                                onCryptoClick && onCryptoClick(symbol)
                              }
                              role={onCryptoClick ? "button" : undefined}
                              aria-label={
                                onCryptoClick
                                  ? `View details for ${name} (${symbol})`
                                  : undefined
                              }
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              className={`text-sm font-normal text-[#666868] dark:text-[#B6B8BA]`}
                            >
                              {symbol}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell sm:hidden">
                        <div className="px-3">
                          <TrendChart
                            trend={trend24h}
                            data={trendData}
                            mobileView
                          />
                        </div>
                      </td>
                      <td className="table-cell sm:hidden">
                        <div className="flex flex-col items-center justify-end">
                          <Typography
                            variant="small"
                            className={`font-normal text-base text-[#0E201E] dark:text-gray-250`}
                          >
                            ${balance}
                          </Typography>
                          <div className="flex justify-center items-center gap-1">
                            {roi.includes("+") ? (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.0465 6.38016L7.99979 2.3335L3.95312 6.38016"
                                  stroke="#419F45"
                                  stroke-width="1.2"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M8 13.6668V2.44678"
                                  stroke="#419F45"
                                  stroke-width="1.2"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.95354 9.61984L8.00021 13.6665L12.0469 9.61984"
                                  stroke="#D8382C"
                                  stroke-width="1.2"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M8 2.33322L8 13.5532"
                                  stroke="#D8382C"
                                  stroke-width="1.2"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            )}

                            <Typography variant="small" className={roiClasses}>
                              {roi}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            className={`font-normal text-base text-[#0E201E] dark:text-gray-250`}
                          >
                            {balance}
                          </Typography>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell">
                        <Typography variant="small" className={roiClasses}>
                          {roi}
                        </Typography>
                      </td>
                      <td className="hidden sm:table-cell">
                        <Typography variant="small" className={roiClasses}>
                          {cost}
                        </Typography>
                      </td>
                      <td className="hidden sm:table-cell">
                        <Typography
                          variant="small"
                          className={`font-normal text-base text-[#0E201E] dark:text-gray-250`}
                        >
                          {marketValue}
                        </Typography>
                      </td>
                      <td className="hidden sm:table-cell">
                        <div className="font-normal">
                          <TrendChart trend={trend24h} data={trendData} />
                        </div>
                      </td>
                      <td className="hidden sm:table-cell">
                        <svg
                          className="w-6 h-6 mr-4 flex-shrink-0"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="7"
                            stroke="#9CA3AF"
                            strokeWidth="1.5"
                            fill="none"
                          />
                          <path
                            d="M5 8L7 10L11 6"
                            stroke="#9CA3AF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default HoldingsTable;
