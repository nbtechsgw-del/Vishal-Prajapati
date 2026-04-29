import User from "./User.js";
import Question from "./Question.js";
import Exam from "./Exam.js";
import Result from "./Result.js";
import ExamQuestion from "./ExamQuestion.js";

User.hasMany(Result, { foreignKey: "userId" });
Result.belongsTo(User, { foreignKey: "userId" });

Exam.hasMany(Result, { foreignKey: "examId" });
Result.belongsTo(Exam, { foreignKey: "examId" });

Exam.belongsToMany(Question, {
  through: ExamQuestion,
  foreignKey: "examId",
});

Question.belongsToMany(Exam, {
  through: ExamQuestion,
  foreignKey: "questionId",
});

export { User, Question, Exam, Result, ExamQuestion };