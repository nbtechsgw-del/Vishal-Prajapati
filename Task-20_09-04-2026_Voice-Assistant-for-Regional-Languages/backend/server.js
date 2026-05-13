import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import assistantRoutes from "./routes/assistantRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/assistant", assistantRoutes);

app.get("/", (req, res) => {
  res.send("Voice Assistant Server Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
