const express = require("express");
const cors = require("cors");
const fs = require("fs");
const Fuse = require("fuse.js");

const app = express();

app.use(cors());
app.use(express.json());

const faqData = JSON.parse(fs.readFileSync("./faq.json", "utf-8"));

const fuse = new Fuse(faqData, {
  keys: ["question"],
  threshold: 0.4,
});

function getAnswer(userQuestion) {
  const result = fuse.search(userQuestion);

  if (result.length > 0) {
    return result[0].item.answer;
  }

  return "I couldn't fully understand that. Try rephrasing or contact support for help.";
}

app.get("/", (req, res) => {
  res.send("FAQ Chatbot Backend is Running");
});

app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.json({ reply: "Please ask a question." });
  }

  const reply = getAnswer(userMessage);

  res.json({ reply });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
