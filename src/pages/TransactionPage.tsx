import { Clock, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import TransactionForm from "../components/TransactionForm";

type LoadingState = {
  blockchain: boolean;
  pendingTransactions: boolean;
  mineBlock: boolean;
  addTransaction: boolean;
};

const Transaction = () => {
  const [loading, setLoading] = useState<LoadingState>({
    blockchain: false,
    pendingTransactions: false,
    mineBlock: false,
    addTransaction: false,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      {/* Form tambah transaction */}
      <div className="md:col-span-1 bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg h-min">
        <h3 className="text-lg font-medium mb-4">Add New Transaction</h3>
        <TransactionForm loading="loading" />
      </div>

      {/* Pending transactions */}
      <div className="md:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Pending Transactions</h3>
          <button className="text-gray-400 hover:text-blue-400 flex items-center gap-1">
            <Loader2
              className={`${loading.pendingTransactions ? "animate-spin" : ""}`}
              size={16}
            />
            Refresh
          </button>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
          <Clock className="mx-auto text-gray-400 mb-2" size={32} />
          <p>No pending transactions</p>
          <p className="text-gray-400 text-sm mt-1">
            Add a new transaction or wait for others to do so
          </p>
        </div>

        <div className="mt-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-300 disabled:opacity-50">
              {loading.mineBlock ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Plus size={18} />
              )}
              Mine Block with Transactions
            </button>
            <span className="text-sm text-gray-400">pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
