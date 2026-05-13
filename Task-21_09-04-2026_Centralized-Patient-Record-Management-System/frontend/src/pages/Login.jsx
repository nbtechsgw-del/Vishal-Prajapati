import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { Mail, Lock, HeartPulse } from "lucide-react";

import api from "../services/api";

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const { data } = await api.post("/auth/login", formData);

      login(data);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-blue-700 via-blue-600 to-cyan-500 items-center justify-center p-12">
        <div className="text-white max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <HeartPulse size={42} />
            <h1 className="text-4xl font-bold">MediCare System</h1>
          </div>

          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Centralized Patient Record Management
          </h2>

          <p className="text-lg text-blue-100 leading-relaxed">
            Manage patients, appointments, billing, and medical records securely
            with a modern healthcare dashboard.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>

            <p className="text-gray-500">
              Login to continue managing your system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <Mail className="text-gray-400" size={20} />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
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

              <div className="flex items-center border rounded-xl mt-2 px-4 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <Lock className="text-gray-400" size={20} />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-cyan-500 text-white p-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition duration-300"
            >
              Login
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-center text-gray-600">
            Don’t have an account?
            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-1 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
