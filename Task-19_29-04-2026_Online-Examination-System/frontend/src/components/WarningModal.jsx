const WarningModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white w-[90%] max-w-sm rounded-2xl shadow-2xl p-6 text-center animate-fadeIn">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-full">⚠️</div>
        </div>

        <h2 className="text-xl font-bold text-red-600">Warning Alert</h2>

        <p className="text-gray-600 mt-3 text-sm leading-relaxed">{message}</p>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-semibold transition"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
