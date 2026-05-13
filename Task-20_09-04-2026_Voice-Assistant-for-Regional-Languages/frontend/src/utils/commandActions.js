export const performAction = (action, text) => {
  if (action === "youtube") {
    window.location.href = "https://www.youtube.com";
  } else if (action === "google") {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
  } else if (action === "website") {
    window.location.href = "https://www.google.com";
  }
};
