import { Result, Question, Exam, User } from "../models/index.js";

export const submitExam = async (req, res) => {
  try {
    const userId = req.user.id;
    const { examId, answers, timeTaken } = req.body;

    if (!examId || !answers || answers.length === 0) {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    const questionIds = answers.map((a) => a.questionId);

    const questions = await Question.findAll({
      where: { id: questionIds },
    });

    let score = 0;

    questions.forEach((q) => {
      const userAnswer = answers.find((a) => a.questionId === q.id);

      if (userAnswer && userAnswer.selected === q.correctAnswer) {
        score++;
      }
    });

    const result = await Result.create({
      userId,
      examId,
      score,
      timeTaken,
    });

    res.json({
      message: "Exam submitted successfully",
      score,
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyResults = async (req, res) => {
  try {
    const userId = req.user.id;

    const results = await Result.findAll({
      where: { userId },
      include: {
        model: Exam,
        attributes: ["title"],
      },
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllResults = async (req, res) => {
  try {
    const results = await Result.findAll({
      include: [
        {
          model: Exam,
          attributes: ["title"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
      order: [
        ["score", "DESC"],
        ["timeTaken", "ASC"],
      ],
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
