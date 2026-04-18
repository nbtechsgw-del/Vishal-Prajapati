const aboutBtn = document.getElementById("aboutBtn");
const moreText = document.getElementById("moreText");

aboutBtn.addEventListener("click", () => {
  moreText.classList.toggle("hidden");
});

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const pattern = /^\S+@\S+\.\S+$/;

  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  if (!pattern.test(email)) {
    alert("Invalid email");
    return;
  }

  alert("Message sent successfully!");
  form.reset();
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    menuToggle.textContent = "✖";
  } else {
    menuToggle.textContent = "☰";
  }
});
