import React, { useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import NavigationBar from "../../components/NavigationBar";
import PortfolioTab from "./tabs/PortfolioTab";
import TaxTab from "./tabs/TaxTab";
import FormInfoTab from "./tabs/FormInfoTab";
import CostBasisTab from "./tabs/CostBasisTab";
import RulesTab from "./tabs/RulesTab";
import CustomPriceTab from "./tabs/CustomPriceTab";
import PlansTab from "./tabs/PlansTab";

interface SettingsPageProps {
  onLogout?: () => void;
}

// SVG Icon Components
const PortfolioIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const TaxIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
    />
  </svg>
);

const FormInfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const CostBasisIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    />
  </svg>
);

const RulesIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

const CustomPriceIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const PlansIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
      clip-rule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z"
      clip-rule="evenodd"
    />
  </svg>
);

interface SettingsTab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType<{}>;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState("portfolio");

  const settingsTabs: SettingsTab[] = [
    {
      id: "portfolio",
      name: "Portfolio",
      icon: PortfolioIcon,
      component: PortfolioTab,
    },
    { id: "tax", name: "Tax", icon: TaxIcon, component: TaxTab },
    {
      id: "formInfo",
      name: "Form Info",
      icon: FormInfoIcon,
      component: FormInfoTab,
    },
    {
      id: "costBasis",
      name: "Cost Basis",
      icon: CostBasisIcon,
      component: CostBasisTab,
    },
    { id: "rules", name: "Rules", icon: RulesIcon, component: RulesTab },
    {
      id: "customPrice",
      name: "Custom Price",
      icon: CustomPriceIcon,
      component: CustomPriceTab,
    },
    { id: "plans", name: "Plans", icon: PlansIcon, component: PlansTab },
  ];


  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const renderTabContent = () => {
    const activeTabData = settingsTabs.find((tab) => tab.id === activeTab);
    if (activeTabData) {
      const TabComponent = activeTabData.component;
      return <TabComponent />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E201E] text-gray-900 dark:text-gray-150">
      <NavigationBar
        onLogout={handleLogout}
        currentPage="settings"
      />
      <div className="px-4 md:px-10 sm:px-6 md:pt-5 w-full">
        <Typography
          variant="h4"
          className={`text-xl font-semibold mb-6 text-left ${
            "text-[#0E201E] dark:text-white"
          }`}
        >
          Settings
        </Typography>
        <div className="flex">
          {/* Left Sidebar */}
          <nav className="space-y-2">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-left text-sm ${
                  activeTab === tab.id ? 
                  `text-gray-900 dark:text-gray-150 bg-gray-100 dark:bg-gray-700 dark:border-gray-600` : 
                  `text-[#0E201E]  hover:bg-[#F3F5F7] dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white`
                }`}
              >
                <tab.icon
                  className={`w-5 h-5 ${
                    activeTab === tab.id ? "text-gray-500" : "text-[#7C7C7C]"
                  }`}
                />
                <span className="!mr-12 font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
          
          {/* Main Content */}
          <div className="flex-1 px-10 overflow-visible">
            <Card
              className={`border-transparent shadow-transparent bg-white dark:bg-transparent overflow-visible`}
            >
              <CardBody className="px-5 py-0 overflow-visible">{renderTabContent()}</CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
