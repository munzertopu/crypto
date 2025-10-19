import React, { useState } from "react";
import AddTransactionDrawer from "../../pages/transactions/components/AddTransactionDrawer";

const AddTransactionDrawerExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Open Add Transaction Drawer
      </button>

      <AddTransactionDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default AddTransactionDrawerExample;
