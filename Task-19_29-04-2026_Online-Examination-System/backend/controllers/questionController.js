import { Question } from "../models/index.js";

export const addQuestion = async (req, res) => {
  try {
    const { question, optionA, optionB, optionC, optionD, correctAnswer } =
      req.body;

    if (
      !question ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctAnswer
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validOptions = ["A", "B", "C", "D"];
    if (!validOptions.includes(correctAnswer)) {
      return res.status(400).json({
        message: "Correct answer must be one of A, B, C, D",
      });
    }

    const newQuestion = await Question.create({
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
    });

    res.status(201).json({
      message: "Question added successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
