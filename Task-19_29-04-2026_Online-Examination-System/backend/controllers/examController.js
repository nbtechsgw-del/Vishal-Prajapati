import { Exam, Question, ExamQuestion } from "../models/index.js";

export const createExam = async (req, res) => {
  try {
    const { title, timeLimit } = req.body;

    if (!title || timeLimit === 0) {
      return res.status(400).json({ message: "Title and time limit required" });
    }

    const exam = await Exam.create({
      title,
      timeLimit,
    });

    res.status(201).json({
      message: "Exam created successfully",
      exam,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignQuestions = async (req, res) => {
  try {
    const { examId, questionIds } = req.body;

    if (!examId || !questionIds || questionIds.length === 0) {
      return res
        .status(400)
        .json({ message: "ExamId and questionIds required" });
    }

    const exam = await Exam.findByPk(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const mappings = questionIds.map((qid) => ({
      examId,
      questionId: qid,
    }));

    await ExamQuestion.bulkCreate(mappings);

    res.json({
      message: "Questions assigned successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const publishExam = async (req, res) => {
  try {
    const { examId } = req.body;

    const exam = await Exam.findByPk(examId);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    exam.isPublished = true;
    await exam.save();

    res.json({
      message: "Exam published successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.findAll({
      include: ["Questions"],
      order: [["createdAt", "DESC"]],
    });

    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPublishedExams = async (req, res) => {
  try {
    const exams = await Exam.findAll({
      where: { isPublished: true }, // 🔥 FIX
      include: ["Questions"],
      order: [["createdAt", "DESC"]],
    });

    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const togglePublishExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findByPk(id, {
      include: ["Questions"],
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    if (!exam.isPublished && (!exam.Questions || exam.Questions.length === 0)) {
      return res
        .status(400)
        .json({ message: "Add questions before publishing" });
    }

    exam.isPublished = !exam.isPublished;

    await exam.save();

    res.json({
      message: exam.isPublished ? "Exam published" : "Exam unpublished",
      isPublished: exam.isPublished,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getExamQuestions = async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findByPk(examId, {
      include: {
        model: Question,
        attributes: { exclude: ["correctAnswer"] },
      },
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
