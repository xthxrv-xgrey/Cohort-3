/**********************
 * STATE
 **********************/
const state = {
  activeTasks: [],
  completedTasks: [],
  binTasks: [],
  editMode: false,
  editingTaskId: null,
  currentView: "active",
};

const STORAGE_KEY = "taskAppState";

/**********************
 * DOM
 **********************/
const tasks = document.querySelector("#tasks");

const addTaskBtn = document.querySelector("#addTask");
const taskModal = document.querySelector("#taskModal");
const closeTaskModal = document.querySelector("#closeTaskModal");
const taskForm = document.querySelector("#taskForm");
const taskModalHeading = document.querySelector("#taskModalHeading");
const addBtn = document.querySelector("#addBtn");

const activeViewBtn = document.querySelector("#active");
const completedViewBtn = document.querySelector("#completed");
const binViewBtn = document.querySelector("#bin");

/**********************
 * HELPERS
 **********************/
const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const createId = () =>
  Date.now().toString() + Math.random().toString(16).slice(2);

/**********************
 * STORAGE
 **********************/
const saveState = () => {
  const cleanState = {
    activeTasks: state.activeTasks,
    completedTasks: state.completedTasks,
    binTasks: state.binTasks,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanState));
};

const loadState = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  const parsed = JSON.parse(saved);

  state.activeTasks = parsed.activeTasks || [];
  state.completedTasks = parsed.completedTasks || [];
  state.binTasks = parsed.binTasks || [];
};

/**********************
 * CORE
 **********************/
const commit = (view = state.currentView) => {
  state.currentView = view;
  saveState();
  render(view);
  setTaskCounts();
};

/**********************
 * CARD BUILDERS
 **********************/
const activeTaskCard = (task) => {
  const card = document.createElement("div");
  card.className = "activeTask";
  card.dataset.id = task.id;

  card.innerHTML = `
    <input type="checkbox">
    <div class="content">
      <h1>${task.title} <span>~ ${task.project}</span></h1>
      <p>${task.description}</p>
      <div class="details">
        <div class="left">
          <h6>${task.tag}</h6>
          <h6>${task.dueDate}</h6>
        </div>
        <h6>${task.priority}</h6>
      </div>
    </div>
    <div class="icons">
      <i class="ri-pencil-line"></i>
      <i class="ri-delete-bin-line"></i>
    </div>
  `;
  return card;
};

const completedTaskCard = (task) => {
  const card = document.createElement("div");
  card.className = "completedTask";
  card.dataset.id = task.id;

  card.innerHTML = `
    <input type="checkbox" checked>
    <div class="content">
      <h1>${task.title} <span>~ ${task.project}</span></h1>
      <p>${task.description}</p>
      <h6>${task.completionDate}</h6>
    </div>
    <i class="ri-delete-bin-line"></i>
  `;
  return card;
};

const binTaskCard = (task) => {
  const card = document.createElement("div");
  card.className = "binTask";
  card.dataset.id = task.id;

  card.innerHTML = `
    <i class="ri-file-fill"></i>
    <div class="content">
      <h1>${task.title} <span>~ ${task.project}</span></h1>
      <p>${task.description}</p>
      <h6>Deleted ${task.deletionDate}</h6>
    </div>
    <div class="icons">
      <i class="ri-recycle-line"></i>
      <i class="ri-delete-bin-line"></i>
    </div>
  `;
  return card;
};

/**********************
 * RENDER
 **********************/
const render = (type = "active") => {
  tasks.innerHTML = "";

  if (type === "active") {
    state.activeTasks.forEach((t) => tasks.appendChild(activeTaskCard(t)));
  }

  if (type === "completed") {
    state.completedTasks.forEach((t) =>
      tasks.appendChild(completedTaskCard(t)),
    );
  }

  if (type === "bin") {
    state.binTasks.forEach((t) => tasks.appendChild(binTaskCard(t)));
  }
};

/**********************
 * COUNTS
 **********************/
const setTaskCounts = () => {
  document.querySelector("#activeTaskCount").textContent =
    state.activeTasks.length;

  document.querySelector("#completedTaskCount").textContent =
    state.completedTasks.length;

  document.querySelector("#binTaskCount").textContent = state.binTasks.length;

  const today = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + 86400000));

  let todayCount = 0;
  let tomorrowCount = 0;

  state.activeTasks.forEach((t) => {
    if (t.dueDate === today) todayCount++;
    if (t.dueDate === tomorrow) tomorrowCount++;
  });

  document.querySelector("#todaysTaskCount").textContent = todayCount;
  document.querySelector("#tomorowsTaskCount").textContent = tomorrowCount;
};

/**********************
 * TASK ACTIONS
 **********************/
const addTask = (data) => {
  state.activeTasks.push({
    id: createId(),
    ...data,
  });
};

