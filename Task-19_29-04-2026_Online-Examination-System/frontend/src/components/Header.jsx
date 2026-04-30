import { useNavigate } from "react-router-dom";

const Header = ({ title, showAuthButtons = false }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="w-full bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>

      <div className="flex items-center gap-3">
        {showAuthButtons ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
