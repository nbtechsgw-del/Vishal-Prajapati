import {
  FaUserInjured,
  FaCalendarCheck,
  FaFileMedical,
  FaMoneyBillWave,
  FaUsers,
  FaSignOutAlt,
  FaHome,
  FaChartLine,
} from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { HeartPulse } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const adminMenu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },

    {
      name: "Analytics",
      icon: <FaChartLine />,
      path: "/admin-dashboard",
    },

    {
      name: "Patients",
      icon: <FaUserInjured />,
      path: "/patients",
    },

    {
      name: "Appointments",
      icon: <FaCalendarCheck />,
      path: "/appointments",
    },

    {
      name: "Medical Records",
      icon: <FaFileMedical />,
      path: "/records",
    },

    {
      name: "Billing",
      icon: <FaMoneyBillWave />,
      path: "/billing",
    },

    {
      name: "Users",
      icon: <FaUsers />,
      path: "/users",
    },
  ];

  const doctorMenu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Patients",
      icon: <FaUserInjured />,
      path: "/patients",
    },
    {
      name: "Medical Records",
      icon: <FaFileMedical />,
      path: "/records",
    },
  ];

  const receptionistMenu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Patients",
      icon: <FaUserInjured />,
      path: "/patients",
    },
    {
      name: "Appointments",
      icon: <FaCalendarCheck />,
      path: "/appointments",
    },
    {
      name: "Billing",
      icon: <FaMoneyBillWave />,
      path: "/billing",
    },
  ];

  let menuItems = [];

  if (user?.role === "admin") {
    menuItems = adminMenu;
  } else if (user?.role === "doctor") {
    menuItems = doctorMenu;
  } else {
    menuItems = receptionistMenu;
  }

  return (
    <div className="w-72 min-h-screen bg-linear-to-b from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col p-5 sticky top-0 shadow-2xl">
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-cyan-500 p-3 rounded-2xl shadow-lg">
          <HeartPulse size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">MediCare</h1>

          <p className="text-sm text-slate-300">Hospital System</p>
        </div>
      </div>

      {/* USER PROFILE */}
      <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-4 mb-8">
        <h2 className="text-lg font-semibold capitalize">
          {user?.name || "User"}
        </h2>

        <div className="mt-2 inline-block bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full capitalize">
          {user?.role}
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group
              
              ${
                isActive
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "hover:bg-white/10 text-slate-200"
              }`}
            >
              <div className="text-lg">{item.icon}</div>

              <span className="font-medium tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="mt-8 flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition-all duration-300 p-4 rounded-2xl font-semibold shadow-lg"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
