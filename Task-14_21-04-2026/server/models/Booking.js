import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Booking = sequelize.define("Booking", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  propertyId: {
    type: DataTypes.INTEGER,
  },
});

export default Booking;
