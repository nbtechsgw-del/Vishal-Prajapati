function MicButton({ startListening, isListening }) {
  return (
    <button
      onClick={startListening}
      className={`
        w-16 h-16 sm:w-20 sm:h-20
        rounded-full
        text-2xl sm:text-3xl
        shadow-lg
        transition-all duration-300
        flex items-center justify-center
        active:scale-95
        ${
          isListening
            ? "bg-red-500 animate-pulse"
            : "bg-cyan-500 hover:bg-cyan-400"
        }
      `}
    >
      🎤
    </button>
  );
}

export default MicButton;
