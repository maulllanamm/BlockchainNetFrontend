import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Block from "../components/Block";
import { getBlocks } from "../services/api";

type Transaction = {
  PublicKey: string;
  Signature: string;
  Sender: string;
  Receiver: string;
  Amount: number;
};

type BlockData = {
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
};

type LoadingState = {
  blockchain: boolean;
  pendingTransactions: boolean;
  mineBlock: boolean;
  addTransaction: boolean;
};

const BlockchainPage = () => {
  const [blockchain, setBlockchain] = useState<BlockData[]>([]);
  const [expandedBlocks, setExpandedBlocks] = useState<Record<number, boolean>>(
    {}
  );
  const [loading, setLoading] = useState<LoadingState>({
    blockchain: false,
    pendingTransactions: false,
    mineBlock: false,
    addTransaction: false,
  });

  // Fungsi untuk toggle expand/collapse block
  const toggleBlockExpand = (index: number) => {
    setExpandedBlocks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const fetchBlockchain = async () => {
    setLoading((prev) => ({ ...prev, blockchain: true }));
    try {
      const response = await getBlocks();
      console.log(response);
      if (!response.success) throw new Error("Gagal mengambil data blockchain");
      const data = (await response.data) as BlockData[];
      console.log(data);
      if (!Array.isArray(data)) throw new Error("Data blockchain tidak valid");

      setBlockchain(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading((prev) => ({ ...prev, blockchain: false }));
    }
  };

  useEffect(() => {
    fetchBlockchain();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Blockchain Explorer</h2>
        <button className="text-gray-400 hover:text-blue-400 flex items-center gap-1">
          <Loader2
            className={`${loading.blockchain ? "animate-spin" : ""}`}
            size={16}
          />
          Refresh
        </button>
      </div>

      {blockchain.length > 0 ? (
        <div className="space-y-4">
          {blockchain.map((block, index) => (
            <Block
              key={index}
              block={block}
              index={index}
              isExpanded={!!expandedBlocks[index]}
              onToggleExpand={toggleBlockExpand}
            />
          ))}
        </div>
      ) : loading.blockchain ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-blue-400" size={48} />
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
          <AlertCircle className="mx-auto text-gray-400 mb-2" size={32} />
          <p>No blocks found in the blockchain</p>
        </div>
      )}
    </div>
  );
};

export default BlockchainPage;
