const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Leave = sequelize.define("Leave", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  fromDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  toDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  },
});

module.exports = Leave;
