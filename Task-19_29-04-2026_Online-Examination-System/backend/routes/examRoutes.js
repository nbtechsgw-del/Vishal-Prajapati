import express from "express";
import {
  createExam,
  assignQuestions,
  getPublishedExams,
  getExamQuestions,
  togglePublishExam,
  getAllExams,
} from "../controllers/examController.js";

import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/role.js";

const router = express.Router();

router.post("/", protect, isAdmin, createExam);
router.post("/assign", protect, isAdmin, assignQuestions);
router.put("/toggle-publish/:id", protect, isAdmin, togglePublishExam);
router.get("/", protect, isAdmin, getAllExams);

router.get("/published", protect, getPublishedExams);
router.get("/:examId", protect, getExamQuestions);

export default router;
