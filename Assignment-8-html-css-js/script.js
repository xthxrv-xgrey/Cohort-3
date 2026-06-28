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
          id: crypto.randomUUID(),
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
