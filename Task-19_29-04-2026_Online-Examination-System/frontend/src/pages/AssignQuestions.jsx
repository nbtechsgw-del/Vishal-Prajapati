import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AssignQuestions = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [message, setMessage] = useState("");

  const fetchExams = async () => {
    try {
      const res = await API.get("/exams");
      setExams(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await API.get("/questions");
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExams();
    fetchQuestions();
  }, []);

  const handleSelect = (id) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const handleAssign = async () => {
    try {
      await API.post("/exams/assign", {
        examId: selectedExam,
        questionIds: selectedQuestions,
      });

      setMessage("Questions assigned successfully!");

      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (err) {
      setMessage("Failed to assign questions", err);
    }
  };

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

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border p-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Assign Questions to Exam 🧠
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-6">
          Build your exam by selecting questions
        </p>

        {message && (
          <div className="text-center mb-4 text-sm font-medium text-green-600">
            {message}
          </div>
        )}

        <div className="mb-6">
          <label className="text-sm text-gray-600">Select Exam</label>
          <select
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">-- Choose Exam --</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Available Questions
          </h3>

          <div className="grid gap-3 max-h-100 overflow-y-auto pr-2">
            {questions.map((q) => (
              <label
                key={q.id}
                className="flex items-start gap-3 p-3 border rounded-xl hover:bg-gray-50 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  onChange={() => handleSelect(q.id)}
                  className="mt-1 accent-blue-600"
                />

                <div>
                  <p className="text-gray-800 font-medium">{q.question}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAssign}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Assign Questions
          </button>

          <button
            onClick={() => navigate("/admin")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignQuestions;
