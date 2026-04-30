const QuestionCard = ({ question, index, onSelect, selectedAnswer }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
      <h4 className="font-semibold text-gray-800 mb-4">
        {index + 1}. {question.question}
      </h4>

      <div className="space-y-2">
        {["A", "B", "C", "D"].map((opt) => {
          const isSelected = selectedAnswer === opt;

          return (
            <label
              key={opt}
              className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition
                ${
                  isSelected
                    ? "bg-blue-100 border-blue-400"
                    : "hover:bg-gray-50"
                }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={opt}
                checked={isSelected}
                onChange={() => onSelect(question.id, opt)}
                className="accent-blue-600"
              />

              <span className="text-gray-700">{question[`option${opt}`]}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
