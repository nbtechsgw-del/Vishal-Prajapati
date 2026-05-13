function ChatMessage({ message, sender }) {
  return (
    <div
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[85%] sm:max-w-[70%]
          p-3 sm:p-4
          rounded-2xl
          mb-4
          text-sm sm:text-base
          wrap-break-word
          ${
            sender === "user"
              ? "bg-cyan-500 ml-auto text-white rounded-br-sm"
              : "bg-slate-700 text-white rounded-bl-sm"
          }
        `}
      >
        {message}
      </div>
    </div>
  );
}

export default ChatMessage;
