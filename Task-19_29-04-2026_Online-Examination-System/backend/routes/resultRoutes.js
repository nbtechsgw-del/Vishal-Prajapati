import express from "express";
import {
  submitExam,
  getMyResults,
  getAllResults,
} from "../controllers/resultController.js";

import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/role.js";

const router = express.Router();

router.post("/submit", protect, submitExam);
router.get("/my", protect, getMyResults);
router.get("/", protect, isAdmin, getAllResults);

export default router;
