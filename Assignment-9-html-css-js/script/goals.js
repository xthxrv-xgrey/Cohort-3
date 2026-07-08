import { state, saveState } from "./storage.js";

const goalCards = document.getElementById("goalCards");

// =====================
// Add Goal Modal
// =====================
const addGoalModal = document.getElementById("addGoalModal");
const addGoalForm = document.getElementById("addGoalForm");
const openAddGoalModalBtn = document.getElementById("openAddGoalModal");
const closeGoalModalBtn = document.getElementById("closeGoalModal");

// =====================
// Edit Goal Modal
// =====================
const editGoalModal = document.getElementById("editGoalModal");
const editGoalForm = document.getElementById("editGoalForm");
const closeEditGoalModalBtn = document.getElementById("closeEditGoalModal");

let editingGoalId = null;

// =====================
// Initialize
// =====================
export const initGoals = () => {
  renderGoals();

  document.querySelector("#goals").style.display = "grid";

  initGoalEvents();
};

// =====================
// Events
// =====================
function initGoalEvents() {
  // Open Add Modal
  if (openAddGoalModalBtn) {
    openAddGoalModalBtn.addEventListener("click", () => {
      addGoalModal.style.display = "flex";
    });
  }

  // Close Add Modal
  if (closeGoalModalBtn) {
    closeGoalModalBtn.addEventListener("click", () => {
      addGoalModal.style.display = "none";
      addGoalForm.reset();
    });
  }

  // Close Edit Modal
  if (closeEditGoalModalBtn) {
    closeEditGoalModalBtn.addEventListener("click", () => {
      editGoalModal.style.display = "none";
    });
  }

  // Close when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === addGoalModal) addGoalModal.style.display = "none";

    if (e.target === editGoalModal) editGoalModal.style.display = "none";
  });

  // Add Goal
  addGoalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("goalTitle").value.trim();

    const description = document.getElementById("goalDescription").value.trim();

    state.goals.push({
      id: Date.now(),
      title,
      description,
      status: "Pending",
      isCompleted: false,
    });

    saveState();

    addGoalForm.reset();

    addGoalModal.style.display = "none";

    renderGoals();
  });

  // Edit Goal
  editGoalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const goal = state.goals.find((g) => g.id === editingGoalId);

    if (!goal) return;

    goal.title = document.getElementById("editGoalTitle").value.trim();

    goal.description = document
      .getElementById("editGoalDescription")
      .value.trim();

    saveState();

    editGoalModal.style.display = "none";

    renderGoals();
  });
}

// =====================
// Render Goals
// =====================
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
          <span>${goal.status}</span>
        </div>

        <p>${goal.description}</p>

        <div class="goalButtons">

          <div class="goalStatus">
            <input
              type="checkbox"
              id="goal-${goal.id}"
              ${goal.isCompleted ? "checked" : ""}
            >

            <label for="goal-${goal.id}">
              ${goal.isCompleted ? "Completed" : "Pending"}
            </label>
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

    // Complete Goal
    const checkbox = card.querySelector("input");

    checkbox.addEventListener("change", () => {
      goal.isCompleted = checkbox.checked;
      goal.status = checkbox.checked ? "Completed" : "Pending";

      saveState();

      renderGoals();
    });

    // Delete Goal
    card.querySelector(".goalDeleteBtn").addEventListener("click", () => {
      const index = state.goals.findIndex((g) => g.id === goal.id);

      if (index !== -1) {
        state.goals.splice(index, 1);

        saveState();

        renderGoals();
      }
    });

    // Edit Goal
    card.querySelector(".goalEditBtn").addEventListener("click", () => {
      editingGoalId = goal.id;

      document.getElementById("editGoalTitle").value = goal.title;

      document.getElementById("editGoalDescription").value = goal.description;

      editGoalModal.style.display = "flex";
    });

    goalCards.appendChild(card);
  });
}
