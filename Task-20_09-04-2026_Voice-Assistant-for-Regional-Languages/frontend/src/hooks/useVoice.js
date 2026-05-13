import { useState } from "react";

import recognition from "../utils/speechToText";

import speak from "../utils/textToSpeech";

import { sendMessage } from "../services/assistantService";

import { performAction } from "../utils/commandActions";

function useVoice() {
  const [isListening, setIsListening] = useState(false);

  const [transcript, setTranscript] = useState("");

  const [assistantReply, setAssistantReply] = useState("");

  const startListening = () => {
    setIsListening(true);

    recognition.start();

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;

      setTranscript(text);

      setIsListening(false);

      const data = await sendMessage(text);

      setAssistantReply(data.reply);

      speak(data.reply);

      if (data.action) {
        performAction(data.action, text);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  };

  return {
    transcript,
    assistantReply,
    isListening,
    startListening,
  };
}

export default useVoice;
