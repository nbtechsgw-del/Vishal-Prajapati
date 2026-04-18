const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    msg.style.color = "red";
    msg.textContent = "Please fill all fields";
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!email.match(emailPattern)) {
    msg.style.color = "red";
    msg.textContent = "Enter valid email";
    return;
  }

  msg.style.color = "lightgreen";
  msg.textContent = "Message sent successfully!";

  form.reset();
});