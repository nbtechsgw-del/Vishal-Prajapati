const Attendance = require("../models/Attendance");

exports.checkIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const existing = await Attendance.findOne({
      where: { userId, date: today },
    });

    if (existing) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const attendance = await Attendance.create({
      userId,
      date: today,
      checkIn: new Date(),
    });

    res.status(201).json({
      message: "Check-in successful",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      where: { userId, date: today },
    });

    if (!attendance) {
      return res.status(404).json({ message: "No check-in found" });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ message: "Already checked out" });
    }

    const checkOutTime = new Date();
    const checkInTime = new Date(attendance.checkIn);

    const hours = (checkOutTime - checkInTime) / (1000 * 60 * 60);

    attendance.checkOut = checkOutTime;
    attendance.workingHours = hours;

    await attendance.save();

    res.json({
      message: "Check-out successful",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.monthlyReport = async (req, res) => {
  try {
    const { userId, month } = req.query;

    const records = await Attendance.findAll({
      where: {
        userId,
        date: {
          [require("sequelize").Op.like]: `${month}%`,
        },
      },
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};