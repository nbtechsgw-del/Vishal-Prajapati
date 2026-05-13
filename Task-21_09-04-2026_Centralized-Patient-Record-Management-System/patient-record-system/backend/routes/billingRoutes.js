import express from "express";

import {
  createBill,
  getBills,
  updatePaymentStatus,
  deleteBill,
  getRevenue,
} from "../controllers/billingController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE BILL
router.post("/", protect, authorizeRoles("admin", "receptionist"), createBill);

// GET ALL BILLS
router.get("/", protect, getBills);

// UPDATE PAYMENT STATUS
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "receptionist"),
  updatePaymentStatus,
);

// DELETE BILL
router.delete("/:id", protect, authorizeRoles("admin"), deleteBill);

// GET REVENUE
router.get("/revenue/total", protect, getRevenue);

export default router;
