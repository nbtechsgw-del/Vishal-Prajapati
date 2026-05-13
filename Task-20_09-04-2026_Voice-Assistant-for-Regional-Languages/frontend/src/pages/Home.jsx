import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import MicButton from "../components/MicButton";
import VoiceWave from "../components/VoiceWave";
import LanguageSelector from "../components/LanguageSelector";

import useVoice from "../hooks/useVoice";

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  const { transcript, assistantReply, isListening, startListening } =
    useVoice();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      <div className="relative">
        <Navbar />

        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="
            md:hidden
            absolute right-4 top-1/2 -translate-y-1/2
            z-50
            w-10 h-10
            flex items-center justify-center
            rounded-lg
            bg-slate-800
            border border-slate-700
            text-xl
            hover:bg-slate-700
            transition
          "
        >
          ☰
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div
          className={`
            fixed md:static
            top-0 left-0
            z-40
            h-screen
            transition-transform duration-300
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <Sidebar />
        </div>

        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <ChatBox transcript={transcript} assistantReply={assistantReply} />
          </div>

          <div
            className="
              border-t border-slate-700
              p-4 sm:p-6
              flex flex-col items-center
              gap-4
              bg-slate-950
            "
          >
            <VoiceWave />

            <MicButton
              startListening={startListening}
              isListening={isListening}
            />

            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
