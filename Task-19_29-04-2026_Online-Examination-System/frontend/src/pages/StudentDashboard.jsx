import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");

  const fetchExams = async () => {
    try {
      const res = await API.get("/exams");
      setExams(res.data);
    } catch (err) {
      setError("Failed to load exams", err);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50">
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          Student Dashboard 🎓
        </h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>

      <div className="p-6">
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        {exams.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No exams available 📭
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {exam.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  ⏱ Time Limit: {exam.timeLimit} min
                </p>

                <button
                  onClick={() => navigate(`/exam/${exam.id}`)}
                  className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                >
                  Start Exam
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
