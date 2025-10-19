import React, { useState } from "react";
import MobileBottomSheet from "./MobileBottomSheet";
import { Transaction } from "../../data/transactionAssets";

const MobileBottomSheetExample: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Sample transaction data
  const sampleTransaction: Transaction = {
    id: "1",
    wallet: {
      name: "Bitcoin",
      symbol: "BTC",
      address: "bybt-user-42",
      logo: "crypto/bitcoin-btc-logo.png",
      color: "bg-orange-500",
    },
    action: "Trade",
    type: "buy",
    sent: "",
    received: "+296,48 USDT",
    transactionId: "7517",
    result: "-$220.5",
    date: "2025-04-05",
    time: "2:43 AM",
    status: "completed",
    platform: "Coinbase",
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setSelectedTransaction(sampleTransaction)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Open Mobile Bottom Sheet
      </button>

      <MobileBottomSheet
        isOpen={selectedTransaction !== null}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default MobileBottomSheetExample;
