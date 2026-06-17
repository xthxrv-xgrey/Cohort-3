let activeTasks = [];
let completedTasks = [];
let binTasks = [];
let projects = [];

// selected
const tasks = document.querySelector("#tasks");
const activeBtn = document.querySelector("#active");
const completedBtn = document.querySelector("#completed");
const binBtn = document.querySelector("#bin");
const inboxBtn = document.querySelector("#inbox");
const todayBtn = document.querySelector("#today");
const upcomingBtn = document.querySelector("#upcoming");
const settingsBtn = document.querySelector("#settings");
const projectsSection = document.querySelector("#projects");

// Sample Data
activeTasks = [
  {
    id: 1,
    title: "Finish Portfolio Website",
    description: "Complete the responsive design and deploy to GitHub Pages.",
    project: "Personal",
    tag: "Development",
    dueDate: "2026-06-20",
    priority: "High",
  },
  {
    id: 2,
    title: "Study JavaScript",
    description: "Practice DOM manipulation and event handling.",
    project: "Learning",
    tag: "Education",
    dueDate: "2026-06-18",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Buy Groceries",
    description: "Milk, eggs, bread, fruits, and vegetables.",
    project: "",
    tag: "Personal",
    dueDate: "2026-06-17",
    priority: "Low",
  },
];

completedTasks = [
  {
    id: 4,
    title: "Submit Assignment",
    description: "Uploaded the final PDF to the college portal.",
    project: "College",
    completionDate: "2026-06-15",
  },
  {
    id: 5,
    title: "Clean Workspace",
    description: "Organized desk and removed unnecessary files.",
    project: "Personal",
    completionDate: "2026-06-16",
  },
];

binTasks = [
  {
    id: 6,
    title: "Old Shopping List",
    description: "Items already purchased.",
    project: "",
    deletionDate: "2026-06-14",
  },
  {
    id: 7,
    title: "Abandoned Side Project",
    description: "Stopped development due to lack of time.",
    project: "Freelance",
    deletionDate: "2026-06-13",
  },
];

// ################
// createCards
// ################

const activeTaskCard = (
  id,
  title,
  project = "",
  description,
  tag,
  dueDate,
  priority,
) => {
  let card = document.createElement("div");
  card.className = "activeTask";
  card.dataset.id = id;

  card.innerHTML = `
        <input type="checkbox">
        <div class="content">
            <h1>${title} <span>~ ${project}</span></h1>
            <p>${description}</p>
            <div class="details">
                <div class="left">
                    <h6 class="type-tag">
                        <i class="ri-circle-fill"></i> ${tag}
                    </h6>
                    <h6>
                        <i class="ri-calendar-line"></i> ${dueDate}
                    </h6>
                </div>
                <h6 class="priority-tag">
                    <i class="ri-flag-line"></i> ${priority}
                </h6>
            </div>
        </div>
        <div class="icons">
            <i class="ri-pencil-line"></i>
            <i class="ri-delete-bin-line"></i>
        </div>
    `;

  return card;
};

const completedTaskCard = (
  id,
  title,
  project = "",
  description,
  completionDate,
) => {
  let card = document.createElement("div");
  card.className = "completedTask";
  card.dataset.id = id;

  card.innerHTML = `
        <input type="checkbox" checked>
        <div class="content">
            <h1>${title} <span>~ ${project}</span></h1>
            <p>${description}</p>
            <h6>
                <i class="ri-calendar-line"></i> ${completionDate}
            </h6>
        </div>
        <i class="ri-delete-bin-line"></i>
    `;

  return card;
};

const binTaskCard = (id, title, project = "", description, deletionDate) => {
  let card = document.createElement("div");
  card.className = "binTask";
  card.dataset.id = id;

  card.innerHTML = `
        <i class="ri-file-fill"></i>
        <div class="content">
            <h1>${title} <span>~ ${project}</span></h1>
            <p>${description}</p>
            <h6>Deleted ${deletionDate}</h6>
        </div>
        <div class="icons">
            <i class="ri-recycle-line"></i>
            <i class="ri-delete-bin-line"></i>
        </div>
    `;

  return card;
};

