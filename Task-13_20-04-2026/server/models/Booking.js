import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Booking = sequelize.define("Booking", {
  date: DataTypes.DATE,
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

export default Booking;
