function VoiceWave() {
  return (
    <div className="flex gap-1 sm:gap-2 items-end h-8 sm:h-10">
      <div className="w-1.5 sm:w-2 h-3 sm:h-4 bg-cyan-400 rounded animate-pulse"></div>

      <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-cyan-400 rounded animate-pulse delay-75"></div>

      <div className="w-1.5 sm:w-2 h-5 sm:h-6 bg-cyan-400 rounded animate-pulse delay-150"></div>

      <div className="w-1.5 sm:w-2 h-8 sm:h-10 bg-cyan-400 rounded animate-pulse delay-300"></div>
    </div>
  );
}

export default VoiceWave;
