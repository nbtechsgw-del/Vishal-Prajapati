import {
  FaUserInjured,
  FaCalendarCheck,
  FaFileMedical,
  FaMoneyBillWave,
  FaUsers,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

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
    <div className="w-72 bg-blue-900 text-white min-h-screen p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-10 text-center">Hospital System</h1>

      <div className="space-y-3 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 p-3 rounded-lg mt-10"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
