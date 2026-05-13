import { Bell, Search } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-3xl px-6 py-4 flex items-center justify-between">
      {/* LEFT SECTION */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

        <p className="text-gray-500 mt-1">
          Welcome back,
          <span className="font-semibold text-cyan-600 ml-1">{user?.name}</span>
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-3 rounded-2xl w-72 border border-gray-200 focus-within:ring-2 focus-within:ring-cyan-500 transition">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 w-full text-sm"
          />
        </div>

        {/* NOTIFICATION */}
        <button className="relative bg-gray-100 hover:bg-gray-200 transition p-3 rounded-2xl border border-gray-200">
          <Bell size={20} className="text-gray-700" />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* USER PROFILE */}
        <div className="flex items-center gap-3 bg-gray-100 border border-gray-200 px-4 py-2 rounded-2xl">
          {/* AVATAR */}
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          {/* USER INFO */}
          <div className="hidden sm:block">
            <h3 className="font-semibold text-gray-800">{user?.name}</h3>

            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
