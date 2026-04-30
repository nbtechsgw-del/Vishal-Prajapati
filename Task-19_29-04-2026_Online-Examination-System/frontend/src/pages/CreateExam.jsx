import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreateExam = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    timeLimit: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/exams", form);

      setSuccess("Exam created successfully!");
      setError("");

      const examId = res.data.exam.id;

      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create exam");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Exam 📝
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-6">
          Set up a new exam for students
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-3 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 text-sm p-2 rounded mb-3 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Exam Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter exam title"
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              name="timeLimit"
              placeholder="e.g. 30"
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Create Exam
          </button>
        </form>

        <button
          onClick={() => navigate("/admin")}
          className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CreateExam;
