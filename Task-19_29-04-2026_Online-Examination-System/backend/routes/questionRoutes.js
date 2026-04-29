import express from "express";
import {
  addQuestion,
  getQuestions,
} from "../controllers/questionController.js";
import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/role.js";

const router = express.Router();

router.post("/", protect, isAdmin, addQuestion);
router.get("/", protect, getQuestions);

export default router;
