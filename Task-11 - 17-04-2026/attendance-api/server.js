const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
