import { state, loadState, saveState } from "./storage.js";

const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

// Apply saved theme
root.setAttribute("data-theme", state.theme);

themeBtn.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", state.theme);

  saveState();
});
