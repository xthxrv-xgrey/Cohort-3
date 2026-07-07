import { state, saveState } from "./storage.js";

const goalCards = document.getElementById("goalCards");

export const initGoals = () => {
  renderGoals();

  document.querySelector("#goals").style.display = "grid";
};

function renderGoals() {
  goalCards.innerHTML = "";

  if (state.goals.length === 0) {
    goalCards.innerHTML = `
      <div class="emptyState">
        <p>No goals available. Add your first goal!</p>
      </div>
    `;
    return;
  }

  state.goals.forEach((goal) => {
    const card = document.createElement("div");
    card.className = "goalCard";

    card.innerHTML = `
      <div class="goalInner">
        <div class="title">
          <h1>${goal.title}</h1>
          <span>~${goal.status}</span>
        </div>

        <p>${goal.description}</p>

        <div class="goalButtons">
          <div class="goalStatus">
            <input
              type="checkbox"
              id="goal-${goal.id}"
              ${goal.isCompleted ? "checked" : ""}
            >
            <label for="goal-${goal.id}">${goal.isCompleted ? "Completed" : "Pending"}</label>
          </div>

          <div class="goalFunctions">
            <button class="goalEditBtn">
              <i class="ri-pencil-fill"></i>
              <span class="goalBtnText">Edit</span>
            </button>

            <button class="goalDeleteBtn">
              <i class="ri-delete-bin-fill"></i>
              <span class="goalBtnText">Delete</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const checkbox = card.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      goal.isCompleted = checkbox.checked;
      goal.status = checkbox.checked ? "Completed" : "In Progress";

      saveState();
      renderGoals();
    });

    const deleteBtn = card.querySelector(".goalDeleteBtn");
    deleteBtn.addEventListener("click", () => {
      const index = state.goals.findIndex((g) => g.id === goal.id);

      if (index !== -1) {
        state.goals.splice(index, 1);
        saveState();
        renderGoals();
      }
    });

    const editBtn = card.querySelector(".goalEditBtn");
    editBtn.addEventListener("click", () => {
      console.log("Edit goal:", goal);
    });

    goalCards.appendChild(card);
  });
}
