import { Clock, Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import { getPendingTransactions, postMining } from "../services/api";

type LoadingState = {
  blockchain: boolean;
  pendingTransactions: boolean;
  mineBlock: boolean;
  addTransaction: boolean;
};

type TransactionData = {
  publicKey: string;
  signature: string;
  sender: string;
  receiver: string;
  amount: number;
};

const TransactionPage = () => {
  const [loading, setLoading] = useState<LoadingState>({
    blockchain: false,
    pendingTransactions: false,
    mineBlock: false,
    addTransaction: false,
  });

  const [pendingTransactions, setPendingTransactions] =
    useState<TransactionData[]>();

  // Fungsi untuk mengambil pending transactions
  const fetchPendingTransactions = async () => {
    setLoading((prev) => ({ ...prev, pendingTransactions: true }));
    try {
      const response = await getPendingTransactions();
      if (!response.success)
        throw new Error("Gagal mengambil pending transactions");
      const data = (await response.data) as TransactionData[];
      console.log(data);
      setPendingTransactions(data);
    } catch (error) {
      console.log("error", `Error: ${error.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, pendingTransactions: false }));
    }
  };

  useEffect(() => {
    fetchPendingTransactions();
  }, []);

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
          <button
            onClick={fetchPendingTransactions}
            className="text-gray-400 hover:text-blue-400 flex items-center gap-1"
          >
            <Loader2
              className={`${loading.pendingTransactions ? "animate-spin" : ""}`}
              size={16}
            />
            Refresh
          </button>
        </div>
        {pendingTransactions?.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {pendingTransactions.map((tx, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-gray-600 transition-all"
              >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <Clock size={20} className="text-blue-400" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
                      <div>
                        <p className="text-xs text-gray-400">Sender</p>
                        <p className="font-mono text-sm truncate max-w-xs">
                          {tx.sender}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Receiver</p>
                        <p className="font-mono text-sm truncate max-w-xs">
                          {tx.receiver}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-xs text-gray-400">Amount</p>
                        <p className="font-mono text-sm">{tx.amount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : loading.pendingTransactions ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-blue-400" size={32} />
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
            <Clock className="mx-auto text-gray-400 mb-2" size={32} />
            <p>No pending transactions</p>
            <p className="text-gray-400 text-sm mt-1">
              Add a new transaction or wait for others to do so
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
