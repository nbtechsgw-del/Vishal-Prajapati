document.getElementById("togglePass").addEventListener("change", function () {
  const t = this.checked ? "text" : "password";
  document.getElementById("password").type = t;
  document.getElementById("cpassword").type = t;
});

document.getElementById("regForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const pw = document.getElementById("password").value;
  const cpw = document.getElementById("cpassword").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const skills = document.querySelectorAll('input[name="skills"]:checked');
  document.getElementById("errorcpass").textContent = "";
  document.getElementById("genderError").textContent = "";
  document.getElementById("skillError").textContent = "";
  const sm = document.getElementById("successMsg");
  sm.style.display = "none";
  let ok = true;
  if (pw !== cpw) {
    document.getElementById("errorcpass").textContent =
      "Passwords do not match";
    ok = false;
  }
  if (!gender) {
    document.getElementById("genderError").textContent =
      "Please select a gender";
    ok = false;
  }
  if (skills.length === 0) {
    document.getElementById("skillError").textContent =
      "Select at least one skill";
    ok = false;
  }
  if (ok) {
    sm.style.display = "block";
    this.reset();
  }
});

document.querySelectorAll(".radio-item input").forEach((r) => {
  r.addEventListener("change", function () {
    document
      .querySelectorAll(".radio-item")
      .forEach((i) => (i.style.borderColor = ""));
    if (this.checked) {
      this.closest(".radio-item").style.borderColor = "#667eea";
      this.closest(".radio-item").style.background = "#eef2ff";
    }
  });
});
document.querySelectorAll(".check-item input").forEach((c) => {
  c.addEventListener("change", function () {
    this.closest(".check-item").style.borderColor = this.checked
      ? "#667eea"
      : "";
    this.closest(".check-item").style.background = this.checked
      ? "#eef2ff"
      : "";
  });
});
