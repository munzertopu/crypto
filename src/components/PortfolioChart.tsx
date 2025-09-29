import React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { portfolioChartMockData, type PortfolioDataPoint } from "../data/portfolioAssets";

interface PortfolioChartProps {
  data?: PortfolioDataPoint[];
  chartColor?: string;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({
  data = [],
  chartColor = "#90C853",
}) => {
  // Use provided data or fall back to mock data
  const chartData = data.length > 0 ? data : portfolioChartMockData;

  // Extract values and dates for the area chart
  const values = chartData.map((d) => d.value);
  const dates = chartData.map((d) => d.date);

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.05,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: chartColor,
            opacity: 0.7,
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
      categories: dates,
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
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const date = w.globals.labels[dataPointIndex];
        
        // Format the value with thousand separators
        const formattedValue = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value);
        
        return `
          <div style="
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 12px 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            font-family: 'Be Vietnam Pro', sans-serif;
            min-width: 120px;
          ">
            <div style="
              font-weight: 600;
              font-size: 16px;
              color: #111827;
              margin-bottom: 4px;
            ">
              $${formattedValue}
            </div>
            <div style="
              font-weight: 400;
              font-size: 14px;
              color: #6b7280;
            ">
              ${date}
            </div>
          </div>
        `;
      },
    },
  };

  const series = [
    {
      name: "Portfolio Value",
      data: values,
    },
  ];

  return (
    <div className="sm:mb-6 md:mb-0">
      <div
        className="p-0 md:p-0 sm:p-3 bg-white
        dark:bg-[#0E201E]"
      >
        <div className="w-full h-100 md:-mx-4">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;
