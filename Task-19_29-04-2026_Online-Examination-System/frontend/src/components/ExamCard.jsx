const ExamCard = ({ exam, onStart }) => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800">{exam.title}</h3>

      <p className="text-gray-500 mt-2">⏱ Time: {exam.timeLimit} min</p>

      <button
        onClick={onStart}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
      >
        Start Exam
      </button>
    </div>
  );
};

export default ExamCard;
