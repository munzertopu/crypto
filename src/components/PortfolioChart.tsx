import React, { useEffect, useState } from "react";

import type { ApexOptions } from "apexcharts";
import {
  portfolioChartMockData,
  type PortfolioDataPoint,
} from "../data/portfolioAssets";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useScreenSize from "../hooks/useScreenSize";
interface PortfolioChartProps {
  data?: PortfolioDataPoint[];
  chartColor?: string;
}
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({
  data = [],
  chartColor = "#90C853",
}) => {
  // Use provided data or fall back to mock data
  const chartData = data.length > 0 ? data : portfolioChartMockData;
  const screenSize = useScreenSize();
  // Extract values and dates for the area chart
  const values = chartData.map((d) => d.value);
  const dates = chartData.map((d) => d.date);

  // const options: ApexOptions = {
  //   chart: {
  //     type: "area",
  //     toolbar: {
  //       show: false,
  //     },
  //     zoom: {
  //       enabled: false,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     curve: "straight",
  //     width: 2,
  //   },
  //   fill: {
  //     type: "gradient",
  //     gradient: {
  //       shadeIntensity: 1,
  //       opacityFrom: 0.7,
  //       opacityTo: 0.05,
  //       stops: [0, 100],
  //       colorStops: [
  //         {
  //           offset: 0,
  //           color: chartColor,
  //           opacity: 0.7,
  //         },
  //         {
  //           offset: 100,
  //           color: chartColor,
  //           opacity: 0.05,
  //         },
  //       ],
  //     },
  //   },
  //   colors: [chartColor],
  //   xaxis: {
  //     categories: dates,
  //     labels: {
  //       show: false,
  //     },
  //     axisBorder: {
  //       show: false,
  //     },
  //     axisTicks: {
  //       show: false,
  //     },
  //   },
  //   yaxis: {
  //     labels: {
  //       show: false,
  //     },
  //     axisBorder: {
  //       show: false,
  //     },
  //     axisTicks: {
  //       show: false,
  //     },
  //   },
  //   grid: {
  //     show: false,
  //   },
  //   tooltip: {
  //     enabled: true,
  //     custom: function ({ series, seriesIndex, dataPointIndex, w }) {
  //       return "<div>$ " + series[seriesIndex][dataPointIndex] + "</div>";
  //     },
  //   },
  // };

  // const series = [
  //   {
  //     name: "Portfolio Value",
  //     data: values,
  //   },
  // ];
  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex flex-col justify-start items-center py-2 px-4 gap-[2px] bg-white dark:bg-gray-800  rounded-lg shadow-lg border border-gray-150 dark:border-none">
          <p className="text-base font-medium text-gray-900 dark:text-gray-200">{`$${payload[0].value}`}</p>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-300">{`${label}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="sm:mb-6 md:mb-0">
      <div
        className="p-0 md:p-0 sm:p-3 bg-white
        dark:bg-[#0E201E]"
      >
        <div className="w-full h-100 md:mx-6 mb-8 md:mb-[36px]">
          {/* <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={320}
          /> */}
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: screenSize.width < 640 ? 0 : 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(144, 200, 83, 0.4)" />
                  <stop offset="95%" stopColor="rgba(144, 200, 83, 0.02)" />
                </linearGradient>
              </defs>
              <XAxis hide={true} dataKey="date" />
              <YAxis hide={true} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#90c853"
                fill="url(#colorGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;
