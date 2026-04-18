const User = require("../models/User");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");

exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalEmployees = await User.count({
      where: { role: "employee" },
    });

    const today = new Date().toISOString().split("T")[0];

    const todayAttendance = await Attendance.count({
      where: { date: today },
    });

    const pendingLeaves = await Leave.count({
      where: { status: "pending" },
    });

    res.json({
      totalUsers,
      totalEmployees,
      todayAttendance,
      pendingLeaves,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
