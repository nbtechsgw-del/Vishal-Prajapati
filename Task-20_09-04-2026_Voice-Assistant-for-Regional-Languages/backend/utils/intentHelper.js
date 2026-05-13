export const detectIntent = (message) => {
  const text = message.toLowerCase();

  if (text.includes("weather")) {
    return "weather";
  }

  if (text.includes("youtube") || text.includes("play video")) {
    return "youtube";
  }

  if (text.includes("google") || text.includes("search")) {
    return "google";
  }

  if (text.includes("time")) {
    return "time";
  }

  if (text.includes("open")) {
    return "website";
  }

  return "general";
};
