import { AlertCircle, ChevronUp, Loader2 } from "lucide-react";
import { useState } from "react";

function MainLayout() {
  const [activeTab, setActiveTab] = useState("Blockchain");
  const [blockchain, setBlockchain] = useState([]);
  const [loading, setLoading] = useState({
    blockchain: false,
    pendingTransactions: false,
    mineBlock: false,
    addTransaction: false,
  });
  return (
    <main className="p-6">
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`py-3 px-6 font-medium ${
            activeTab === "blockchain"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("blockchain")}
        >
          Blockchain Explorer
        </button>
        <button
          className={`py-3 px-6 font-medium ${
            activeTab === "transactions"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("transactions")}
        >
          Pending Transactions
        </button>
      </div>
      {activeTab === "blockchain" && (
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
                <div
                  key={index}
                  className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
                >
                  <div className="p-4 flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-md font-mono">
                        #
                      </span>
                      <div>
                        <h3 className="font-medium">Block #</h3>
                        <p className="text-sm text-gray-400">"12-12-2012"</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block">
                        <p className="text-sm text-gray-400">Hash</p>
                        <p className="font-mono text-gray-300 text-sm truncate w-32">
                          ...
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-sm text-gray-400">Transactions</p>
                        <p className="text-gray-300">1</p>
                      </div>
                      <ChevronUp size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
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
      )}
    </main>
  );
}

export default MainLayout;
