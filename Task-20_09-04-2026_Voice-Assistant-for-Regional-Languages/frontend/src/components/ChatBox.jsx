import ChatMessage from "./ChatMessage";

function ChatBox({ transcript, assistantReply }) {
  const messages = [];

  if (assistantReply) {
    messages.push({
      sender: "assistant",
      message: assistantReply,
    });
  }

  if (transcript) {
    messages.push({
      sender: "user",
      message: transcript,
    });
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto flex flex-col">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500 text-sm sm:text-base">
            Start speaking to chat with your assistant 🎤
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              message={msg.message}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ChatBox;
