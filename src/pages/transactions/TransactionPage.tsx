import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import { TransactionTable, Filter } from "./components";
import useScreenSize from "../../hooks/useScreenSize";

interface TransactionPageProps {
  onLogout?: () => void;
}

interface Transaction {
  id: string;
  wallet: {
    name: string;
    symbol: string;
    address: string;
    logo: string;
    color: string;
  };
  type: "buy" | "sell" | "swap" | "transfer";
  action: "Trade" | "Receive" | "Transfer" | "Swap" | "Send" | "Deploy";
  sent: string;
  received: string;
  transactionId: string;
  result: string;
  date: string;
  status: "completed" | "pending" | "failed";
  platform: string;
  error?: string;
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

  const mockTransactions: Transaction[] = [
    {
      id: "1",
      wallet: {
        name: "Bitcoin",
        symbol: "BTC",
        address: "0yA53...F92E",
        logo: "crypto/bitcoin-btc-logo.png",
        color: "bg-orange-500",
      },
      action: "Trade",
      type: "buy",
      sent: "",
      received: "+296,48 USDT",
      transactionId: "TX-0001",
      result: "-$220.5",
      date: "06-25-2025",
      status: "completed",
      platform: "Coinbase",
      error: "Missing purchase history",
    },
    {
      id: "2",
      wallet: {
        name: "Avalanche Avax",
        symbol: "AA",
        address: "bybt-user-42",
        logo: "crypto/kraken.png",
        color: "bg-red-500",
      },
      action: "Receive",
      type: "sell",
      sent: "",
      received: "+296,48 USDT",
      transactionId: "TX-0141",
      result: "-$500",
      date: "05-07-2025",
      status: "completed",
      platform: "Binance",
      error: "No market price found",
    },
    {
      id: "3",
      wallet: {
        name: "Phantom",
        symbol: "PH",
        address: "GJH7...K5UJ",
        logo: "crypto/Phantom.png",
        color: "bg-purple-400",
      },
      action: "Transfer",
      type: "transfer",
      sent: "-1,000 USDT",
      received: "+1 BTC",
      transactionId: "TX-0093",
      result: "$0",
      date: "06-04-2025",
      status: "completed",
      platform: "Uniswap",
      error: "---",
    },
    {
      id: "4",
      wallet: {
        name: "Ethereum",
        symbol: "ETH",
        address: "0x33B4...9C1A",
        logo: "crypto/ethereum-eth-logo.png",
        color: "bg-blue-500",
      },
      action: "Swap",
      type: "swap",
      sent: "-12 USDT",
      received: "",
      transactionId: "lab-tx-468AD",
      result: "+$85",
      date: "05-29-2025",
      status: "completed",
      platform: "Phantom",
      error: "Missing purchase history",
    },
    {
      id: "5",
      wallet: {
        name: "MetaMask",
        symbol: "M",
        address: "0xA1B3...F92E",
        logo: "crypto/metamask.png",
        color: "bg-orange-400",
      },
      action: "Send",
      type: "transfer",
      sent: "-12 USDT",
      received: "",
      transactionId: "lab-tx-23A5Z",
      result: "Gain",
      date: "06-07-2025",
      status: "completed",
      platform: "Kraken",
      error: "No market price found",
    },
    // {
    //   id: "6",
    //   wallet: {
    //     name: "Arbitrum",
    //     symbol: "AM",
    //     address: "wallet-cc01",
    //     logo: "crypto/arbitrum.png",
    //     color: "bg-blue-600",
    //   },
    //   action: "Deploy",
    //   type: "buy",
    //   sent: "-12 USDT",
    //   received: "",
    //   transactionId: "TX-0108",
    //   result: "+$545",
    //   date: "05-12-2025",
    //   status: "completed",
    //   platform: "Binance",
    //   error: "---",
    // },
  ];

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
    <div className="min-h-screen bg-white dark:bg-[#0E201E]">
      <NavigationBar
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        onLogout={handleLogout}
        currentPage="transactions"
      />

      <div className="px-4 sm:px-6 lg:px-8 mt-4.5 sm:mt-8">
        {/* Header */}
        <div className="flex flex-row sm:items-center justify-between px-1 sm:px-2 lg:pl-8">
          <div className="flex gap-2 justify-start items-end">
            <h1
              className="text-lg sm:text-2xl font-semibold text-gray-900
              dark:text-[#E1E3E5]"
            >
              Transactions
            </h1>{" "}
            <h1
              className="hidden sm:inline text-xl font-semibold text-[rgba(77,80,80,1)] 
              dark:text-[#E1E3E5]"
            >
              (258)
            </h1>{" "}
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              className={`text-base font-medium px-3 py-1 sm:px-6 sm:py-3 rounded-md sm:rounded-2xl bg-[#90C853] text-[#0E201E]`}
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
