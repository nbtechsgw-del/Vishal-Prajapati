import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

import Patient from "./Patient.js";

const Notification = sequelize.define("Notification", {
  notificationId: {
    type: DataTypes.STRING,
    unique: true,
  },

  type: {
    type: DataTypes.ENUM("Appointment", "Billing", "Reminder"),
  },

  message: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.ENUM("Sent", "Failed"),
    defaultValue: "Sent",
  },

  sentAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// RELATIONS

Patient.hasMany(Notification);

Notification.belongsTo(Patient);

export default Notification;
