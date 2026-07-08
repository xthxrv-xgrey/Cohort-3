import { state, saveState } from "./storage.js";

let currentDate = new Date();

const planner = document.querySelector("#dailyPlanner");

const scheduleContainer = document.querySelector("#dailyPlannerSchedule");

const notes = document.querySelector(".dailyPlannerNotes textarea");

const dateText = document.querySelector("#dateSwitchBarDate");

const prevBtn = document.querySelector("#dateSwitchBarLeftBtn");

const nextBtn = document.querySelector("#dateSwitchBarRightBtn");

// ADD MODAL

const addPlannerModal = document.getElementById("addPlannerModal");

const addPlannerForm = document.getElementById("addPlannerForm");

const openPlannerModal = document.getElementById("openPlannerModal");

const closePlannerModal = document.getElementById("closePlannerModal");

// EDIT MODAL

const editPlannerModal = document.getElementById("editPlannerModal");

const editPlannerForm = document.getElementById("editPlannerForm");

const closeEditPlannerModal = document.getElementById("closeEditPlannerModal");

let editingPlanId = null;

// ICONS

const iconLibrary = {
  morning: [
    "ri-sun-line",
    "ri-sun-cloudy-fill",
    "ri-alarm-line",
    "ri-cup-line",
  ],

  work: [
    "ri-briefcase-line",
    "ri-computer-line",
    "ri-file-text-line",
    "ri-calendar-check-line",
  ],

  health: [
    "ri-heart-pulse-line",
    "ri-run-line",
    "ri-medicine-bottle-line",
    "ri-mental-health-line",
  ],

  food: [
    "ri-restaurant-line",
    "ri-cake-line",
    "ri-shopping-basket-line",
    "ri-cup-line",
  ],

  study: [
    "ri-book-line",
    "ri-graduation-cap-line",
    "ri-pencil-line",
    "ri-lightbulb-line",
  ],

  travel: [
    "ri-car-line",
    "ri-plane-line",
    "ri-map-pin-line",
    "ri-road-map-line",
  ],
};

function createIconPicker(picker, input) {
  function render(category) {
    picker.innerHTML = "";

    iconLibrary[category].forEach((icon) => {
      const btn = document.createElement("button");

      btn.type = "button";

      btn.className = "iconOption";

      btn.innerHTML = `<i class="${icon}"></i>`;

      btn.onclick = () => {
        input.value = icon;

        picker
          .querySelectorAll(".iconOption")
          .forEach((i) => i.classList.remove("selected"));

        btn.classList.add("selected");
      };

      picker.appendChild(btn);
    });
  }

  const categories = picker.parentElement.querySelectorAll(".iconCategory");

  categories.forEach((cat) => {
    cat.onclick = () => {
      categories.forEach((c) => c.classList.remove("active"));

      cat.classList.add("active");

      render(cat.dataset.category);
    };
  });

  render("morning");
}

function openModal(modal) {
  modal.style.display = "flex";

  planner.style.display = "none";
}

function closeModal(modal) {
  modal.style.display = "none";

  planner.style.display = "block";
}

export function initDailyPlanner() {
  planner.style.display = "block";

  renderDate();

  renderPlanner();

  createIconPicker(
    document.getElementById("plannerIconPicker"),
    document.getElementById("plannerIcon"),
  );

  createIconPicker(
    document.getElementById("editPlannerIconPicker"),
    document.getElementById("editPlannerIcon"),
  );

  openPlannerModal.onclick = () => {
    openModal(addPlannerModal);
  };

  closePlannerModal.onclick = () => {
    closeModal(addPlannerModal);

    addPlannerForm.reset();
  };

  closeEditPlannerModal.onclick = () => {
    closeModal(editPlannerModal);
  };

  window.onclick = (e) => {
    if (e.target === addPlannerModal) {
      closeModal(addPlannerModal);
    }

    if (e.target === editPlannerModal) {
      closeModal(editPlannerModal);
    }
  };

  addPlannerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const day = getCurrentDay();

    day.tasks.push({
      id: Date.now(),

      time: plannerTime.value,

      title: plannerTitle.value,

      description: plannerDescription.value,

      icon: plannerIcon.value || "ri-sun-line",
    });

    saveState();

    addPlannerForm.reset();

    closeModal(addPlannerModal);

    renderPlanner();
  });

  editPlannerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const day = getCurrentDay();

    const plan = day.tasks.find((p) => p.id === editingPlanId);

    if (!plan) return;

    plan.time = editPlannerTime.value;

    plan.title = editPlannerTitle.value;

    plan.description = editPlannerDescription.value;

    plan.icon = editPlannerIcon.value || "ri-sun-line";

    saveState();

    closeModal(editPlannerModal);

    renderPlanner();
  });

  prevBtn.onclick = () => {
    currentDate.setDate(currentDate.getDate() - 1);

    renderDate();

    renderPlanner();
  };

  nextBtn.onclick = () => {
    currentDate.setDate(currentDate.getDate() + 1);

    renderDate();

    renderPlanner();
  };

  notes.addEventListener("input", () => {
    autoResize();

    const day = getCurrentDay();

    day.notes = notes.value;

    saveState();
  });

  autoResize();
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function renderDate() {
  const options = {
    weekday: "long",

    day: "2-digit",

    month: "long",

    year: "numeric",
  };

  dateText.innerHTML = `
<i class="ri-calendar-fill"></i>
${currentDate.toLocaleDateString("en-GB", options).toUpperCase()}
`;
}

function getCurrentDay() {
  const date = formatDate(currentDate);

  let day = state.dailyPlans.find((d) => d.date === date);

  if (!day) {
    day = {
      date,

      notes: "",

      tasks: [],
    };

    state.dailyPlans.push(day);

    saveState();
  }

  return day;
}

function renderPlanner() {
  const day = getCurrentDay();

  notes.value = day.notes;

  autoResize();

  scheduleContainer.innerHTML = "";

  const tasks = [...day.tasks].sort((a, b) => a.time.localeCompare(b.time));

  if (tasks.length === 0) {
    scheduleContainer.innerHTML =
      "<p style='opacity:.6'>No plans for this day.</p>";

    return;
  }

  tasks.forEach((plan) => {
    const card = document.createElement("div");

    card.className = "dailyPlannerScheduleCard";

    card.innerHTML = `

<div class="left">

<span class="dailyPlannerScheduleCardTime">
${plan.time}
</span>


<div class="text">

<h2>${plan.title}</h2>

<p>${plan.description}</p>

</div>


</div>



<div class="tag">


<i class="${plan.icon}"></i>



<button class="editPlannerBtn">
<i class="ri-pencil-fill"></i>
</button>



<button class="deletePlannerBtn">
<i class="ri-delete-bin-fill"></i>
</button>



</div>

`;

    card.querySelector(".deletePlannerBtn").onclick = () => {
      const index = day.tasks.findIndex((p) => p.id === plan.id);

      if (index !== -1) {
        day.tasks.splice(index, 1);

        saveState();

        renderPlanner();
      }
    };

    card.querySelector(".editPlannerBtn").onclick = () => {
      editingPlanId = plan.id;

      editPlannerTime.value = plan.time;

      editPlannerTitle.value = plan.title;

      editPlannerDescription.value = plan.description;

      editPlannerIcon.value = plan.icon;

      openModal(editPlannerModal);
    };

    scheduleContainer.appendChild(card);
  });
}

function autoResize() {
  notes.style.height = "auto";

  notes.style.height = notes.scrollHeight + "px";
}