const clearCategoriesButton = () => {
  inboxBtn.style.backgroundColor = "white";
  todayBtn.style.backgroundColor = "white";
  upcomingBtn.style.backgroundColor = "white";
  settingsBtn.style.backgroundColor = "white";
};

const clearTaskTypesButton = () => {
  activeBtn.style.opacity = ".75";
  completedBtn.style.opacity = ".75";
  binBtn.style.opacity = ".75";
};

// ################
// renderCards
// ################

const renderActiveTask = () => {
  clearCategoriesButton();
  inboxBtn.style.backgroundColor = "rgba(174, 227, 255, 1)";

  clearTaskTypesButton();
  activeBtn.style.opacity = "1";

  tasks.innerHTML = "";

  activeTasks.forEach((task) => {
    tasks.appendChild(
      activeTaskCard(
        task.id,
        task.title,
        task.project,
        task.description,
        task.tag,
        task.dueDate,
        task.priority,
      ),
    );
  });
};

const renderCompletedTask = () => {
  clearCategoriesButton();
  inboxBtn.style.backgroundColor = "rgba(174, 227, 255, 0.5)";

  clearTaskTypesButton();
  completedBtn.style.opacity = "1";

  tasks.innerHTML = "";

  completedTasks.forEach((task) => {
    tasks.appendChild(
      completedTaskCard(
        task.id,
        task.title,
        task.project,
        task.description,
        task.completionDate,
      ),
    );
  });
};

const renderBinTask = () => {
  clearCategoriesButton();
  inboxBtn.style.backgroundColor = "rgba(174, 227, 255, 0.5)";

  clearTaskTypesButton();
  binBtn.style.opacity = "1";

  tasks.innerHTML = "";

  binTasks.forEach((task) => {
    tasks.appendChild(
      binTaskCard(
        task.id,
        task.title,
        task.project,
        task.description,
        task.deletionDate,
      ),
    );
  });
};

// ################
// renderCardsDated
// ################

const renderActiveTaskDated = (date) => {
  tasks.innerHTML = "";

  activeTasks.forEach((task) => {
    if (task.dueDate === date)
      tasks.appendChild(
        activeTaskCard(
          task.id,
          task.title,
          task.project,
          task.description,
          task.tag,
          task.dueDate,
          task.priority,
        ),
      );
  });
};

// format date
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// ################
// setTaskCounts
// ################

const setTaskCounts = () => {
  document.querySelector("#activeTaskCount").textContent = activeTasks.length;
  document.querySelector("#completedTaskCount").textContent =
    completedTasks.length;
  document.querySelector("#binTaskCount").textContent = binTasks.length;

  // today task
  // upcoming task ie tommorow

  const now = new Date();
  // Tomorrow
  const today = new Date(now);
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const todayDate = formatDate(today);
  const tomorrowDate = formatDate(tomorrow);

  let todayTaskCount = 0;
  let tomorowTaskCount = 0;

  activeTasks.map((task) => {
    if (task.dueDate === todayDate) todayTaskCount++;
    else if (task.dueDate === tomorrowDate) tomorowTaskCount++;
  });

  document.querySelector("#todaysTaskCount").textContent = `${todayTaskCount}`;
  document.querySelector("#tomorowsTaskCount").textContent =
    `${tomorowTaskCount}`;
};

// renderButtons

// ################
// event listners on task buttons
// ################

activeBtn.addEventListener("click", renderActiveTask);
completedBtn.addEventListener("click", renderCompletedTask);
binBtn.addEventListener("click", renderBinTask);

inboxBtn.addEventListener("click", () => {
  clearCategoriesButton();
  inboxBtn.style.backgroundColor = "rgba(174, 227, 255, 0.5)";
  renderActiveTask();
});

todayBtn.addEventListener("click", () => {
  clearCategoriesButton();
  todayBtn.style.backgroundColor = "rgba(174, 227, 255, 0.5)";

  const now = new Date();
  const today = new Date(now);
  const todayDate = formatDate(today);

  renderActiveTaskDated(todayDate);
});

upcomingBtn.addEventListener("click", () => {
  clearCategoriesButton();
  upcomingBtn.style.backgroundColor = "rgba(174, 227, 255, 0.5)";

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const tomorrowDate = formatDate(tomorrow);

  renderActiveTaskDated(tomorrowDate);
});

