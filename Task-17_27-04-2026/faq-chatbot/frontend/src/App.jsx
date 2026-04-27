import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const chatEndRef = useRef(null);

  const suggestions = [
    "Hi",
    "Hello",
    "What is your name?",
    "Who are you?",
    "Can you help me?",
    "How does this work?",
    "I need help",
    "What can you do?",
    "Are you a real person?",
    "Tell me a joke",
    "Help me with coding",
    "What is JavaScript?",
    "How to learn programming?",
    "I am stuck",
    "Bye",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const messageToSend = input;

    setMessages((prev) => [...prev, { type: "user", text: messageToSend }]);

    setInput("");
    setShowSuggestions(false);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: messageToSend,
      });

      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", text: res.data.reply }]);
        setLoading(false);
      }, 2000);
    } catch (error) {
      (setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "Server error. Try again." },
        ]);
        setLoading(false);
      }, 2000),
        error);
    }
  };

  return (
    <div className="h-screen bg-linear-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="relative w-105 h-150 bg-gray-800 rounded-2xl flex flex-col shadow-2xl border border-gray-700 overflow-hidden">
        <div className="p-4 bg-gray-900 text-white text-lg font-bold border-b border-gray-700">
          FAQ Chatbot
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3 scroll-smooth">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow-md ${
                  msg.type === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-700 text-white rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-white px-4 py-2 rounded-2xl text-sm animate-pulse">
                Bot is typing...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {showSuggestions && (
          <div className="absolute bottom-20 left-3 right-3 bg-gray-900 border border-gray-700 rounded-xl p-2 shadow-lg z-10">
            {suggestions.map((item, index) => (
              <div
                key={index}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setInput(item);
                  setShowSuggestions(false);
                }}
                className="text-sm text-gray-300 hover:bg-gray-700 p-2 rounded cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        )}

        <div className="p-3 flex gap-2 bg-gray-900 border-t border-gray-700">
          <input
            className="flex-1 p-3 rounded-xl bg-gray-800 text-white outline-none"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 px-5 py-2 rounded-xl text-white hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
