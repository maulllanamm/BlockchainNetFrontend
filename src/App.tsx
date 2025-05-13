import Header from "./layouts/MainLayout/Header";
import MainLayout from "./layouts/MainLayout/MainLayout";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <Header />
        <MainLayout />
      </div>
    </>
  );
}

export default App;
