/**********************
 * STATE MANAGEMENT
 **********************/
const STORAGE_KEY = "localdata";

const state = {
  theme: "light",
  currency: "₹",
  currentUser: null,
  users: {},
};

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    state.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    return;
  }
  Object.assign(state, JSON.parse(saved));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

loadState();
let currentUser = state.currentUser;

/**********************
 * FINANCIAL MANAGEMENT
 **********************/

const updateFinancialData = () => {
  const transactions = state.users[currentUser].transactions.filter(
    (t) => !t.delete,
  );

  const totalCredit = transactions.reduce(
    (acc, t) => (t.type === "credit" ? acc + t.amount : acc),
    0,
  );

  const totalDebit = transactions.reduce(
    (acc, t) => (t.type === "debit" ? acc + t.amount : acc),
    0,
  );

  const currentBalance = totalCredit - totalDebit;
  const total = totalCredit + totalDebit;
  const chartPercent = total === 0 ? 0 : (totalCredit / total) * 100;

  const currency = state.currency;

  document.getElementById("current-balance").textContent =
    `${currency} ${currentBalance.toLocaleString()}`;
  document.getElementById("total-income").textContent =
    `${currency} ${totalCredit.toLocaleString()}`;
  document.getElementById("total-expense").textContent =
    `${currency} ${totalDebit.toLocaleString()}`;
  document.getElementById("total-transactions").textContent =
    transactions.length;
  document.getElementById("total-income-amount").textContent =
    `${currency} ${totalCredit.toLocaleString()}`;
  document.getElementById("total-expense-amount").textContent =
    `${currency} ${totalDebit.toLocaleString()}`;
  document.getElementById("cashFlowPercentage").textContent =
    `${chartPercent.toFixed(0)}%`;
  document.getElementById("cashFlowPercentageChart").style.background =
    `conic-gradient(#00ddff ${chartPercent}%, #ff6400 0)`;

  const netAmountEl = document.getElementById("net-amount");
  netAmountEl.textContent = `${currency} ${currentBalance.toLocaleString()}`;
  netAmountEl.style.color =
    currentBalance >= 0 ? "var(--success-color)" : "var(--danger-color)";
};

/**********************
 * TRANSACTION RENDERING
 **********************/

const renderTransactions = (arr) => {
  const tbody = document.getElementById("allTransactions");
  const filtered = arr.filter((t) => !t.delete);

  if (!filtered.length) {
    tbody.innerHTML = "";
    return;
  }

  tbody.innerHTML = filtered
    .map(
      (t) => `
    <tr data-id="${t.id}">
      <td>${t.date}</td>
      <td><span style="font-weight:bold;">${t.description}</span></td>
      <td>${t.category}</td>
      <td>
        <span style="color:${t.type === "credit" ? "var(--success-color)" : "var(--danger-color)"}; font-family:var(--font-mono); font-weight:600;">
          ${t.type === "credit" ? "+" : "-"}${state.currency} ${t.amount.toLocaleString()}
        </span>
      </td>
      <td>
        <button class="editTransaction"><i class="ri-pencil-fill"></i></button>
        <button class="deleteTransaction"><i class="ri-delete-bin-6-fill"></i></button>
      </td>
    </tr>
  `,
    )
    .join("");
};

const getFilteredTransactions = () => {
  const query = document.getElementById("search").value.toLowerCase();
  const typeFilter = document.getElementById("typeSearch").value;

  return state.users[currentUser].transactions.filter((t) => {
    if (t.delete) return false;
    const matchesType = typeFilter === "all" || t.type === typeFilter;
    const matchesQuery =
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query) ||
      t.date.includes(query);
    return matchesType && matchesQuery;
  });
};

const applyFilters = () => {
  renderTransactions(getFilteredTransactions());
};

/**********************
 * MAIN MANAGEMENT
 **********************/

const main = document.querySelector("main");

function initializeUser() {
  document.getElementById("display-name").textContent =
    state.users[currentUser].profile.name;
  document.getElementById("menuName").textContent =
    state.users[currentUser].profile.name;
  updateFinancialData();
  renderTransactions(state.users[currentUser].transactions);
  main.style.display = "flex";
}

/**********************
 * LOGIN MANAGEMENT
 **********************/

if (!currentUser || !state.users[currentUser]) {
  document.getElementById("loginModal").style.display = "flex";
} else {
  initializeUser();
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  if (state.users[username] && state.users[username].password === password) {
    currentUser = username;
    state.currentUser = username;
    saveState();
    document.getElementById("loginModal").style.display = "none";
    initializeUser();
  } else {
    alert("Invalid username or password.");
  }
});

document.getElementById("showRegisterModal").addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("registerModal").style.display = "flex";
});

/**********************
 * REGISTER MANAGEMENT
 **********************/

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("register-name").value.trim();
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!name || !username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  if (state.users[username]) {
    alert("Username already exists.");
    return;
  }

  state.users[username] = {
    password,
    profile: { name, email },
    transactions: [],
  };
  saveState();
  document.getElementById("registerModal").style.display = "none";
  document.getElementById("loginModal").style.display = "flex";
});