const updateTask = (id, data) => {
  const i = state.activeTasks.findIndex((t) => t.id === id);
  if (i !== -1) {
    state.activeTasks[i] = {
      ...state.activeTasks[i],
      ...data,
    };
  }
};

/**********************
 * EVENTS
 **********************/
tasks.addEventListener("click", (e) => {
  const card = e.target.closest("[data-id]");
  if (!card) return;

  const id = card.dataset.id;

  // CHECKBOX
  if (e.target.matches("input[type='checkbox']")) {
    const isActive = card.classList.contains("activeTask");
    const isCompleted = card.classList.contains("completedTask");

    if (isActive) {
      const i = state.activeTasks.findIndex((t) => t.id === id);
      const task = state.activeTasks.splice(i, 1)[0];

      state.completedTasks.push({
        ...task,
        completionDate: formatDate(new Date()),
      });

      commit("active");
    }

    if (isCompleted) {
      const i = state.completedTasks.findIndex((t) => t.id === id);
      const task = state.completedTasks.splice(i, 1)[0];

      // FIX: keep the task's original tag/dueDate/priority/project/etc.
      // Just drop the completionDate field instead of overwriting everything.
      const { completionDate, ...restoredTask } = task;
      state.activeTasks.push(restoredTask);

      commit("completed");
    }

    return;
  }

  // EDIT
  if (e.target.classList.contains("ri-pencil-line")) {
    const task = state.activeTasks.find((t) => t.id === id);
    if (!task) return;

    state.editMode = true;
    state.editingTaskId = id;

    taskModal.style.display = "flex";
    taskModalHeading.textContent = "Edit Task";
    addBtn.textContent = "Save Changes";

    taskForm[0].value = task.title;
    taskForm[1].value = task.description;
    taskForm[2].value = task.project;
    taskForm[3].value = task.tag;
    taskForm[4].value = task.dueDate;
    taskForm[5].value = task.priority;

    return;
  }

  // DELETE → BIN
  if (e.target.classList.contains("ri-delete-bin-line")) {
    const isActive = card.classList.contains("activeTask");
    const isCompleted = card.classList.contains("completedTask");

    if (isActive) {
      const i = state.activeTasks.findIndex((t) => t.id === id);
      if (i !== -1) {
        const task = state.activeTasks.splice(i, 1)[0];
        state.binTasks.push({ ...task, deletionDate: formatDate(new Date()) });
        commit("active");
      }
    }

    if (isCompleted) {
      const i = state.completedTasks.findIndex((t) => t.id === id);
      if (i !== -1) {
        const task = state.completedTasks.splice(i, 1)[0];
        state.binTasks.push({ ...task, deletionDate: formatDate(new Date()) });
        commit("completed");
      }
    }
  }

  // RESTORE FROM BIN
  if (e.target.classList.contains("ri-recycle-line")) {
    const i = state.binTasks.findIndex((t) => t.id === id);

    if (i !== -1) {
      const task = state.binTasks.splice(i, 1)[0];

      // FIX: same as above — preserve original tag/dueDate/priority,
      // just strip off the deletionDate marker.
      const { deletionDate, ...restoredTask } = task;
      state.activeTasks.push(restoredTask);

      commit("bin");
    }
  }
});

/**********************
 * VIEW SWITCHING (was missing — buttons did nothing before)
 **********************/
activeViewBtn.addEventListener("click", () => commit("active"));
completedViewBtn.addEventListener("click", () => commit("completed"));
binViewBtn.addEventListener("click", () => commit("bin"));

/**********************
 * MODAL
 **********************/
addTaskBtn.addEventListener("click", () => {
  // FIX: clear any leftover edit-mode values/state before opening a
  // fresh "Add Task" form (previously stale edited values stuck around).
  taskForm.reset();
  state.editMode = false;
  state.editingTaskId = null;

  taskModal.style.display = "flex";
  taskModalHeading.textContent = "Add Task";
  addBtn.textContent = "Add Task";
});

closeTaskModal.addEventListener("click", () => {
  taskModal.style.display = "none";
  taskForm.reset();
  // FIX: also clear edit state on close so a cancelled edit
  // doesn't silently overwrite the wrong task later.
  state.editMode = false;
  state.editingTaskId = null;
});

/**********************
 * FORM
 **********************/
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    title: taskForm[0].value.trim(),
    description: taskForm[1].value.trim(),
    project: taskForm[2].value,
    tag: taskForm[3].value.trim(),
    dueDate: taskForm[4].value,
    priority: taskForm[5].value,
  };

  if (!data.title || !data.description || !data.tag) return;

  if (state.editMode) {
    updateTask(state.editingTaskId, data);
    state.editMode = false;
    state.editingTaskId = null;
  } else {
    addTask(data);
  }

  commit("active");
  taskForm.reset();
  taskModal.style.display = "none";
});

/**********************
 * INIT
 **********************/
loadState();
commit("active");
