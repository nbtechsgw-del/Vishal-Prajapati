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

router.post("/", protect, authorizeRoles("admin", "receptionist"), createBill);
router.get("/", protect, getBills);
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "receptionist"),
  updatePaymentStatus,
);
router.delete("/:id", protect, authorizeRoles("admin"), deleteBill);
router.get("/revenue/total", protect, getRevenue);

export default router;
