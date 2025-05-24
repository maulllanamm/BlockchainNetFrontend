import React from "react";

type TransactionData = {
  publicKey: string;
  signature: string;
  sender: string;
  receiver: string;
  amount: number;
};

type TransactionProps = {
  transaction: TransactionData;
  index: number;
};

const Transaction: React.FC<TransactionProps> = ({ transaction, index }) => {
  return (
    <div key={index} className="bg-gray-900 p-3 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <p className="text-xs text-gray-400">From</p>
          <p className="font-mono text-sm truncate">{transaction.sender}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">To</p>
          <p className="font-mono text-sm truncate">{transaction.receiver}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Amount</p>
          <p className="font-mono text-sm">{transaction.amount}</p>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
