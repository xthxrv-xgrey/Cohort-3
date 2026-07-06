// taskProgress.js

import { state } from "../storage.js";

export const initTaskProgress = () => {
  const outerCircle = document.getElementById("taskProgressOuterCircle");
  const innerText = document.querySelector("#taskProgressInnerCircle span");

  if (!outerCircle || !innerText) return;

  const tasks = Array.isArray(state.tasks) ? state.tasks : [];

  const total = tasks.length;
  const completed = tasks.reduce(
    (count, task) => count + (task.isCompleted ? 1 : 0),
    0,
  );

  const percentage = total === 0 ? 0 : (completed / total) * 100;

  outerCircle.style.background = `
        conic-gradient(
            var(--primary) ${percentage}%,
            var(--bg) 0
        )
    `;

  innerText.textContent = `${completed}/${total}`;
};
