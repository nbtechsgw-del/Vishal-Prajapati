import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import WarningModal from "../components/WarningModal";

const ExamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [warnings, setWarnings] = useState(0);

  const [showWarning, setShowWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  console.log(warnings);

  const fetchExam = async () => {
    try {
      const res = await API.get(`/exams/${id}`);
      setExam(res.data);

      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExam();
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setWarnings((prev) => {
          const newWarnings = prev + 1;

          setWarningMsg("Do not switch tabs during exam!");
          setShowWarning(true);

          if (newWarnings >= 2) {
            setWarningMsg("Exam auto-submitted due to cheating!");
            handleSubmit();
          }

          return newWarnings;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const handleChange = (questionId, selected) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selected,
    }));
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
        timeTaken: 0,
      });

      if (document.fullscreenElement) {
        document.exitFullscreen();
      }

      setWarningMsg(`Exam submitted! Score: ${res.data.score}`);
      setShowWarning(true);

      setTimeout(() => {
        navigate("/student");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  if (!exam) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading exam...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">{exam.title}</h2>

        <Timer seconds={exam.timeLimit * 60} onTimeUp={handleSubmit} />
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {exam.Questions?.map((q, index) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={index}
            onSelect={handleChange}
            selectedAnswer={answers[q.id]}
          />
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-lg transition"
        >
          Submit Exam
        </button>
      </div>

      {showWarning && (
        <WarningModal
          message={warningMsg}
          onClose={() => setShowWarning(false)}
        />
      )}
    </div>
  );
};

export default ExamPage;
