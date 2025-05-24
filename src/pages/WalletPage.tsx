import React, { useState } from "react";
import { getAmount, getTransactions } from "../services/api";

const WalletPage = () => {
  // States for Amount Checker
  const [amount, setAmount] = useState<number>(null);
  const [amountAddress, setAmountAddress] = useState<string>("");
  const [isAmountLoading, setIsAmountLoading] = useState<boolean>(false);

  // States for Transaction Checker
  const [transactions, setTransactions] = useState(null);
  const [transactionAddress, setTransactionAddress] = useState("");
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const handleCheckAmount = async () => {
    if (!amountAddress.trim()) {
      alert("Please enter a wallet address");
      return;
    }

    setIsAmountLoading(true);
    try {
      const result = await getAmount(amountAddress);
      setAmount(result.data);
    } catch (error) {
      console.error("Error fetching amount:", error);
      alert("Error fetching amount");
    } finally {
      setIsAmountLoading(false);
    }
  };

  const handleCheckTransactions = async () => {
    if (!transactionAddress.trim()) {
      alert("Please enter a wallet address");
      return;
    }

    setIsTransactionLoading(true);
    try {
      const result = await getTransactions(transactionAddress);
      console.log(result);
      setTransactions(result.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert("Error fetching transactions");
    } finally {
      setIsTransactionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in mx-auto">
        {/* Amount Checker Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg h-fit">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Check Amount
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Wallet Address
            </label>
            <input
              value={amountAddress}
              onChange={(e) => setAmountAddress(e.target.value)}
              className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter wallet address"
            />
          </div>

          <button
            onClick={handleCheckAmount}
            disabled={isAmountLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 p-2 rounded-md text-white font-medium transition-all shadow-md disabled:cursor-not-allowed"
          >
            {isAmountLoading ? "Checking..." : "Check Amount"}
          </button>

          {/* Amount Display */}
          {amount !== null && (
            <div className="mt-6 p-4 bg-gray-900 border border-gray-600 rounded-md">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">Balance</p>
                <p className="text-2xl font-bold text-green-400">
                  {amount} Coin
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Address: {amountAddress.substring(0, 10)}...
                  {amountAddress.substring(amountAddress.length - 8)}
                </p>
              </div>
            </div>
          )}

          {/* Clear Amount Button */}
          {amount !== null && (
            <button
              onClick={() => {
                setAmount(null);
                setAmountAddress("");
              }}
              className="w-full mt-3 bg-gray-700 hover:bg-gray-600 p-2 rounded-md text-white font-medium transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {/* Transaction Checker Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg h-fit">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Check Transactions
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Wallet Address
            </label>
            <input
              value={transactionAddress}
              onChange={(e) => setTransactionAddress(e.target.value)}
              className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="Enter wallet address"
            />
          </div>

          <button
            onClick={handleCheckTransactions}
            disabled={isTransactionLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 p-2 rounded-md text-white font-medium transition-all shadow-md disabled:cursor-not-allowed"
          >
            {isTransactionLoading ? "Loading..." : "Check Transactions"}
          </button>

          {/* Transactions Display */}
          {transactions && (
            <div className="mt-6">
              <div className="mb-3 p-3 bg-gray-900 border border-gray-600 rounded-md">
                <p className="text-sm text-gray-400">Recent Transactions</p>
                <p className="text-lg font-semibold text-white">
                  {transactions.length} transactions found
                </p>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-900 border border-gray-600 rounded-md"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-sm font-medium ${
                          tx.transaction.sender === "SYSTEM"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {tx.transaction.sender}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          tx.transaction.amount > 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {tx.transaction.amount > 0 ? "+" : ""}
                        {tx.transaction.amount} Coin
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      Hash: {tx.blockHash}
                    </p>
                    <p className="text-xs text-gray-400">{tx.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clear Transactions Button */}
          {transactions && (
            <button
              onClick={() => {
                setTransactions(null);
                setTransactionAddress("");
              }}
              className="w-full mt-3 bg-gray-700 hover:bg-gray-600 p-2 rounded-md text-white font-medium transition-all"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
