import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import { TransactionTable, Filter } from "./components";
import useScreenSize from "../../hooks/useScreenSize";
import { mockTransactions } from "../../data/transactionAssets";

interface TransactionPageProps {
  onLogout?: () => void;
}


const TransactionPage: React.FC<TransactionPageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [expandedTransactionId, setExpandedTransactionId] = useState<
    string | null
  >(null);
  const screenSize = useScreenSize();


  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.wallet.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.wallet.symbol
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || transaction.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || transaction.status === selectedStatus;

    // Filter based on active tab
    let matchesTab = true;
    if (activeTab === "Uncategorized") {
      // Show transactions that might be uncategorized (for demo, show first 3)
      matchesTab = ["1", "2", "3"].includes(transaction.id);
    } else if (activeTab === "Warnings") {
      // Show transactions with warnings (for demo, show last 3)
      matchesTab = ["4", "5", "6"].includes(transaction.id);
    }

    return matchesSearch && matchesType && matchesStatus && matchesTab;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleToggleExpanded = (transactionId: string) => {
    setExpandedTransactionId(
      expandedTransactionId === transactionId ? null : transactionId
    );
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0E201E]">
      <NavigationBar
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        onLogout={handleLogout}
        currentPage="transactions"
      />

      <div className="px-4 md:px-10 sm:px-6 md:pt-5 w-full">
        {/* Header */}
        <div className="flex flex-row sm:items-center justify-between px-1 sm:px-2 lg:pl-0">
          <div className="flex gap-2 justify-start items-end">
            <h4
              className="text-lg sm:text-2xl font-semibold text-gray-900
              dark:text-[#E1E3E5]"
            >
              Transactions
            </h4>{" "}
            <h1
              className="hidden sm:inline text-xl font-semibold text-[rgba(77,80,80,1)] 
              dark:text-[#E1E3E5]"
            >
              (258)
            </h1>{" "}
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              className={`text-base font-medium px-3 py-1 sm:px-6 sm:py-3 md:py-3 rounded-md sm:rounded-2xl bg-[#90C853] text-[#0E201E]`}
              aria-label="Add new transaction"
            >
              <span className="hidden sm:inline">Add Transaction</span>
              <span className="block sm:hidden text-white">+</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <Filter
          activeTab={activeTab}
          onTabChange={handleTabChange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          isDarkMode={isDarkMode}
          hideTab={screenSize.width < 640}
        />

        {/* Transactions Table */}

        <TransactionTable
          transactions={sortedTransactions}
          isDarkMode={isDarkMode}
          activeTab={activeTab}
          expandedTransactionId={expandedTransactionId}
          onToggleExpanded={handleToggleExpanded}
        />
      </div>
    </div>
  );
};

export default TransactionPage;
