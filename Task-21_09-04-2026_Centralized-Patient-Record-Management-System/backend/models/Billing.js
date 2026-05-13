import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

import Patient from "./Patient.js";

const Billing = sequelize.define("Billing", {
  billId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  treatment: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  paymentStatus: {
    type: DataTypes.ENUM("Pending", "Paid", "Cancelled"),
    defaultValue: "Pending",
  },

  paymentMethod: {
    type: DataTypes.STRING,
  },

  billingDate: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
});

// RELATIONS

Patient.hasMany(Billing);

Billing.belongsTo(Patient);

export default Billing;
