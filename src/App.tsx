import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainLayout from "./layouts/MainLayout";
import BlockchainPage from "./pages/BlockchainPage";
import TransactionPage from "./pages/TransactionPage";
import KeypairPage from "./pages/KeypairPage";
import SignPage from "./pages/SignPage";
import WalletPage from "./pages/WalletPage";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/blockchain" replace />} />
          <Route path="/blockchain" element={<BlockchainPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/wallets" element={<WalletPage />} />
          <Route path="/keypair" element={<KeypairPage />} />
          <Route path="/sign" element={<SignPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
