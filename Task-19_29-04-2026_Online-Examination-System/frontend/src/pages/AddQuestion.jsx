import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AddQuestion = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/questions", form);

      setMessage("Question added successfully!");
      setError("");
      setTimeout(() => {
        setMessage("");
      }, 1500);

      setForm({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "A",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add question");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add Question ❓
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-6">
          Create a new MCQ for your exam
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-3 text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-600 text-sm p-2 rounded mb-3 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Question</label>
            <textarea
              name="question"
              placeholder="Enter your question..."
              value={form.question}
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              name="optionA"
              placeholder="Option A"
              value={form.optionA}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              name="optionB"
              placeholder="Option B"
              value={form.optionB}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              name="optionC"
              placeholder="Option C"
              value={form.optionC}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              name="optionD"
              placeholder="Option D"
              value={form.optionD}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Correct Answer</label>
            <select
              name="correctAnswer"
              value={form.correctAnswer}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Add Question
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

export default AddQuestion;
