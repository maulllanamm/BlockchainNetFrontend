import { Database, Pickaxe } from "lucide-react";

function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Database className="text-blue-400 mr-3" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          BlockchainNet
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-300 disabled:opacity-50">
          <Pickaxe className="mr-2 text-white-600" size={20} />
          Mine New Block
        </button>
      </div>
    </header>
  );
}

export default Header;
