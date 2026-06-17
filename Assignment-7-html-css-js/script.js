/**********************
 * STATE
 **********************/
const state = {
  activeTasks: [],
  completedTasks: [],
  binTasks: [],
  projects: [],
  editMode: false,
  editingTaskId: null,
  currentView: "active",
  selectedProject: null,
  darkMode: false,
  searchQuery: "",
};

const STORAGE_KEY = "taskAppState";

/**********************
 * DOM
 **********************/
const tasks = document.querySelector("#tasks");

const projects = document.querySelector("#projects");

const addTaskBtn = document.querySelector("#addTask");
const taskModal = document.querySelector("#taskModal");
const closeTaskModal = document.querySelector("#closeTaskModal");
const taskForm = document.querySelector("#taskForm");
const taskModalHeading = document.querySelector("#taskModalHeading");
const addBtn = document.querySelector("#addBtn");

const activeViewBtn = document.querySelector("#active");
const completedViewBtn = document.querySelector("#completed");
const binViewBtn = document.querySelector("#bin");

const projectModal = document.querySelector("#projectModal");
const closeProjectModal = document.querySelector("#closeProjectModal");
const projectForm = document.querySelector("#projectForm");

const searchBar = document.querySelector("#searchBar");
const themeToggle = document.querySelector(".menu .ri-sun-line");

const inboxNav = document.querySelector("#inbox");
const todayNav = document.querySelector("#today");
const upcomingNav = document.querySelector("#upcoming");
const settingsNav = document.querySelector("#settings");

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
    projects: state.projects,
    darkMode: state.darkMode,
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
  state.projects = parsed.projects || [];
  state.darkMode = parsed.darkMode || false;
};

/**********************
 * CORE
 **********************/
const commit = (view = state.currentView) => {
  state.currentView = view;
  saveState();
  render(view);
  setTaskCounts();
  highlightActiveView();
};

/**********************
 * DARK MODE
 **********************/
const applyTheme = () => {
  if (state.darkMode) {
    document.body.classList.add("dark");
    themeToggle.classList.remove("ri-sun-line");
    themeToggle.classList.add("ri-moon-line");
  } else {
    document.body.classList.remove("dark");
    themeToggle.classList.remove("ri-moon-line");
    themeToggle.classList.add("ri-sun-line");
  }
};

/**********************
 * VIEW HIGHLIGHT
 **********************/
const highlightActiveView = () => {
  [activeViewBtn, completedViewBtn, binViewBtn].forEach((btn) =>
    btn.classList.remove("active-view"),
  );
  if (state.currentView === "active")
    activeViewBtn.classList.add("active-view");
  if (state.currentView === "completed")
    completedViewBtn.classList.add("active-view");
  if (state.currentView === "bin") binViewBtn.classList.add("active-view");
};

/**********************
 * CARD BUILDERS
 **********************/
const activeTaskCard = (task) => {
  const card = document.createElement("div");
  card.className = "activeTask";
  card.dataset.id = task.id;

  const priorityColor =
    task.priority === "high"
      ? "#ff4d4d"
      : task.priority === "medium"
        ? "#f5a623"
        : "#5cb85c";

  card.innerHTML = `
    <input type="checkbox">
    <div class="content">
      <h1>${task.title} <span>~ ${task.project}</span></h1>
      <p>${task.description}</p>
      <div class="details">
        <div class="left">
          <h6 class="tag"><i class="ri-circle-fill"></i>${task.tag}</h6>
          <h6>${task.dueDate}</h6>
        </div>
        <h6 style="color:${priorityColor}"><i class="ri-flag-fill" style="color:${priorityColor}"></i>${task.priority}</h6>
      </div>
    </div>
    <div class="icons">
      <i class="ri-pencil-line" title="Edit"></i>
      <i class="ri-delete-bin-line" title="Move to Bin"></i>
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
      <h6>Completed on ${task.completionDate}</h6>
    </div>
    <i class="ri-delete-bin-line" title="Move to Bin"></i>
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
      <i class="ri-recycle-line" title="Restore"></i>
      <i class="ri-delete-bin-line" title="Delete Permanently"></i>
    </div>
  `;
  return card;
};

/**********************
 * EMPTY STATE
 **********************/
const emptyState = (message, icon = "ri-checkbox-circle-line") => {
  const div = document.createElement("div");
  div.className = "empty-state";
  div.innerHTML = `
    <i class="${icon}"></i>
    <p>${message}</p>
  `;
  return div;
};

/**********************
 * RENDER
 **********************/
