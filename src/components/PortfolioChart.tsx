import React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface PortfolioChartProps {
  data?: Array<{ date: string; value: number }>;
  isDarkMode?: boolean;
  chartColor?: string;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({
  data = [],
  isDarkMode = false,
  chartColor = "#90C853",
}) => {
  // Mock data for demonstration - in a real app, this would come from props or API
  const mockData = [
    { date: "Jan 1", value: 2450000 },
    { date: "Jan 8", value: 2180000 },
    { date: "Jan 15", value: 2720000 },
    { date: "Jan 22", value: 1950000 },
    { date: "Jan 29", value: 2380000 },
    { date: "Feb 5", value: 1820000 },
    { date: "Feb 12", value: 2650000 },
    { date: "Feb 19", value: 2150000 },
    { date: "Feb 26", value: 2880000 },
    { date: "Mar 5", value: 1720000 },
    { date: "Mar 12", value: 2940000 },
    { date: "Mar 19", value: 2350000 },
    { date: "Mar 26", value: 1680000 },
    { date: "Apr 2", value: 3120000 },
    { date: "Apr 9", value: 1880000 },
    { date: "Apr 16", value: 2750000 },
    { date: "Apr 23", value: 2080000 },
    { date: "Apr 30", value: 1920000 },
    { date: "May 7", value: 3280000 },
    { date: "May 14", value: 1650000 },
    { date: "May 17", value: 2560000 },
    { date: "May 21", value: 2020000 },
    { date: "May 28", value: 2780000 },
    { date: "Jun 4", value: 1450000 },
    { date: "Jun 11", value: 3180000 },
    { date: "Jun 18", value: 1820000 },
    { date: "Jun 25", value: 2480000 },
    { date: "Jul 2", value: 2650000 },
    { date: "Jul 9", value: 1580000 },
    { date: "Jul 16", value: 2920000 },
    { date: "Jul 23", value: 1780000 },
    { date: "Jul 30", value: 2350000 },
    { date: "Aug 6", value: 2780000 },
    { date: "Aug 13", value: 1920000 },
    { date: "Aug 20", value: 3080000 },
    { date: "Aug 27", value: 1650000 },
    { date: "Sep 3", value: 2480000 },
    { date: "Sep 10", value: 2120000 },
    { date: "Sep 17", value: 2850000 },
    { date: "Sep 24", value: 1750000 },
    { date: "Oct 1", value: 2680000 },
    { date: "Oct 8", value: 1820000 },
    { date: "Oct 15", value: 2980000 },
    { date: "Oct 22", value: 2050000 },
    { date: "Oct 29", value: 1880000 },
    { date: "Nov 5", value: 2720000 },
    { date: "Nov 12", value: 1480000 },
    { date: "Nov 19", value: 2650000 },
    { date: "Nov 26", value: 2180000 },
    { date: "Dec 3", value: 1920000 },
    { date: "Dec 10", value: 2580000 },
    { date: "Dec 17", value: 1750000 },
    { date: "Dec 24", value: 2380000 },
    { date: "Dec 31", value: 2150000 },
  ];

  const chartData = data.length > 0 ? data : mockData;

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
        return "<div>$ " + series[seriesIndex][dataPointIndex] + "</div>";
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
    <div className="mb-4 md:mb-4 sm:mb-6">
      <div
        className="p-0 md:p-0 sm:p-3 bg-white
        dark:bg-[#0E201E]"
      >
        <div className="w-full h-100">
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
