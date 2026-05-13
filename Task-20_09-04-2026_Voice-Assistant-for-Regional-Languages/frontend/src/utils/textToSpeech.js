function speak(text, language = "en-US") {
  const speech = new SpeechSynthesisUtterance();

  speech.text = text;
  speech.lang = language;

  speech.volume = 1;
  speech.rate = 0.9;
  speech.pitch = 1.2;

  window.speechSynthesis.speak(speech);
}

export default speak;