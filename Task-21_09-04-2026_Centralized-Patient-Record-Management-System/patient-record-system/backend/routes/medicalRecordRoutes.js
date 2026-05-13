import express from "express";

import {
  addMedicalRecord,
  getMedicalRecords,
  getPatientHistory,
  updateMedicalRecord,
  deleteMedicalRecord,
} from "../controllers/medicalRecordController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ADD RECORD
router.post(
  "/",
  protect,
  authorizeRoles("doctor", "admin"),
  upload.single("labReport"),
  addMedicalRecord,
);

// GET ALL RECORDS
router.get("/", protect, getMedicalRecords);

// GET PATIENT HISTORY
router.get("/patient/:patientId", protect, getPatientHistory);

// UPDATE RECORD
router.put(
  "/:id",
  protect,
  authorizeRoles("doctor", "admin"),
  updateMedicalRecord,
);

// DELETE RECORD
router.delete("/:id", protect, authorizeRoles("admin"), deleteMedicalRecord);

export default router;
