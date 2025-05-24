import { Database, Pickaxe, X } from "lucide-react";
import { useState } from "react";
import { postMining } from "../services/api";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mineAddress, setMineAddress] = useState("");
  const [isMining, setIsMining] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsMining(false);
  };

  const handleStartMining = async () => {
    if (mineAddress.trim() !== "") {
      setIsMining(true);
      const result = await postMining(mineAddress);
      console.log(result);
      closeModal();
    }
  };

  return (
    <>
      <header className="bg-gray-800 border-b border-gray-700 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Database className="text-blue-400 mr-3" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            BlockchainNet
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-300 disabled:opacity-50"
          >
            <Pickaxe className="mr-2 text-white" size={20} />
            Mine New Block
          </button>
        </div>
      </header>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300">
          {/* Modal */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md p-6 shadow-2xl relative transition-all duration-300 transform scale-100 opacity-100">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Pickaxe className="text-yellow-400 mr-2" size={20} />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Block Mining
                </span>
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors duration-300 rounded-full p-1 hover:bg-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="mineAddress"
                  className="block text-sm font-medium text-gray-300"
                >
                  Mine Address
                </label>
                <input
                  type="text"
                  id="mineAddress"
                  value={mineAddress}
                  onChange={(e) => setMineAddress(e.target.value)}
                  placeholder="Enter your mining address..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-white placeholder-gray-400"
                />
              </div>

              {isMining && (
                <div className="flex justify-center items-center py-2">
                  <div className="animate-pulse flex space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-6">
              <button
                onClick={handleStartMining}
                disabled={isMining || mineAddress.trim() === ""}
                className={`w-full py-2 px-4 rounded-md text-white font-medium flex items-center justify-center transition-all duration-300 ${
                  isMining || mineAddress.trim() === ""
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1"
                }`}
              >
                {isMining ? "Mining in Progress..." : "Start Mining"}
                {!isMining && <Pickaxe className="ml-2" size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS animations sudah ditangani melalui Tailwind classes */}
    </>
  );
}

export default Header;
