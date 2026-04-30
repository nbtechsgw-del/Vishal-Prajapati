import { useEffect, useRef, useState } from "react";

const Timer = ({ seconds, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const isDanger = timeLeft <= 30;

  return (
    <div
      className={`px-4 py-2 rounded-lg font-semibold ${
        isDanger
          ? "bg-red-600 text-white animate-pulse"
          : "bg-red-100 text-red-600"
      }`}
    >
      ⏱ {minutes}:{secs.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
