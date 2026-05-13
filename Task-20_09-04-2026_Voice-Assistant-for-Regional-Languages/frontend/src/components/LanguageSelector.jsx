function LanguageSelector() {
  return (
    <div className="w-full flex justify-center">
      <select
        className="
          w-full sm:w-auto
          max-w-xs
          bg-slate-800
          text-white
          px-4 py-2.5
          rounded-lg
          border border-slate-600
          outline-none
          text-sm sm:text-base
          focus:border-cyan-500
        "
      >
        <option>English</option>
        <option>Hindi</option>
        <option>Gujarati</option>
        <option>Marathi</option>
      </select>
    </div>
  );
}

export default LanguageSelector;

