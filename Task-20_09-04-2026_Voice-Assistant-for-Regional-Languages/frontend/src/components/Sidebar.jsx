function Sidebar() {
  return (
    <div
      className="
        w-64
        h-full
        bg-slate-900
        border-r border-slate-700
        p-4
        overflow-y-auto
      "
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-6 text-white">
        Features
      </h2>

      <ul className="space-y-4 text-slate-300">
        <li className="text-base sm:text-lg flex items-center gap-3">
          🎤 <span>Voice Commands</span>
        </li>

        <li className="text-base sm:text-lg flex items-center gap-3">
          🌍 <span>Multi Language</span>
        </li>

        <li className="text-base sm:text-lg flex items-center gap-3">
          🤖 <span>AI Assistant</span>
        </li>

        <li className="text-base sm:text-lg flex items-center gap-3">
          🌦 <span>Weather</span>
        </li>

        <li className="text-base sm:text-lg flex items-center gap-3">
          ▶️ <span>YouTube Search</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
