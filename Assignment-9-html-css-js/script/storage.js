const STORAGE_KEY = "localdata";

export const state = {
  theme: "light",
  username: "Atharv",
  tasks: [],
  goals: [],
  dailyPlans: [],
  quotes: [],
};

export function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    Object.assign(state, JSON.parse(saved));
  } else {
    state.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
}

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

loadState();
