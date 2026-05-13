import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

import Patient from "./Patient.js";

import User from "./User.js";

const MedicalRecord = sequelize.define("MedicalRecord", {
  recordId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  prescription: {
    type: DataTypes.TEXT,
  },

  doctorNotes: {
    type: DataTypes.TEXT,
  },

  labReport: {
    type: DataTypes.STRING,
  },

  visitDate: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
});

// RELATIONS

Patient.hasMany(MedicalRecord);

MedicalRecord.belongsTo(Patient);

User.hasMany(MedicalRecord, {
  foreignKey: "doctorId",
});

MedicalRecord.belongsTo(User, {
  foreignKey: "doctorId",
});

export default MedicalRecord;
