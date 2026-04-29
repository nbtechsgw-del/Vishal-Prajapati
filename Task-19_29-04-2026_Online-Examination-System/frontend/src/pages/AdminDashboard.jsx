import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);

  const fetchExams = async () => {
    try {
      const res = await API.get("/exams");
      setExams(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await API.get("/results");
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExams();
    fetchResults();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50">
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard 🧑‍💼</h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>

      <div className="p-6 max-w-6xl mx-auto space-y-10">
        <div className="flex justify-end">
          <button
            onClick={() => alert("Go to Create Exam Page")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition"
          >
            + Create Exam
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📚 Exams</h3>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-gray-800">
                  {exam.title}
                </h4>

                <p className="text-gray-600 mt-2">
                  ⏱ Time: {exam.timeLimit} min
                </p>

                <p className="mt-1">
                  Status:{" "}
                  <span
                    className={
                      exam.isPublished
                        ? "text-green-600 font-medium"
                        : "text-yellow-600 font-medium"
                    }
                  >
                    {exam.isPublished ? "Published" : "Draft"}
                  </span>
                </p>

                <button
                  onClick={() => navigate(`/exam/${exam.id}`)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🏆 Leaderboard
          </h3>

          <div className="space-y-4">
            {results.map((r, index) => (
              <div
                key={r.id}
                className="bg-white border rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    #{index + 1} {r.User?.name}
                  </h4>

                  <p className="text-gray-600">Exam: {r.Exam?.title}</p>
                </div>

                <div className="mt-3 sm:mt-0 text-right">
                  <p className="text-green-600 font-semibold">
                    Score: {r.score}
                  </p>

                  <p className="text-gray-500 text-sm">⏱ {r.timeTaken} sec</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
