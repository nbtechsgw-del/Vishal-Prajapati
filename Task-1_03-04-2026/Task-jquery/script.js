const box = document.querySelector(".box");

function flipLeft() {
  box.style.transform = "rotateY(-180deg)";
  box.textContent = "Flipped Left";
}

function flipRight() {
  box.style.transform = "rotateY(180deg)";
  box.textContent = "Flipped Right";
}

function flipUp() {
  box.style.transform = "rotateX(180deg)";
  box.textContent = "Flipped Up";
}

function flipDown() {
  box.style.transform = "rotateX(-180deg)";
  box.textContent = "Flipped Down";
}

function resetFlip() {
  box.style.transform = "rotate(0deg)";
  box.textContent = "Flip Me!";
}