const render = (type = "active") => {
  tasks.innerHTML = "";

  const q = state.searchQuery.toLowerCase();

  const matchesSearch = (t) =>
    !q ||
    t.title.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.tag.toLowerCase().includes(q) ||
    t.project.toLowerCase().includes(q);

  if (type === "active") {
    let data = state.activeTasks;

    if (state.selectedProject) {
      data = data.filter((t) => t.project === state.selectedProject);
    }

    data = data.filter(matchesSearch);

    if (data.length === 0) {
      tasks.appendChild(
        emptyState(
          q
            ? "No tasks match your search."
            : "No active tasks. Click '+ Add Task' to get started!",
          "ri-checkbox-blank-circle-line",
        ),
      );
    } else {
      data.forEach((t) => tasks.appendChild(activeTaskCard(t)));
    }
  }

  if (type === "completed") {
    let data = state.completedTasks;

    if (state.selectedProject) {
      data = data.filter((t) => t.project === state.selectedProject);
    }

    data = data.filter(matchesSearch);

    if (data.length === 0) {
      tasks.appendChild(
        emptyState(
          q ? "No tasks match your search." : "No completed tasks yet.",
          "ri-checkbox-circle-line",
        ),
      );
    } else {
      data.forEach((t) => tasks.appendChild(completedTaskCard(t)));
    }
  }

  if (type === "bin") {
    let data = state.binTasks;

    if (state.selectedProject) {
      data = data.filter((t) => t.project === state.selectedProject);
    }

    data = data.filter(matchesSearch);

    if (data.length === 0) {
      tasks.appendChild(
        emptyState(
          q ? "No tasks match your search." : "Bin is empty.",
          "ri-delete-bin-line",
        ),
      );
    } else {
      data.forEach((t) => tasks.appendChild(binTaskCard(t)));
    }
  }
};

const renderProjects = () => {
  projects.innerHTML = `
    <div class="project-title">
      <h3>Projects</h3>
      <i class="ri-add-large-line" id="addProjectBtn" title="Add Project"></i>
    </div>
    <div class="project all-projects ${!state.selectedProject ? "active-project" : ""}" data-project="">
      <h3>All Tasks</h3>
    </div>
  `;

  state.projects.forEach((project) => {
    const p = document.createElement("div");
    p.className = `project ${state.selectedProject === project ? "active-project" : ""}`;
    p.dataset.project = project;

    p.innerHTML = `
      <h3>${project}</h3>
      <i class="ri-delete-bin-2-line" title="Delete project"></i>
    `;

    projects.appendChild(p);
  });

  // FIX: re-bind addProjectBtn after DOM re-render
  document.querySelector("#addProjectBtn").addEventListener("click", () => {
    projectModal.style.display = "flex";
  });
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

const addProject = (title) => {
  const exists = state.projects.some(
    (p) => p.toLowerCase() === title.toLowerCase(),
  );

  if (exists) {
    alert("Project already exists!");
    return false;
  }

  state.projects.push(title);
  renderProjects();
  updateProjectSelect();
  saveState();

  return true;
};

const updateProjectSelect = () => {
  const select = document.querySelector("#project");

  select.innerHTML = `
    <option value="" disabled selected>--Select a Project--</option>
    <option value="Default">Default</option>
  `;

  state.projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project;
    option.textContent = project;
    select.appendChild(option);
  });
};

/**********************
 * EVENTS — TASK CARDS
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
    const isBin = card.classList.contains("binTask");

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

    // FIX: permanently delete from bin
    if (isBin) {
      const confirmDelete = confirm(
        "Permanently delete this task? This cannot be undone.",
      );
      if (!confirmDelete) return;
      const i = state.binTasks.findIndex((t) => t.id === id);
      if (i !== -1) {
        state.binTasks.splice(i, 1);
        commit("bin");
      }
    }

    return;
  }

  // RESTORE FROM BIN
  if (e.target.classList.contains("ri-recycle-line")) {
    const i = state.binTasks.findIndex((t) => t.id === id);
    if (i !== -1) {
      const task = state.binTasks.splice(i, 1)[0];
      const { deletionDate, ...restoredTask } = task;
      state.activeTasks.push(restoredTask);
      commit("bin");
    }
  }
});

/**********************
 * EVENTS — PROJECTS
 **********************/
projects.addEventListener("click", (e) => {
  const projectCard = e.target.closest(".project");
  if (!projectCard) return;

  const projectName = projectCard.dataset.project;

  // delete project
  if (e.target.classList.contains("ri-delete-bin-2-line")) {
    const confirmDelete = confirm(
      `Delete "${projectName}" project? Tasks in this project will remain but won't be filtered.`,
    );
    if (!confirmDelete) return;

    state.projects = state.projects.filter((p) => p !== projectName);

    if (state.selectedProject === projectName) {
      state.selectedProject = null;
    }

    renderProjects();
    updateProjectSelect();
    saveState();
    render(state.currentView);
    return;
  }

  // filter tasks by project (empty string = All Tasks)
  state.selectedProject = projectName || null;
  renderProjects();
  render(state.currentView);
});

/**********************
 * EVENTS — SIDEBAR NAV
 **********************/
const clearNav = () => {
  inboxNav.style.backgroundColor = "transparent";
  todayNav.style.backgroundColor = "transparent";
  upcomingNav.style.backgroundColor = "transparent";
  settingsNav.style.backgroundColor = "transparent";
};

