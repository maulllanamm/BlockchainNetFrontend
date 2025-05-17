import React from "react";

type TransactionData = {
  PublicKey: string;
  Signature: string;
  Sender: string;
  Receiver: string;
  Amount: number;
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
          <p className="font-mono text-sm truncate">{transaction.Sender}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">To</p>
          <p className="font-mono text-sm truncate">{transaction.Receiver}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Amount</p>
          <p className="font-mono text-sm">{transaction.Amount}</p>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
