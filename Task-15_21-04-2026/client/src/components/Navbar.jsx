import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null); 
    navigate("/");
  };

  return (
    <header>
      <div className="logo" onClick={() => navigate("/")}>
        EState
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* USER */}
          {user?.role === "user" && (
            <li>
              <Link to="/bookings">My Bookings</Link>
            </li>
          )}

          {/* AGENT */}
          {user?.role === "agent" && (
            <>
              <li>
                <Link to="/agent">Dashboard</Link>
              </li>
              <li>
                <Link to="/add-property">Add Property</Link>
              </li>
            </>
          )}

          {/* AUTH */}
          {!user ? (
            <>
              <li>
                <Link to="/login" className="btn">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}