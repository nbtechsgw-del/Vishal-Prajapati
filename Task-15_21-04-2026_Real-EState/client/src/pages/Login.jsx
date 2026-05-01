import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      const userData = res.data;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);

      if (userData.role === "agent") {
        navigate("/agent");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email... "
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
