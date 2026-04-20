const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {
  date: DataTypes.DATE,
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

module.exports = Booking;
