import express from "express";
import {
  createBooking,
  getUserBookings,
  getAgentBookings,
} from "../controllers/bookingController.js";

import { protect, isAgent } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getUserBookings);

router.get("/agent", protect, isAgent, getAgentBookings);

export default router;
