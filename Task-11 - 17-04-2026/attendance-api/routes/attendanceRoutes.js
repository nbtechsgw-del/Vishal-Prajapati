const express = require("express");
const router = express.Router();

const attendanceController = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/checkin", authMiddleware, attendanceController.checkIn);
router.post("/checkout", authMiddleware, attendanceController.checkOut);

module.exports = router;
