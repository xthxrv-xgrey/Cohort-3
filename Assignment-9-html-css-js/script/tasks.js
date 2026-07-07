import { state, saveState } from "./storage.js";

const taskCards = document.getElementById("taskCards");

export const initTasks = () => {
  renderTasks();

  document.querySelector("#tasks").style.display = "grid";
};

function renderTasks() {
  taskCards.innerHTML = "";

  if (state.tasks.length === 0) {
    taskCards.innerHTML = `
      <div class="emptyState">
        <p>No tasks available. Add your first task!</p>
      </div>
    `;
    return;
  }

  state.tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = "taskCard";

    card.innerHTML = `
      <div class="taskInner">
        <div class="title">
          <h1>${task.title}</h1>
          <span>~${task.status}</span>
        </div>

        <p>${task.description}</p>

        <div class="taskButtons">
          <div class="taskStatus">
            <input
              type="checkbox"
              id="task-${task.id}"
              ${task.isCompleted ? "checked" : ""}
            >
            <label for="task-${task.id}">Completed</label>
          </div>

          <div class="taskFunctions">
            <button class="taskEditBtn">
              <i class="ri-pencil-fill"></i>
              <span class="taskBtnText">Edit</span>
            </button>

            <button class="taskDeleteBtn">
              <i class="ri-delete-bin-fill"></i>
              <span class="taskBtnText">Delete</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const checkbox = card.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      task.isCompleted = checkbox.checked;
      task.status = checkbox.checked ? "Completed" : "Pending";

      saveState();
      renderTasks();
    });

    const deleteBtn = card.querySelector(".taskDeleteBtn");
    deleteBtn.addEventListener("click", () => {
      const index = state.tasks.findIndex((t) => t.id === task.id);

      if (index !== -1) {
        state.tasks.splice(index, 1);
        saveState();
        renderTasks();
      }
    });

    const editBtn = card.querySelector(".taskEditBtn");
    editBtn.addEventListener("click", () => {
      console.log("Edit task:", task);
    });

    taskCards.appendChild(card);
  });
}
