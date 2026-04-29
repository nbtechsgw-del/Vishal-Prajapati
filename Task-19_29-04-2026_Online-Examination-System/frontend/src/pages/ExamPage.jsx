import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const ExamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [warnings, setWarnings] = useState(0);

  const fetchExam = async () => {
    try {
      const res = await API.get(`/exams/${id}`);
      setExam(res.data);
      setTimeLeft(res.data.timeLimit * 60);

      document.documentElement.requestFullscreen();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExam();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setWarnings((prev) => prev + 1);

        alert("⚠️ Warning: Do not switch tabs!");

        if (warnings >= 1) {
          alert("❌ Exam auto-submitted due to cheating!");
          handleSubmit();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [warnings]);

  const handleChange = (questionId, selected) => {
    setAnswers({
      ...answers,
      [questionId]: selected,
    });
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = Object.keys(answers).map((qid) => ({
        questionId: parseInt(qid),
        selected: answers[qid],
      }));

      const res = await API.post("/results/submit", {
        examId: id,
        answers: formattedAnswers,
        timeTaken: exam.timeLimit * 60 - timeLeft,
      });

      alert(`Exam submitted! Score: ${res.data.score}`);
      navigate("/student");
    } catch (err) {
      console.log(err);
    }
  };

  if (!exam)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading exam...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">{exam.title}</h2>

        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold">
          ⏱ {timeLeft} sec
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {exam.Questions?.map((q, index) => (
          <div
            key={q.id}
            className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
          >
            <h4 className="font-semibold text-gray-800 mb-4">
              {index + 1}. {q.question}
            </h4>

            <div className="space-y-2">
              {["A", "B", "C", "D"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    onChange={() => handleChange(q.id, opt)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-700">{q[`option${opt}`]}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-lg transition"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
};

export default ExamPage;
