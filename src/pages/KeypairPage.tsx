import { useState } from "react";
import { postKeypair } from "../services/api";

type KeyPairValues = {
  publicKey: string;
  privateKey: string;
  address: string;
};

const KeypairPage = () => {
  const [keypair, setKeypair] = useState<KeyPairValues>({
    publicKey: "MFkwEwYHKoZIzj0C...",
    privateKey: "MHcCAQEEIJfH1tnHo9N9LS0Z3...",
    address: "BC0964D9C29882A76F9C7F75C26...",
  });
  const handleGenerateKeypair = async () => {
    const result = await postKeypair();
    console.log(result);
    setKeypair(result);
  };
  return (
    <div className="md:col-span-1 bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg h-min">
      <h3 className="text-lg font-semibold mb-4 text-white">
        🔐 Generate Keypair
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Public Key
        </label>
        <input
          value={keypair.publicKey}
          readOnly
          disabled
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white opacity-70 cursor-not-allowed"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Private Key
        </label>
        <input
          value={keypair.privateKey}
          readOnly
          disabled
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white opacity-70 cursor-not-allowed"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          address
        </label>
        <input
          value={keypair.address}
          readOnly
          disabled
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white opacity-70 cursor-not-allowed"
        />
      </div>

      <button
        onClick={handleGenerateKeypair}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 p-2 rounded-md text-white font-medium transition-all shadow-md"
      >
        🔁 Generate Keypair
      </button>
    </div>
  );
};

export default KeypairPage;
