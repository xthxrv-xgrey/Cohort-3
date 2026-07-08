import { state, loadState, saveState } from "./storage.js";

loadState();

const root = document.documentElement;

const themes = [
  "emerge",
  "aurora",
  "ocean",
  "sunrise",
  "sakura",
  "midnight",
  "frost",
  "earth",
  "ember",
  "neon",
];

// Apply saved theme on page load
root.dataset.theme = state.theme || "emerge";

// Highlight saved theme card
const activeCard = document.getElementById(`theme-${root.dataset.theme}`);
if (activeCard) {
  activeCard.classList.add("active-theme");
}

// Add click listeners
themes.forEach((theme) => {
  const card = document.getElementById(`theme-${theme}`);

  if (!card) return;

  card.addEventListener("click", () => {
    // Update state
    state.theme = theme;

    // Apply theme
    root.dataset.theme = theme;

    // Save using your storage.js
    saveState();

    // Update active card
    document.querySelectorAll(".theme-card").forEach((c) => {
      c.classList.remove("active-theme");
    });

    card.classList.add("active-theme");
  });
});
