import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import path from "path";

import sequelize from "./config/db.js";

import User from "./models/User.js";
import Patient from "./models/Patient.js";
import Appointment from "./models/Appointment.js";
import MedicalRecord from "./models/MedicalRecord.js";
import Billing from "./models/Billing.js";

import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import medicalRecordRoutes from "./routes/medicalRecordRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(async () => {
    console.log("MySQL Connected");

    await sequelize.sync();

    console.log("Database Synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
