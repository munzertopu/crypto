import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

interface SummaryItem {
  label: string;
  amount: string;
  description?: string;
  emphasize?: boolean;
}

interface SettingsItem {
  label: string;
  value: string;
}

const summaryItems: SummaryItem[] = [
  {
    label: "Capital gains / P&L",
    amount: "$3,371.00",
    emphasize: true,
  },
  {
    label: "Other gains (futures, derivatives etc)",
    amount: "$0.00",
  },
  {
    label: "Income",
    amount: "$8.00",
  },
  {
    label: "Costs & expenses",
    amount: "$0.00",
  },
  {
    label: "Gifts",
    amount: "$2,000.00",
  },
  {
    label: "Donations",
    amount: "$1,500.00",
  },
  {
    label: "Lost coins",
    amount: "$2,460.00",
  },
];

const settingsItems: SettingsItem[] = [
  { label: "Home country", value: "United States" },
  { label: "Base currency", value: "USD" },
  { label: "Cost basis method", value: "FIFO" },
  { label: "Cost tracking method", value: "Wallet based" },
];

const TaxReportSummary: React.FC = () => {
  return (
    <section className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
      {/* Summary card */}
      <div className="rounded-2xl border border-gray-150 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col p-6 gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-h4 font-semibold text-gray-900 dark:text-gray-100">
                Summary
              </h3>
              <span className="rounded-full bg-gray-100 border border-gray-150 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                17 transactions
              </span>
            </div>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Below is a summary of your total transactions and taxable gains
              used in this report.
            </p>
          </div>
        </div>

        <div className="mt-6 divide-y divide-default border-t border-gray-150 dark:divide-gray-800 dark:border-gray-800">
          {summaryItems.map((item, index) => (
            <div
              key={item.label}
              className="px-6 flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-2">
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="mt-1 h-3.5 w-3.5 text-gray-400 dark:text-gray-500"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`text-sm font-semibold ${
                  item.emphasize
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {item.amount}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-300">
          This section is for informational purposes only. Download a detailed
          Tax Report for full calculations, cost basis, and disposal data.
        </div>
      </div>

      {/* Settings and download card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Settings
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Your current tax calculation settings are listed below. Adjust these
            in the Tax Settings tab if needed.
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            {settingsItems.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-3"
              >
                <dt className="text-gray-600 dark:text-gray-300">
                  {item.label}:
                </dt>
                <dd className="text-right font-medium text-gray-900 dark:text-gray-100">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="h-px w-full bg-gray-150 dark:bg-gray-800" />

        <div>
          <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Download report
          </h4>
          <label
            htmlFor="tax-report-type"
            className="mt-3 block text-xs font-medium text-gray-600 dark:text-gray-300"
          >
            Report type
          </label>
          <select
            id="tax-report-type"
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-300 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            defaultValue=""
          >
            <option value="" disabled>
              Select report type
            </option>
            <option value="detailed">Detailed Tax Report</option>
            <option value="capital-gains">Capital Gains Summary</option>
            <option value="income">Income Report</option>
          </select>

          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-[#90C853] py-2 text-sm font-semibold text-white transition hover:bg-[#7ab144]"
          >
            Download report
          </button>
        </div>
      </div>
    </section>
  );
};

export default TaxReportSummary;

