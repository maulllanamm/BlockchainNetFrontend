import { NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <main className="p-6">
      <div className="flex border-b border-gray-700 mb-6">
        <NavLink
          to={"/blockchain"}
          className={({ isActive }) =>
            `py-3 px-6 font-medium ${
              isActive
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`
          }
        >
          Blockchain Explorer
        </NavLink>
        <NavLink
          to={"/transaction"}
          className={({ isActive }) =>
            `py-3 px-6 font-medium ${
              isActive
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`
          }
        >
          Pending Transactions
        </NavLink>
        <NavLink
          to={"/keypair"}
          className={({ isActive }) =>
            `py-3 px-6 font-medium ${
              isActive
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`
          }
        >
          Keypair
        </NavLink>
        <NavLink
          to={"/sign"}
          className={({ isActive }) =>
            `py-3 px-6 font-medium ${
              isActive
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`
          }
        >
          Sign Transaction
        </NavLink>
      </div>
      <Outlet />
    </main>
  );
}

export default MainLayout;
