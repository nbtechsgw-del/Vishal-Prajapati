import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Phone,
  Building2,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";

import api from "../services/api";

import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "receptionist",
    phone: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);

      toast.success("Registration successful");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-emerald-700 via-teal-600 to-cyan-500 items-center justify-center p-12">
        <div className="text-white max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <HeartPulse size={42} />
            <h1 className="text-4xl font-bold">MediCare System</h1>
          </div>

          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Smart Healthcare Management Platform
          </h2>

          <p className="text-lg text-emerald-100 leading-relaxed">
            Create accounts for doctors, nurses, receptionists, and
            administrators with secure centralized access management.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl p-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>

            <p className="text-gray-500">
              Register a new healthcare staff account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* FULL NAME */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4 bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-500 transition">
                <User className="text-gray-400" size={20} />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4 bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-500 transition">
                <Mail className="text-gray-400" size={20} />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4 bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-500 transition">
                <Lock className="text-gray-400" size={20} />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Phone Number
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4 bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-500 transition">
                <Phone className="text-gray-400" size={20} />

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* DEPARTMENT */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Department
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4 bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-500 transition">
                <Building2 className="text-gray-400" size={20} />

                <input
                  type="text"
                  name="department"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* ROLE */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Select Role
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4 bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-500 transition">
                <ShieldCheck className="text-gray-400" size={20} />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                >
                  <option value="admin">Admin</option>

                  <option value="doctor">Doctor</option>

                  <option value="nurse">Nurse</option>

                  <option value="receptionist">Receptionist</option>
                </select>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-emerald-600 to-cyan-500 text-white p-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition duration-300"
            >
              Create Account
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-emerald-600 font-semibold ml-1 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
