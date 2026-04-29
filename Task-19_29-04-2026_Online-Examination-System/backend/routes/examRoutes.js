import express from "express";
import {
  createExam,
  assignQuestions,
  publishExam,
  getPublishedExams,
  getExamQuestions,
} from "../controllers/examController.js";

import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/role.js";

const router = express.Router();

router.post("/", protect, isAdmin, createExam);
router.post("/assign", protect, isAdmin, assignQuestions);
router.put("/publish", protect, isAdmin, publishExam);

router.get("/", protect, getPublishedExams);
router.get("/:examId", protect, getExamQuestions);

export default router;
