const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fromDate, toDate, reason } = req.body;

    const leave = await Leave.create({
      userId,
      fromDate,
      toDate,
      reason,
    });

    res.status(201).json({
      message: "Leave applied successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.myLeaves = async (req, res) => {
  try {
    const userId = req.user.id;

    const leaves = await Leave.findAll({ where: { userId } });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.allLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll();

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = "approved";
    await leave.save();

    res.json({ message: "Leave approved", leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = "rejected";
    await leave.save();

    res.json({ message: "Leave rejected", leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterLeaves = async (req, res) => {
  try {
    const { status } = req.query;

    const leaves = await Leave.findAll({
      where: status ? { status } : {},
    });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};