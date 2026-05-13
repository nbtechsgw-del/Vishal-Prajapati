import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Patient = sequelize.define("Patient", {
  patientId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  gender: {
    type: DataTypes.ENUM("Male", "Female", "Other"),
    allowNull: false,
  },

  bloodGroup: {
    type: DataTypes.STRING,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.TEXT,
  },

  emergencyContact: {
    type: DataTypes.STRING,
  },
});

export default Patient;
  