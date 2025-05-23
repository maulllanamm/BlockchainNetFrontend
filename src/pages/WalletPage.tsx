import React, { useState } from "react";
import { getAmount } from "../services/api";

const WalletPage = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckAmount = async () => {
    if (!address.trim()) {
      alert("Please enter a wallet address");
      return;
    }

    setIsLoading(true);
    const result = await getAmount(address);
    console.log(result);
    setAmount(result.data);
    setIsLoading(false);
  };

  return (
    <div className="md:col-span-1 bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg h-min">
      <h3 className="text-lg font-semibold mb-4 text-white">Check Amount</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Address
        </label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="Enter wallet address"
        />
      </div>

      <button
        onClick={handleCheckAmount}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 p-2 rounded-md text-white font-medium transition-all shadow-md disabled:cursor-not-allowed"
      >
        {isLoading ? "Checking..." : "Check Amount"}
      </button>

      {/* Amount Display */}
      {amount !== null && (
        <div className="mt-6 p-4 bg-gray-900 border border-gray-600 rounded-md">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Balance</p>
            <p className="text-2xl font-bold text-green-400">
              {amount.toLocaleString()} Coin
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Address: {address.substring(0, 10)}...
              {address.substring(address.length - 8)}
            </p>
          </div>
        </div>
      )}

      {/* Clear Button */}
      {amount !== null && (
        <button
          onClick={() => {
            setAmount(null);
            setAddress("");
          }}
          className="w-full mt-3 bg-gray-700 hover:bg-gray-600 p-2 rounded-md text-white font-medium transition-all"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default WalletPage;
