function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  const email = localStorage.getItem("currentUser");
  const users = getUsers();
  return users.find((user) => user.email === email);
}

// Elements

const regName = document.querySelector("#regName");
const regEmail = document.querySelector("#regEmail");
const regPassword = document.querySelector("#regPassword");
const registerBtn = document.querySelector("#registerBtn");

const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginBtn = document.querySelector("#loginBtn");

const authMessage = document.querySelector("#authMessage");

const showLogin = document.querySelector("#showLogin");
const showRegister = document.querySelector("#showRegister");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

const authSection = document.querySelector("#authSection");
const dashboard = document.querySelector("#dashboard");
const logoutBtn = document.querySelector("#logoutBtn");

const usernameText = document.querySelector("#username");

const balanceText = document.querySelector("#balance");
const historyList = document.querySelector("#history");
const emptyState = document.querySelector("#emptyState");

const amountInput = document.querySelector("#amount");
const message = document.querySelector("#message");

const depositBtn = document.querySelector("#depositBtn");
const withdrawBtn = document.querySelector("#withdrawBtn");

// Toggle

showLogin.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");

  showLogin.classList.add("bg-green-500");
  showRegister.classList.remove("bg-green-500");

  authMessage.textContent = "";
});

showRegister.addEventListener("click", () => {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");

  showRegister.classList.add("bg-green-500");
  showLogin.classList.remove("bg-green-500");

  authMessage.textContent = "";
});

// Registration

registerBtn.addEventListener("click", () => {
  try {
    const name = regName.value.trim();
    const email = regEmail.value.trim();
    const password = regPassword.value.trim();

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    if (!email.includes("@")) {
      throw new Error("Invalid email format");
    }

    if (password.length < 4) {
      throw new Error("Password must be at least 4 characters");
    }

    let users = getUsers();

    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists");
    }

    users.push({
      name,
      email,
      password,
      balance: 0,
      history: [],
    });

    saveUsers(users);

    authMessage.textContent = "Account created successfully";
    authMessage.className = "text-green-400 text-center text-sm mt-3";

    regName.value = "";
    regEmail.value = "";
    regPassword.value = "";
  } catch (err) {
    authMessage.textContent = err.message;
    authMessage.className = "text-red-400 text-center text-sm mt-3";
  }
});

// Login

loginBtn.addEventListener("click", () => {
  try {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const users = getUsers();

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    localStorage.setItem("currentUser", email);

    showDashboard();

    loginEmail.value = "";
    loginPassword.value = "";
  } catch (err) {
    authMessage.textContent = err.message;
    authMessage.className = "text-red-400 text-center text-sm mt-3";
  }
});

// Dashboard

function showDashboard() {
  authSection.classList.add("hidden");
  dashboard.classList.remove("hidden");

  updateUserUI();
  updateBalanceUI();
  renderHistory();
}

logoutBtn.addEventListener("click", () => {
  if (!confirm("Are you sure you want to logout?")) return;

  localStorage.removeItem("currentUser");

  dashboard.classList.add("hidden");
  authSection.classList.remove("hidden");

  authMessage.textContent = "Logged out successfully";
});

// Auto login
window.addEventListener("load", () => {
  if (localStorage.getItem("currentUser")) {
    showDashboard();
  }
});

// User UI

function updateUserUI() {
  const user = getCurrentUser();
  if (!user) return;

  usernameText.textContent = user.name;
}

function updateBalanceUI() {
  const user = getCurrentUser();
  if (!user) return;

  balanceText.textContent = user.balance.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

// History

function renderHistory() {
  const user = getCurrentUser();
  if (!user) return;

  historyList.innerHTML = "";

  if (user.history.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  user.history.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="flex justify-between">
        <span>${item.text}</span>
        <span class="text-xs text-gray-400">${item.time}</span>
      </div>
    `;

    li.className = `px-3 py-2 rounded-lg ${
      item.type === "deposit"
        ? "bg-green-500/10 text-green-400"
        : "bg-red-500/10 text-red-400"
    }`;

    historyList.appendChild(li);
  });
}

// Transaction

function deposit(amount) {
  try {
    if (!amount || isNaN(amount)) throw new Error("Enter valid amount");
    if (amount <= 0) throw new Error("Amount must be greater than 0");

    let users = getUsers();
    const email = localStorage.getItem("currentUser");

    const index = users.findIndex((u) => u.email === email);
    if (index === -1) throw new Error("User not found");

    users[index].balance += amount;

    users[index].history.unshift({
      text: `Deposited ₹${amount}`,
      type: "deposit",
      time: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    });

    saveUsers(users);

    return { msg: `Deposited ₹${amount}`, type: "deposit" };
  } catch (err) {
    return { msg: err.message, type: "error" };
  }
}

function withdraw(amount) {
  try {
    if (!amount || isNaN(amount)) throw new Error("Enter valid amount");
    if (amount <= 0) throw new Error("Amount must be greater than 0");

    let users = getUsers();
    const email = localStorage.getItem("currentUser");

    const index = users.findIndex((u) => u.email === email);
    if (index === -1) throw new Error("User not found");

    if (amount > users[index].balance) {
      throw new Error("Insufficient balance");
    }

    users[index].balance -= amount;

    users[index].history.unshift({
      text: `Withdrawn ₹${amount}`,
      type: "withdraw",
      time: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    });

    saveUsers(users);

    return { msg: `Withdrawn ₹${amount}`, type: "withdraw" };
  } catch (err) {
    return { msg: err.message, type: "error" };
  }
}

// Update UI

function updateUI(result) {
  message.textContent = result.msg;

  const color =
    result.type === "deposit"
      ? "text-green-400"
      : result.type === "withdraw"
        ? "text-red-400"
        : "text-yellow-400";

  message.className = `text-center text-sm mb-4 ${color}`;

  updateBalanceUI();
  renderHistory();

  setTimeout(() => (message.textContent = ""), 3000);
}

// Events

depositBtn.addEventListener("click", () => {
  const amount = Number(amountInput.value);
  updateUI(deposit(amount));
  amountInput.value = "";
});

withdrawBtn.addEventListener("click", () => {
  const amount = Number(amountInput.value);
  updateUI(withdraw(amount));
  amountInput.value = "";
});

// Disable buttons
amountInput.addEventListener("input", () => {
  const invalid = !amountInput.value || amountInput.value <= 0;

  depositBtn.disabled = invalid;
  withdrawBtn.disabled = invalid;

  depositBtn.classList.toggle("opacity-50", invalid);
  withdrawBtn.classList.toggle("opacity-50", invalid);
});

// Enter key support
amountInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") depositBtn.click();
});
