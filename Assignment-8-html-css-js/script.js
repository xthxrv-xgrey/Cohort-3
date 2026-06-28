/**********************
 * STATE MANAGEMENT
 **********************/
const STORAGE_KEY = "localdata";

const state = {
  theme: "light",
  currency: "₹",
  currentUser: "admin",
  users: {
    admin: {
      password: "admin",
      profile: {
        name: "Administrator",
        email: "admin@gmain.com",
      },
      transactions: [
        {
          id: Date.now().toString(),
          date: "2026-06-27",
          description: "Salary",
          category: "Salary",
          amount: 50000,
          type: "credit",
        },
      ],
    },
  },
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

// Initialize
loadState();

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

menuBtn.addEventListener("click", () => {
  menuModal.style.display =
    menuModal.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (event) => {
  if (event.target !== menuBtn && !menuModal.contains(event.target)) {
    menuModal.style.display = "none";
  }
});

/**********************
 * MENU MANAGEMENT
 **********************/

let currentUser = state.currentUser;

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

if (!currentUser || !state.users[currentUser]) {
  loginModal.style.display = "block";
}

let totalCredit = state.users[currentUser].transactions.reduce(
  (acc, transaction) => {
    return transaction.type === "credit" ? acc + transaction.amount : acc;
  },
  0,
);

let totalDebit = state.users[currentUser].transactions.reduce(
  (acc, transaction) => {
    return transaction.type === "debit" ? acc + transaction.amount : acc;
  },
  0,
);

let currentBalance = totalCredit - totalDebit;

const currentBalanceElement = document.getElementById("current-balance");
const totalIncomeElement = document.getElementById("total-income");
const totalExpenseElement = document.getElementById("total-expense");
const totalTransactionsElement = document.getElementById("total-transactions");
const totalIncomeAmountElement = document.getElementById("total-income-amount");
const totalExpenseAmountElement = document.getElementById(
  "total-expense-amount",
);
const cashFlowPercentage = document.getElementById("cashFlowPercentage");
const cashFlowPercentageChart = document.getElementById(
  "cashFlowPercentageChart",
);
const netAmountElement = document.getElementById("net-amount");
const displayNameElement = document.getElementById("display-name");

currentBalanceElement.textContent = `${state.currency} ${currentBalance.toLocaleString()}`;
totalIncomeElement.textContent = `${state.currency} ${totalCredit.toLocaleString()}`;
totalExpenseElement.textContent = `${state.currency} ${totalDebit.toLocaleString()}`;
totalTransactionsElement.textContent =
  state.users[currentUser].transactions.length;
totalIncomeAmountElement.textContent = `${state.currency} ${totalCredit.toLocaleString()}`;
totalExpenseAmountElement.textContent = `${state.currency} ${totalDebit.toLocaleString()}`;
cashFlowPercentage.textContent = `${(
  (totalCredit / (totalCredit + totalDebit)) *
  100
).toFixed(0)}%`;

cashFlowPercentageChart.style.background = `conic-gradient(#4caf50 ${(totalCredit / (totalCredit + totalDebit)) * 100}%, #f44336 0)`;
netAmountElement.textContent = `${state.currency} ${currentBalance.toLocaleString()}`;
if (netAmountElement.textContent.includes("-")) {
  netAmountElement.style.color = "red";
}
displayNameElement.textContent = state.users[currentUser].profile.name;
