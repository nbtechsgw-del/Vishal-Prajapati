const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const { connectDB, sequelize } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB().then(async () => {
  await sequelize.sync();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
