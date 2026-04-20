import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import { User, Booking, Property } from "./models/index.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

sequelize
  .authenticate()
  .then(() => console.log("MYSQL Connected"))
  .catch((err) => console.log("DB Error :", err));

sequelize.sync().then(() => {
  console.log("Tables synced");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