settingsBtn.addEventListener("click", () => {
  clearCategoriesButton();
  settingsBtn.style.backgroundColor = "rgba(174, 227, 255, 0.5)";
});

tasks.addEventListener("click", (e) => {
  // ==========================
  // Checkbox Click
  // ==========================
  if (e.target.type === "checkbox") {
    // Active -> Completed
    const activeCard = e.target.closest(".activeTask");

    if (activeCard) {
      const id = Number(activeCard.dataset.id);

      setTimeout(() => {
        const taskIndex = activeTasks.findIndex((task) => task.id === id);

        if (taskIndex !== -1) {
          const completedTask = activeTasks.splice(taskIndex, 1)[0];

          completedTasks.push({
            id: completedTask.id,
            title: completedTask.title,
            description: completedTask.description,
            project: completedTask.project,
            completionDate: formatDate(new Date()),
          });

          renderActiveTask();
          setTaskCounts();
        }
      }, 250);

      return;
    }

    // Completed -> Active
    const completedCard = e.target.closest(".completedTask");

    if (completedCard) {
      const id = Number(completedCard.dataset.id);

      const taskIndex = completedTasks.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        const restoredTask = completedTasks.splice(taskIndex, 1)[0];

        activeTasks.push({
          id: restoredTask.id,
          title: restoredTask.title,
          description: restoredTask.description,
          project: restoredTask.project,
          tag: "Restored",
          dueDate: formatDate(new Date()),
          priority: "Low",
        });

        renderCompletedTask();
        setTaskCounts();
      }

      return;
    }
  }

  // ==========================
  // Delete Active -> Bin
  // ==========================
  if (
    e.target.classList.contains("ri-delete-bin-line") &&
    e.target.closest(".activeTask")
  ) {
    const card = e.target.closest(".activeTask");
    const id = Number(card.dataset.id);

    const taskIndex = activeTasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      const deletedTask = activeTasks.splice(taskIndex, 1)[0];

      binTasks.push({
        id: deletedTask.id,
        title: deletedTask.title,
        description: deletedTask.description,
        project: deletedTask.project,
        deletionDate: formatDate(new Date()),
      });

      renderActiveTask();
      setTaskCounts();
    }

    return;
  }

  // ==========================
  // Delete Completed -> Bin
  // ==========================
  if (
    e.target.classList.contains("ri-delete-bin-line") &&
    e.target.closest(".completedTask")
  ) {
    const card = e.target.closest(".completedTask");
    const id = Number(card.dataset.id);

    const taskIndex = completedTasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      const deletedTask = completedTasks.splice(taskIndex, 1)[0];

      binTasks.push({
        id: deletedTask.id,
        title: deletedTask.title,
        description: deletedTask.description,
        project: deletedTask.project,
        deletionDate: formatDate(new Date()),
      });

      renderCompletedTask();
      setTaskCounts();
    }

    return;
  }

  // ==========================
  // Restore Bin -> Active
  // ==========================
  if (e.target.classList.contains("ri-recycle-line")) {
    const card = e.target.closest(".binTask");

    if (card) {
      const id = Number(card.dataset.id);

      const taskIndex = binTasks.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        const restoredTask = binTasks.splice(taskIndex, 1)[0];

        activeTasks.push({
          id: restoredTask.id,
          title: restoredTask.title,
          description: restoredTask.description,
          project: restoredTask.project,
          tag: "Restored",
          dueDate: formatDate(new Date()),
          priority: "Low",
        });

        renderBinTask();
        setTaskCounts();
      }
    }

    return;
  }

  // ==========================
  // Permanently Delete Bin Task
  // ==========================
  if (
    e.target.classList.contains("ri-delete-bin-line") &&
    e.target.closest(".binTask")
  ) {
    const card = e.target.closest(".binTask");
    const id = Number(card.dataset.id);

    const taskIndex = binTasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      binTasks.splice(taskIndex, 1);
    }

    renderBinTask();
    setTaskCounts();
  }
});

// Initial Render
clearTaskTypesButton();
renderActiveTask();
setTaskCounts();
