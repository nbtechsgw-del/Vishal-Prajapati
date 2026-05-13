export const executeCommand = (intent, message) => {
  switch (intent) {
    case "weather":
      return {
        reply: "Today's weather is sunny.",
      };

    case "youtube":
      return {
        reply: "Opening YouTube",
        action: "youtube",
      };

    case "facebook":
      return {
        reply: "Opening Facebook",
        action: "facebook",
      };

    case "google":
      return {
        reply: "Searching on Google",
        action: "google",
      };

    case "time":
      return {
        reply: `Current time is ${new Date().toLocaleTimeString()}`,
      };

    case "website":
      return {
        reply: "Opening website",
        action: "website",
      };

    default:
      return {
        reply: `You said: ${message}`,
      };
  }
};
