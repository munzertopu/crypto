import React from "react";
import InfoCircleIcon from "../../../components/Icons/InfoCircleIcon";
import Dropdown from "../../../components/UI/Dropdown";

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
      <div className="rounded-2xl border border-default bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col px-6 pt-6 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-h4 font-semibold text-gray-900 dark:text-gray-100">
                Summary
              </h3>
              <span className="rounded-full border px-3 py-1 text-sm font-medium 
                bg-gray-100 border-gray-150 text-gray-700 
                dark:bg-gray-800 dark:text-gray-200">
                17 transactions
              </span>
            </div>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Below is a summary of your total transactions and taxable gains
              used in this report.
            </p>
          </div>
        </div>

        <div className="divide-y divide-default dark:divide-gray-800 dark:border-gray-800">
          {summaryItems.map((item, index) => (
            <div
              key={item.label}
              className="px-6 flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-2">
                <div className="flex flex-col">
                  <span className="text-base text-gray-900 dark:text-gray-200">
                    {item.label}
                  </span>
                </div>
                <InfoCircleIcon className="mt-1 h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
              </div>
              <span
                className={`text-base font-semibold ${
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

        <div className="flex mx-6 mb-7 text-left rounded-xl border-default bg-gray-100 p-3 text-gray-700 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-300">
          <div>
            <InfoCircleIcon className="mt-1.5 mx-1 h-3.5 w-3.5"/>
          </div>
          <div>
            This section is for informational purposes only. Download a detailed Tax Report for full calculations, cost basis, and disposal data.
          </div>
          
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Settings card */}
        <div className="rounded-2xl border border-default bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col px-6 pt-6 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Settings
                </h3>
              </div>
              <p className="text-left text-base text-gray-700 dark:text-gray-300">
                Your current tax calculation settings are listed below. Adjust these in the <span className="text-green-700">Tax Settings</span>  tab if needed.
              </p>
            </div>
          </div>

          <div className="divide-y divide-default dark:divide-gray-800 dark:border-gray-800">
            {settingsItems.map((item, index) => (
              <div
                key={item.label}
                className="px-6 flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-2">
                  <div className="flex flex-col">
                    <span className="text-base text-medium text-gray-900 dark:text-gray-200">
                      {item.label}:
                    </span>
                  </div>
                </div>
                <span
                  className={`text-base font-semibold text-gray-900 dark:text-gray-100`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-default bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="px-6 pt-6 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Download report
              </h3>
            </div>
            <div>
              <div className="my-4">
                <div className="text-left text-sm mb-2">
                  Report type
                </div>
                <Dropdown
                  options={[
                    { label: "Detailed Tax Report", value: "detailed" },
                    { label: "Capital Gains Summary", value: "capital-gains" },
                    { label: "Income Report", value: "income" },
                  ]}
                  onSelect={(value) => {
                    console.log("Selected report type:", value);
                  }}
                  searchable={false}
                  inputClassName="md:py-2"
                />
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-green-500 py-2 text-base font-semibold text-gray-900 transition"
              >
                Download report
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxReportSummary;

