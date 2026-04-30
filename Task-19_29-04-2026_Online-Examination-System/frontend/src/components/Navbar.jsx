import { useNavigate } from "react-router-dom";

const Navbar = ({ title, isPublic = false }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-full bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>

      <div className="flex items-center gap-3">
        {isPublic ? (
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
          <>
            {role === "student" && (
              <>
                <button
                  onClick={() => navigate("/student")}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => navigate("/results")}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Results
                </button>
              </>
            )}

            {role === "admin" && (
              <>
                <button
                  onClick={() => navigate("/admin")}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => navigate("/admin/create-exam")}
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                >
                  Create Exam
                </button>
              </>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
