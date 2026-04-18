const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const users = await User.findAll({
      offset: (page - 1) * limit,
      limit: limit,
    });

    res.json({
      page,
      limit,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
