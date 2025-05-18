import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainLayout from "./layouts/MainLayout";
import Blockchain from "./pages/BlockchainPage";
import Transaction from "./pages/TransactionPage";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/blockchain" replace />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/transaction" element={<Transaction />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
