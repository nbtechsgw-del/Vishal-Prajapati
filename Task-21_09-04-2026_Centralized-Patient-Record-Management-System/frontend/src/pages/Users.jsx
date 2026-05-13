import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import toast from "react-hot-toast";

import {
  Search,
  UserPlus,
  Users as UsersIcon,
  Shield,
  Stethoscope,
} from "lucide-react";

function Users() {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
  });

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/users?search=${search}&role=${role}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, role]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // CREATE USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User created");

      fetchUsers();

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "doctor",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Creation failed");
    }
  };

  // DELETE USER
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User deleted");

      fetchUsers();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // ROLE COLORS
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700";

      case "doctor":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <DashboardLayout>
      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* TOTAL USERS */}

        <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500">Total Users</h3>

              <p className="text-4xl font-bold mt-2">{users.length}</p>
            </div>

            <div className="bg-cyan-500 p-4 rounded-2xl text-white">
              <UsersIcon size={28} />
            </div>
          </div>
        </div>

        {/* DOCTORS */}

        <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500">Doctors</h3>

              <p className="text-4xl font-bold mt-2">
                {users.filter((u) => u.role === "doctor").length}
              </p>
            </div>

            <div className="bg-blue-500 p-4 rounded-2xl text-white">
              <Stethoscope size={28} />
            </div>
          </div>
        </div>

        {/* ADMINS */}

        <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500">Admins</h3>

              <p className="text-4xl font-bold mt-2">
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>

            <div className="bg-red-500 p-4 rounded-2xl text-white">
              <Shield size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* ADD USER */}

      <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-cyan-500 p-3 rounded-2xl text-white">
            <UserPlus size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">Add New Staff</h2>

            <p className="text-gray-500">Create hospital staff accounts</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="doctor">Doctor</option>

            <option value="receptionist">Receptionist</option>

            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="md:col-span-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold p-4 rounded-2xl shadow-lg hover:scale-[1.01] transition"
          >
            Add User
          </button>
        </form>
      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 w-full"
          />
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-white border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">All Roles</option>

          <option value="admin">Admin</option>

          <option value="doctor">Doctor</option>

          <option value="receptionist">Receptionist</option>
        </select>
      </div>

      {/* USERS TABLE */}

      <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Hospital Staff
        </h2>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                  <th className="p-4 text-left rounded-l-2xl">User</th>

                  <th className="p-4 text-left">Email</th>

                  <th className="p-4 text-left">Role</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left rounded-r-2xl">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-cyan-50 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-lg">
                          {user.name?.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-gray-600">{user.email}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getRoleColor(
                          user.role,
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Users;
