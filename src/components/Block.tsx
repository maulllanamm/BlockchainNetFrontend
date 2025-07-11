import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { formatDate } from "../utils/formatDate";
import Transaction from "./Transaction";

type BlockData = {
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
};

type Transaction = {
  PublicKey: string;
  Signature: string;
  Sender: string;
  Receiver: string;
  Amount: number;
};

type BlockProps = {
  block: BlockData;
  index: number;
  isExpanded: boolean;
  onToggleExpand: (index: number) => void;
};

const Block: React.FC<BlockProps> = ({
  block,
  index,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <div
      key={index}
      className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
    >
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => onToggleExpand(index)}
      >
        <div className="flex items-center gap-3">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-md font-mono">
            {index + 1}
          </span>
          <div>
            <h3 className="font-medium">Block </h3>
            <p className="text-sm text-gray-400">
              {formatDate(block.timestamp)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-400">Hash</p>
            <p className="font-mono text-gray-300 text-sm truncate w-32">
              {block.hash.substring(0, 16)}...
            </p>
          </div>
          <div className="hidden md:block">
            <p className="text-sm text-gray-400">Transactions</p>
            <p className="text-gray-300">{block.transactions.length}</p>
          </div>
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-400" />
          ) : (
            <ChevronDown size={20} className="text-gray-400" />
          )}
        </div>
      </div>
      {/* expand block  */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-700 pt-4 animate-expand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-900 p-3 rounded-md">
              <p className="text-sm text-gray-400 mb-1">Hash</p>
              <p className="font-mono text-sm break-all">{block.hash}</p>
            </div>
            <div className="bg-gray-900 p-3 rounded-md">
              <p className="text-sm text-gray-400 mb-1">Previous Hash</p>
              <p className="font-mono text-sm break-all">
                {block.previousHash}
              </p>
            </div>
          </div>

          <div className="bg-gray-900 p-3 rounded-md mb-4">
            <p className="text-sm text-gray-400 mb-1">Nonce</p>
            <p className="font-mono">{block.nonce}</p>
          </div>

          <h4 className="font-medium mb-2">
            Transactions ({block.transactions.length})
          </h4>
          {block.transactions.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {block.transactions.map((tx, txIndex) => (
                <Transaction key={txIndex} transaction={tx} index={txIndex} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">
              No transactions in this block
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Block;
