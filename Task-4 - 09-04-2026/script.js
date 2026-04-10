const form = document.getElementById("myForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let password = document.getElementById("password").value;
  let cpassword = document.getElementById("cpassword").value;
  let gender = document.querySelector('input[name="gender"]:checked');
  let skills = document.querySelectorAll('input[name="skills"]:checked');
  let errorcpass = document.getElementById("errorcpass")

  document.getElementById("genderError").innerText = "";
  document.getElementById("skillError").innerText = "";
  document.getElementById("successMsg").innerText = "";

  let isValid = true;

  if (password !== cpassword) {
    errorcpass.style.color = "red"
    errorcpass.textContent = "Passwords do not match";
    isValid = false;
  }

  if (!gender) {
    document.getElementById("genderError").innerText = "Select gender";
    isValid = false;
  }

  if (skills.length === 0) {
    document.getElementById("skillError").innerText =
      "Select at least one skill";
    isValid = false;
  }

  if (isValid) {
    document.getElementById("successMsg").innerText = "Registration Successful";
    form.reset();
  }
});

document.getElementById("togglePass").addEventListener("change", function () {
  let pass = document.getElementById("password");
  let cpass = document.getElementById("cpassword");

  if (this.checked) {
    pass.type = "text";
    cpass.type = "text";
  } else {
    pass.type = "password";
    cpass.type = "password";
  }
});