inboxNav.addEventListener("click", () => {
  clearNav();
  inboxNav.style.backgroundColor = "rgba(174, 226, 255, .5)";
  state.selectedProject = null;
  renderProjects();
  commit("active");
});

todayNav.addEventListener("click", () => {
  clearNav();
  todayNav.style.backgroundColor = "rgba(174, 226, 255, .5)";

  const today = formatDate(new Date());
  state.selectedProject = null;
  state.currentView = "active";
  tasks.innerHTML = "";

  const todayTasks = state.activeTasks.filter((t) => t.dueDate === today);
  if (todayTasks.length === 0) {
    tasks.appendChild(
      emptyState("No tasks due today!", "ri-calendar-check-line"),
    );
  } else {
    todayTasks.forEach((t) => tasks.appendChild(activeTaskCard(t)));
  }
  setTaskCounts();
});

upcomingNav.addEventListener("click", () => {
  clearNav();
  upcomingNav.style.backgroundColor = "rgba(174, 226, 255, .5)";

  const tomorrow = formatDate(new Date(Date.now() + 86400000));
  state.selectedProject = null;
  state.currentView = "active";
  tasks.innerHTML = "";

  const upcomingTasks = state.activeTasks.filter((t) => t.dueDate >= tomorrow);
  if (upcomingTasks.length === 0) {
    tasks.appendChild(emptyState("No upcoming tasks.", "ri-calendar-2-line"));
  } else {
    upcomingTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    upcomingTasks.forEach((t) => tasks.appendChild(activeTaskCard(t)));
  }
  setTaskCounts();
});

settingsNav.addEventListener("click", () => {
  clearNav();
  settingsNav.style.backgroundColor = "rgba(174, 226, 255, .5)";

  tasks.innerHTML = "";
  const div = document.createElement("div");
  div.className = "settings-panel";
  div.innerHTML = `
    <h2>Settings</h2>
    <div class="setting-item">
      <span>Dark Mode</span>
      <label class="toggle-switch">
        <input type="checkbox" id="darkModeToggle" ${state.darkMode ? "checked" : ""}>
        <span class="slider"></span>
      </label>
    </div>
    <div class="setting-item">
      <span>Clear Bin</span>
      <button id="clearBinBtn" class="danger-btn">Empty Bin (${state.binTasks.length})</button>
    </div>
    <div class="setting-item">
      <span>App Version</span>
      <span class="muted">TaskFlow v1.0</span>
    </div>
  `;
  tasks.appendChild(div);

  document.querySelector("#darkModeToggle").addEventListener("change", (e) => {
    state.darkMode = e.target.checked;
    applyTheme();
    saveState();
  });

  document.querySelector("#clearBinBtn").addEventListener("click", () => {
    if (!confirm("Empty the bin? All deleted tasks will be permanently lost."))
      return;
    state.binTasks = [];
    saveState();
    setTaskCounts();
    document.querySelector("#clearBinBtn").textContent = "Empty Bin (0)";
  });
});

/**********************
 * EVENTS — VIEW SWITCHING
 **********************/
activeViewBtn.addEventListener("click", () => commit("active"));
completedViewBtn.addEventListener("click", () => commit("completed"));
binViewBtn.addEventListener("click", () => commit("bin"));

/**********************
 * EVENTS — DARK MODE TOGGLE
 **********************/
themeToggle.addEventListener("click", () => {
  state.darkMode = !state.darkMode;
  applyTheme();
  saveState();
});

/**********************
 * EVENTS — SEARCH
 **********************/
searchBar.addEventListener("input", (e) => {
  state.searchQuery = e.target.value.trim();
  render(state.currentView);
});

/**********************
 * EVENTS — TASK MODAL
 **********************/
addTaskBtn.addEventListener("click", () => {
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
  state.editMode = false;
  state.editingTaskId = null;
});

// Close modal on backdrop click
taskModal.addEventListener("click", (e) => {
  if (e.target === taskModal) {
    taskModal.style.display = "none";
    taskForm.reset();
    state.editMode = false;
    state.editingTaskId = null;
  }
});

/**********************
 * EVENTS — PROJECT MODAL
 **********************/

closeProjectModal.addEventListener("click", () => {
  projectModal.style.display = "none";
  projectForm.reset();
});

projectModal.addEventListener("click", (e) => {
  if (e.target === projectModal) {
    projectModal.style.display = "none";
    projectForm.reset();
  }
});

/**********************
 * EVENTS — TASK FORM SUBMIT
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
 * EVENTS — PROJECT FORM SUBMIT
 **********************/
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = projectForm[0].value.trim();

  if (!title) return;

  const added = addProject(title);

  if (added) {
    projectForm.reset();
    projectModal.style.display = "none";
  }
});

/**********************
 * INIT
 **********************/
loadState();
renderProjects();
updateProjectSelect();
applyTheme();
commit("active");
