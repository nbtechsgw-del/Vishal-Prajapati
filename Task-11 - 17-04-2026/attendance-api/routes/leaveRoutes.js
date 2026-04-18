const express = require("express");
const router = express.Router();

const leaveController = require("../controllers/leaveController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/apply", authMiddleware, leaveController.applyLeave);
router.get("/my", authMiddleware, leaveController.myLeaves);

router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["admin"]),
  leaveController.allLeaves,
);

router.put(
  "/approve/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  leaveController.approveLeave,
);

router.put(
  "/reject/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  leaveController.rejectLeave,
);

module.exports = router;
