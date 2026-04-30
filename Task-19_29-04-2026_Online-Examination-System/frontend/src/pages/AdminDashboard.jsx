import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [examRes, resultRes] = await Promise.all([
        API.get("/exams"),
        API.get("/results"),
      ]);

      setExams(examRes.data);
      setResults(resultRes.data);
      console.log(resultRes.data);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTogglePublish = async (exam) => {
    const action = exam.isPublished ? "unpublish" : "publish";

    if (!window.confirm(`Are you sure you want to ${action} this exam?`))
      return;

    try {
      await API.put(`/exams/toggle-publish/${exam.id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50">
      <Navbar title="Admin Dashboard 🧑‍💼" />

      <div className="p-6 max-w-6xl mx-auto space-y-10">
        <div className="flex flex-wrap gap-3 justify-end">
          <button
            onClick={() => navigate("/admin/create-exam")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md"
          >
            + Create Exam
          </button>

          <button
            onClick={() => navigate("/admin/add-question")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
          >
            ❓ Add Question
          </button>

          <button
            onClick={() => navigate("/admin/assign-questions")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
          >
            🧠 Assign Questions
          </button>
        </div>

        {loading && <div className="text-center text-gray-500">Loading...</div>}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded text-center">
            {error}
          </div>
        )}

        {!loading && (
          <div>
            <h3 className="text-xl font-semibold mb-4">📚 Exams</h3>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md"
                >
                  <h4 className="text-lg font-semibold">{exam.title}</h4>

                  <p className="text-gray-600 mt-2">⏱ {exam.timeLimit} min</p>

                  <p className="mt-1">
                    Status:{" "}
                    <span
                      className={
                        exam.isPublished ? "text-green-600" : "text-yellow-600"
                      }
                    >
                      {exam.isPublished ? "Published" : "Draft"}
                    </span>
                  </p>

                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => navigate("/admin/assign-questions")}
                      className="w-full bg-blue-600 text-white py-2 rounded"
                    >
                      + Add Questions
                    </button>

                    <button
                      onClick={() => handleTogglePublish(exam)}
                      className={`w-full py-2 rounded font-medium ${
                        exam.isPublished
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {exam.isPublished ? "Unpublish Exam" : "Publish Exam"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && (
          <div>
            <h3 className="text-xl font-semibold mb-4">🏆 Leaderboard</h3>

            <div className="space-y-4">
              {results.map((r, index) => (
                <div
                  key={r.id}
                  className="bg-white border rounded-2xl shadow-sm p-4 flex justify-between"
                >
                  <div>
                    <h4 className="font-semibold">
                      #{index + 1} {r.User?.name}
                    </h4>
                    <p className="text-gray-600">{r.Exam?.title}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-green-600 font-semibold">{r.score}</p>
                    <p className="text-gray-500 text-sm">⏱ {r.timeTaken}s</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
