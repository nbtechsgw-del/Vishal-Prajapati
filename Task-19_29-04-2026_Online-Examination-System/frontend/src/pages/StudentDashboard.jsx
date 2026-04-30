import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ExamCard from "../components/ExamCard";
import Navbar from "../components/Navbar";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchExams = async () => {
    try {
      const res = await API.get("/exams/published");
      setExams(res.data);
    } catch (err) {
      setError("Failed to load exams");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50">
      <Navbar title="Student Dashboard 🎓" />

      <div className="p-6">
        {loading && (
          <div className="text-center text-gray-500">Loading exams...</div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        {!loading && exams.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No exams available 📭
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onStart={() => navigate(`/exam/${exam.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
