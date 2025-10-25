export interface Transaction {
  id: string;
  wallet: {
    name: string;
    symbol: string;
    address: string;
    logo: string;
    color: string;
  };
  type: "buy" | "sell" | "swap" | "transfer";
  action:
    | "Trade"
    | "Receive"
    | "Transfer"
    | "Swap"
    | "Send"
    | "Deploy"
    | "Deposit";
  sent: string;
  received: string;
  transactionId: string;
  current: string;
  result: string;
  date: string;
  time: string;
  status: "completed" | "pending" | "failed";
  platform: string;
  error?: string;
}

export const mockTransactions: Transaction[] = [
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
    current: "$1500",
    type: "buy",
    sent: "-320 BTC",
    received: "+296,48 USDT",
    transactionId: "TX-0001",
    result: "-$220.5",
    date: "06-25-2025",
    time: "02:15PM",
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
    action: "Transfer",
    current: "$1300",
    type: "sell",
    sent: "-150 USDT",
    received: "+296,48 USDT",
    transactionId: "TX-0141",
    result: "-$500",
    date: "06-25-2025",
    time: "09:30AM",
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
    current: "$100",
    type: "transfer",
    sent: "-1,000 USDT",
    received: "+1 BTC",
    transactionId: "TX-0093",
    result: "$0",
    date: "05-29-2025",
    time: "11:45AM",
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
    current: "$500",
    type: "swap",
    sent: "-12 USDT",
    received: "",
    transactionId: "lab-tx-468AD",
    result: "+$85",
    date: "05-29-2025",
    time: "04:20PM",
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
    action: "Deposit",
    current: "$15",
    type: "transfer",
    sent: "-12 USDT",
    received: "",
    transactionId: "lab-tx-23A5Z",
    result: "Gain",
    date: "05-29-2025",
    time: "07:55PM",
    status: "completed",
    platform: "Kraken",
    error: "No market price found",
  },
  {
    id: "6",
    wallet: {
      name: "Solana",
      symbol: "SOL",
      address: "0x8F2A...B3C4",
      logo: "crypto/solana-sol-logo.png",
      color: "bg-purple-500",
    },
    action: "Deposit",
    current: "$43.5",
    type: "buy",
    sent: "-500 USDT",
    received: "+25 SOL",
    transactionId: "TX-0205",
    result: "+$125.50",
    date: "06-10-2025",
    time: "01:30PM",
    status: "completed",
    platform: "Binance",
    error: "---",
  },
  {
    id: "7",
    wallet: {
      name: "Chainlink",
      symbol: "LINK",
      address: "0x5D8F...E7A2",
      logo: "crypto/chainlink-link-logo.png",
      color: "bg-blue-600",
    },
    action: "Swap",
    current: "$789",
    type: "sell",
    sent: "-100 LINK",
    received: "+1,200 USDT",
    transactionId: "TX-0312",
    result: "+$200",
    date: "06-10-2025",
    time: "10:45AM",
    status: "completed",
    platform: "Coinbase",
    error: "---",
  },
  {
    id: "8",
    wallet: {
      name: "Tether",
      symbol: "USDT",
      address: "0x9A3B...C5D6",
      logo: "crypto/tether-usdt-logo.png",
      color: "bg-green-500",
    },
    action: "Transfer",
    current: "$54",
    type: "transfer",
    sent: "-2,000 USDT",
    received: "",
    transactionId: "TX-0456",
    result: "$0",
    date: "06-10-2025",
    time: "03:20PM",
    status: "completed",
    platform: "Kraken",
    error: "---",
  },
];

// Dynamic table headers based on active tab
export const getTableHeaders = (activeTab: string): string[] => {
  switch (activeTab) {
    case "All":
      return [
        "select",
        "Wallet",
        "Action",
        "Sent",
        "Received",
        "Gain/Loss",
        "Transaction ID",
        "",
      ];
    case "Uncategorized":
      return [
        "select",
        "Wallet",
        "Action",
        "Sent",
        "Received",
        "Gain/Loss",
        "Transaction ID",
        "",
      ];
    case "Warnings":
      return [
        "select",
        "Wallet",
        "Action",
        "Sent",
        "Received",
        "Warning",
        "Transaction ID",
        "Error",
        "",
      ];
    default:
      return [
        "select",
        "Wallet",
        "Action",
        "Sent",
        "Received",
        "Gain/Loss",
        "Transaction ID",
        "",
      ];
  }
};

// Ledger data interface
export interface LedgerData {
  id: number;
  identifier: {
    icon: string;
    color: string;
    text: string;
  };
  date: string;
  type: string;
  ledger: string;
  change: string;
  balance: string;
}

// Cost analysis data interface
export interface CostAnalysisData {
  id: number;
  date: string;
  info: string;
  holdingPeriod: string;
  amount: string;
  costUSD: string;
  gainUSD: string;
  isMarked: boolean;
}

// Ledger data for transaction details
export const ledgerData: LedgerData[] = [
  {
    id: 1,
    identifier: { icon: "₿", color: "bg-orange-500", text: "View txn" },
    date: "4 Jan, 2025, 17:47",
    type: "Send",
    ledger: "ETH - Bitocion",
    change: "-0.32348600",
    balance: "+23.9830191",
  },
  {
    id: 2,
    identifier: { icon: "♦", color: "bg-blue-500", text: "View txn" },
    date: "21 Nov, 2024, 13:09",
    type: "Receive",
    ledger: "ETH - Phantom",
    change: "+0.292096470",
    balance: "+23.9830191",
  },
  {
    id: 3,
    identifier: { icon: "☰", color: "bg-purple-600", text: "View txn" },
    date: "19 Sep, 2024, 08:23",
    type: "Send",
    ledger: "ETH - Metamask",
    change: "-0.1",
    balance: "-2.903724",
  },
];

// Cost analysis data for transaction details
export const costAnalysisData: CostAnalysisData[] = [
  {
    id: 1,
    date: "4 Jan, 2025, 17:47",
    info: "Own transfer",
    holdingPeriod: "212 days (Short)",
    amount: "-0.2535",
    costUSD: "579.56",
    gainUSD: "0.00",
    isMarked: false,
  },
  {
    id: 2,
    date: "4 Jan, 2025, 17:49",
    info: "Invested in ETH",
    holdingPeriod: "212 days (Short)",
    amount: "-0.2535",
    costUSD: "579.56",
    gainUSD: "0.00",
    isMarked: true,
  },
];
