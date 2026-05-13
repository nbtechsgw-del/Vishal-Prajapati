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

router.post(
  "/",
  protect,
  authorizeRoles("doctor", "admin"),
  upload.single("labReport"),
  addMedicalRecord,
);
router.get("/", protect, getMedicalRecords);
router.get("/patient/:patientId", protect, getPatientHistory);
router.put(
  "/:id",
  protect,
  authorizeRoles("doctor", "admin"),
  updateMedicalRecord,
);
router.delete("/:id", protect, authorizeRoles("admin"), deleteMedicalRecord);

export default router;
