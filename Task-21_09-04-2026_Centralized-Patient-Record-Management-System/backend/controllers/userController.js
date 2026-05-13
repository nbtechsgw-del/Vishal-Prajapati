import User from "../models/User.js";

import bcrypt from "bcryptjs";

import { Op } from "sequelize";

// GET USERS
export const getUsers = async (req, res) => {
  try {
    const { search, role } = req.query;

    let whereClause = {};

    // SEARCH
    if (search) {
      whereClause[Op.or] = [
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        },

        {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    // ROLE FILTER
    if (role) {
      whereClause.role = role;
    }

    const users = await User.findAll({
      where: whereClause,

      attributes: {
        exclude: ["password"],
      },

      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // CHECK USER
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,

      email,

      password: hashedPassword,

      role,
    });

    res.status(201).json({
      message: "User created",

      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;

    user.email = req.body.email || user.email;

    user.role = req.body.role || user.role;

    user.status = req.body.status || user.status;

    await user.save();

    res.status(200).json({
      message: "User updated",

      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.destroy();

    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
