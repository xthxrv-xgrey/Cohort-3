// goals.js

import { state } from "../storage.js";

export const initGoals = () => {
  const goalsContainer = document.getElementById("homeGoals");

  if (!goalsContainer) return;

  const title = goalsContainer.querySelector("h2");
  const content = goalsContainer.querySelector("p");

  title.textContent = "Goals";

  if (!Array.isArray(state.goals) || state.goals.length === 0) {
    content.textContent =
      "You haven't added any goals yet. Add a goal to keep yourself focused and motivated.";
    return;
  }

  const firstGoal = state.goals[0];

  // Supports either an object or a plain string
  if (typeof firstGoal === "string") {
    content.textContent = firstGoal;
  } else {
    content.textContent =
      firstGoal.description ||
      firstGoal.title ||
      "No goal description available.";
  }
};
