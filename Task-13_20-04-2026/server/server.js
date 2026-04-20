const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const { User, Booking, Property } = require("./models/index");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

sequelize
  .authenticate()
  .then(() => console.log("MYSQL Connected"))
  .catch((err) => console.log("DB Error :", err));

sequelize.sync({ alter: true }).then(() => {
  console.log("Tables synced");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
