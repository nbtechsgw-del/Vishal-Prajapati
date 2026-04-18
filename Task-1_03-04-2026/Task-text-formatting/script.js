const textContainer = document.querySelector(".text-container");
const fontSize = document.querySelector("#fontSize");
const fontColor = document.querySelector("#fontColor");
const fontFamily = document.querySelector("#fontFamily");
const editor = document.querySelector("#editor");

fontSize.addEventListener("input", () => {
  editor.style.fontSize = fontSize.value + "px";
});

fontColor.addEventListener("input", (e) => {
  editor.style.color = e.target.value;
});

fontFamily.addEventListener("change", (e) => {
  editor.style.fontFamily = e.target.value;
});