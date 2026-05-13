import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

import Patient from "./Patient.js";

import User from "./User.js";

const Appointment = sequelize.define("Appointment", {
  appointmentId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  appointmentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  appointmentTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  reason: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.ENUM("Pending", "Confirmed", "Completed", "Cancelled"),
    defaultValue: "Pending",
  },
});

// RELATIONS

Patient.hasMany(Appointment);

Appointment.belongsTo(Patient);

User.hasMany(Appointment, {
  foreignKey: "doctorId",
});

Appointment.belongsTo(User, {
  foreignKey: "doctorId",
});

export default Appointment;
