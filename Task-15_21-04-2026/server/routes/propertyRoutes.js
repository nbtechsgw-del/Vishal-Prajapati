import express from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

import { protect, isAgent } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/my", protect, isAgent, getProperties);
router.get("/:id", getPropertyById);

router.post("/", protect, isAgent, createProperty);
router.put("/:id", protect, isAgent, updateProperty);
router.delete("/:id", protect, isAgent, deleteProperty);

export default router;
