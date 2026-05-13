import { detectIntent } from "../utils/intentHelper.js";

import { executeCommand } from "../services/commandService.js";

import { generateAIResponse } from "../services/aiService.js";

export const handleAssistant = async (req, res) => {
  const { message } = req.body;

  const intent = detectIntent(message);

  if (
    intent === "youtube" ||
    intent === "facebook" ||
    intent === "google" ||
    intent === "weather" ||
    intent === "time" ||
    intent === "website"
  ) {
    const result = executeCommand(intent, message);

    return res.json({
      success: true,
      ...result,
    });
  }

  const aiReply = await generateAIResponse(message);

  res.json({
    success: true,
    reply: aiReply,
  });
};
