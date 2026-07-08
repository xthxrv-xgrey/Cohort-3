import { state, saveState } from "./storage.js";

const taskCards = document.getElementById("taskCards");

// =====================
// Add Task Modal
// =====================
const addTaskModal = document.getElementById("addTaskModal");
const addTaskForm = document.getElementById("addTaskForm");
const openAddTaskModalBtn = document.getElementById("openAddTaskModal");
const closeTaskModalBtn = document.getElementById("closeTaskModal");

// =====================
// Edit Task Modal
// =====================
const editTaskModal = document.getElementById("editTaskModal");
const editTaskForm = document.getElementById("editTaskForm");
const closeEditTaskModalBtn = document.getElementById("closeEditTaskModal");

let editingTaskId = null;

// =====================
// Initialize Tasks
// =====================
export const initTasks = () => {
  renderTasks();

  document.querySelector("#tasks").style.display = "grid";

  initTaskEvents();
};

// =====================
// Modal Events
// =====================
function initTaskEvents() {
  // Open Add Modal
  if (openAddTaskModalBtn) {
    openAddTaskModalBtn.addEventListener("click", () => {
      addTaskModal.style.display = "flex";
    });
  }

  // Close Add Modal
  if (closeTaskModalBtn) {
    closeTaskModalBtn.addEventListener("click", () => {
      addTaskModal.style.display = "none";
      addTaskForm.reset();
    });
  }

  // Close Edit Modal
  if (closeEditTaskModalBtn) {
    closeEditTaskModalBtn.addEventListener("click", () => {
      editTaskModal.style.display = "none";
    });
  }

  // Close by clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === addTaskModal) {
      addTaskModal.style.display = "none";
    }

    if (e.target === editTaskModal) {
      editTaskModal.style.display = "none";
    }
  });

  // Add Task
  addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();

    state.tasks.push({
      id: Date.now(),
      title,
      description,
      status: "Pending",
      isCompleted: false,
    });

    saveState();

    addTaskForm.reset();
    addTaskModal.style.display = "none";

    renderTasks();
  });

  // Edit Task
  editTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("editTaskTitle").value.trim();

    const description = document
      .getElementById("editTaskDescription")
      .value.trim();

    const task = state.tasks.find((t) => t.id === editingTaskId);

    if (!task) return;

    task.title = title;
    task.description = description;

    saveState();

    editTaskModal.style.display = "none";

    renderTasks();
  });
}

// =====================
// Render Tasks
// =====================
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
          <span>${task.status}</span>
        </div>

        <p>${task.description}</p>

        <div class="taskButtons">

          <div class="taskStatus">
            <input
              type="checkbox"
              id="task-${task.id}"
              ${task.isCompleted ? "checked" : ""}
            >

            <label for="task-${task.id}">
              ${task.isCompleted ? "Completed" : "Pending"}
            </label>
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

    // Complete Task
    const checkbox = card.querySelector("input");

    checkbox.addEventListener("change", () => {
      task.isCompleted = checkbox.checked;
      task.status = checkbox.checked ? "Completed" : "Pending";

      saveState();
      renderTasks();
    });

    // Delete Task
    const deleteBtn = card.querySelector(".taskDeleteBtn");

    deleteBtn.addEventListener("click", () => {
      const index = state.tasks.findIndex((t) => t.id === task.id);

      if (index !== -1) {
        state.tasks.splice(index, 1);

        saveState();
        renderTasks();
      }
    });

    // Edit Task
    const editBtn = card.querySelector(".taskEditBtn");

    editBtn.addEventListener("click", () => {
      editingTaskId = task.id;

      document.getElementById("editTaskTitle").value = task.title;
      document.getElementById("editTaskDescription").value = task.description;

      editTaskModal.style.display = "flex";
    });

    taskCards.appendChild(card);
  });
}