document.getElementById("showLoginModal").addEventListener("click", () => {
  document.getElementById("registerModal").style.display = "none";
  document.getElementById("loginModal").style.display = "flex";
});

/**********************
 * THEME MANAGEMENT
 **********************/

const html = document.documentElement;
const themeBtn = document.getElementById("theme-toggle-btn");

function applyTheme() {
  html.dataset.theme = state.theme;
  themeBtn.innerHTML =
    state.theme === "dark"
      ? "<i class='ri-sun-fill'></i> <span>Light</span>"
      : "<i class='ri-moon-fill'></i> <span>Dark</span>";
}

applyTheme();

themeBtn.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  applyTheme();
  saveState();
});

/**********************
 * MENU MANAGEMENT
 **********************/

const menuBtn = document.getElementById("menu-toggle-btn");
const menuModal = document.getElementById("menuModal");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  menuModal.style.display =
    menuModal.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
  if (!menuBtn.contains(e.target) && !menuModal.contains(e.target)) {
    menuModal.style.display = "none";
  }
});

document.getElementById("logout-btn").addEventListener("click", () => {
  currentUser = null;
  state.currentUser = null;
  saveState();
  main.style.display = "none";
  document.getElementById("loginModal").style.display = "flex";
  menuModal.style.display = "none";
});

/**********************
 * ADD TRANSACTION
 **********************/

const addTransactionModal = document.getElementById("addTransactionModal");

document.getElementById("addTransactionBtn").addEventListener("click", () => {
  document.getElementById("addTransactionForm").reset();
  addTransactionModal.style.display = "flex";
});

addTransactionModal.addEventListener("click", (e) => {
  if (e.target === addTransactionModal)
    addTransactionModal.style.display = "none";
});

document
  .getElementById("addTransactionForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const type = document.getElementById("addTransactionType").value;
    const description = document
      .getElementById("addTransactionDescription")
      .value.trim();
    const amount = Number(
      document.getElementById("addTransactionAmount").value,
    );
    const date = document.getElementById("addTransactionDate").value;
    const category = document.getElementById("addTransactionCategory").value;

    if (!description || !date || amount <= 0 || !category) {
      alert("Please fill all fields correctly.");
      return;
    }

    state.users[currentUser].transactions.push({
      id: crypto.randomUUID(),
      type,
      description,
      amount,
      date,
      category,
      delete: false,
    });

    saveState();
    applyFilters();
    updateFinancialData();
    addTransactionModal.style.display = "none";
  });

/**********************
 * EDIT TRANSACTION
 **********************/

const editTransactionModal = document.getElementById("editTransactionModal");

editTransactionModal.addEventListener("click", (e) => {
  if (e.target === editTransactionModal)
    editTransactionModal.style.display = "none";
});

document
  .getElementById("editTransactionForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("editTransactionId").value;
    const type = document.getElementById("editTransactionType").value;
    const description = document
      .getElementById("editTransactionDescription")
      .value.trim();
    const amount = Number(
      document.getElementById("editTransactionAmount").value,
    );
    const date = document.getElementById("editTransactionDate").value;
    const category = document.getElementById("editTransactionCategory").value;

    if (!description || !date || amount <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    const transactions = state.users[currentUser].transactions;
    const idx = transactions.findIndex((t) => t.id === id);

    if (idx !== -1) {
      transactions[idx] = {
        ...transactions[idx],
        type,
        description,
        amount,
        date,
        category,
      };
    }

    saveState();
    applyFilters();
    updateFinancialData();
    editTransactionModal.style.display = "none";
  });

/**********************
 * DELETE + EDIT via delegation
 **********************/

document.getElementById("allTransactions").addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  if (!row) return;
  const id = row.dataset.id;

  if (e.target.closest(".deleteTransaction")) {
    if (!confirm("Delete this transaction?")) return;

    state.users[currentUser].transactions.forEach((t) => {
      if (t.id === id) t.delete = true;
    });

    saveState();
    applyFilters();
    updateFinancialData();
    return;
  }

  if (e.target.closest(".editTransaction")) {
    const tx = state.users[currentUser].transactions.find((t) => t.id === id);
    if (!tx) return;

    document.getElementById("editTransactionId").value = tx.id;
    document.getElementById("editTransactionType").value = tx.type;
    document.getElementById("editTransactionDescription").value =
      tx.description;
    document.getElementById("editTransactionAmount").value = tx.amount;
    document.getElementById("editTransactionDate").value = tx.date;
    document.getElementById("editTransactionCategory").value = tx.category;

    editTransactionModal.style.display = "flex";
  }
});

/**********************
 * SEARCH & FILTER
 **********************/

document.getElementById("search").addEventListener("input", applyFilters);
document.getElementById("typeSearch").addEventListener("change", applyFilters);
