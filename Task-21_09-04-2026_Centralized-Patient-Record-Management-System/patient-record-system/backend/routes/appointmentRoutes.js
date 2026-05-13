import express from "express";

import {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/appointmentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, bookAppointment);

router.get("/", protect, getAppointments);

router.put("/:id", protect, updateAppointmentStatus);

router.delete("/:id", protect, deleteAppointment);

export default router;
