import React from "react";
import {
  taxReportChartMockData,
  type TaxReportDataPoint,
} from "../../../data/traxreportassets";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useScreenSize from "../../../hooks/useScreenSize";

interface TaxReportChartProps {
  data?: TaxReportDataPoint[];
  chartColor?: string;
  allCapitalGains?: boolean;
}

interface CustomTooltipEntry {
  value: number;
  name?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomTooltipEntry[];
  label?: string;
}

const tooltipLabels: Record<string, string> = {
  value: "Portfolio Value",
  value2: "Capital Gains",
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
});

const TaxReportChart: React.FC<TaxReportChartProps> = ({
  data = [],
  chartColor = "#90C853",
  allCapitalGains = false,
}) => {
  // Use provided data or fall back to mock data
  const chartData = data.length > 0 ? data : taxReportChartMockData;
  const screenSize = useScreenSize();

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      const filteredPayload = payload.filter(
        (entry) => entry.value !== undefined && entry.value !== null
      );

      return (
        <div className="flex flex-col items-start justify-start gap-1 rounded-lg border border-gray-150 bg-white py-2 px-4 shadow-lg dark:border-none dark:bg-gray-800">
          {label && (
            <span className="text-xs font-medium text-gray-500 dark:text-gray-300">
              {label}
            </span>
          )}
          {filteredPayload.map((entry, index) => {
            const key = entry.name ?? `value-${index}`;
            const labelText = tooltipLabels[key] ?? key;
            return (
              <span
                key={key}
                className="text-sm font-semibold text-gray-900 dark:text-gray-200"
              >
                {`$${currencyFormatter.format(entry.value)}`}
              </span>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="sm:mb-6 md:mb-0">
      <div className="p-0 md:p-0 sm:p-3 ">
        <div className="w-full h-100 md:mx-0 mb-8 md:mb-[36px]">
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
                {allCapitalGains && (
                  <linearGradient
                    id="colorGradient2"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="rgba(83, 20, 163, 0.4)" />
                    <stop offset="95%" stopColor="rgba(83, 20, 163, 0.02)" />
                  </linearGradient>
                )}
              </defs>
              <XAxis hide dataKey="date" />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                fill="url(#colorGradient)"
              />
              {allCapitalGains && (
                <Area
                  type="monotone"
                  dataKey="value2"
                  stroke="#5314A3"
                  fill="url(#colorGradient2)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaxReportChart;
