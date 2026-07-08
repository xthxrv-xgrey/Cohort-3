import { state, saveState } from "./storage.js";

let currentDate = new Date();

const planner = document.querySelector("#dailyPlanner");
const scheduleContainer = document.querySelector("#dailyPlannerSchedule");
const notes = document.querySelector(".dailyPlannerNotes textarea");

const dateText = document.querySelector("#dateSwitchBarDate");
const prevBtn = document.querySelector("#dateSwitchBarLeftBtn");
const nextBtn = document.querySelector("#dateSwitchBarRightBtn");

export function initDailyPlanner() {
  planner.style.display = "block";

  renderDate();
  renderPlanner();

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

  const sortedTasks = [...day.tasks].sort((a, b) =>
    a.time.localeCompare(b.time),
  );

  if (sortedTasks.length === 0) {
    scheduleContainer.innerHTML =
      "<p style='opacity:.6'>No plans for this day.</p>";
    return;
  }

  sortedTasks.forEach((task) => {
    scheduleContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="dailyPlannerScheduleCard">
          <div class="left">
              <span class="dailyPlannerScheduleCardTime">${task.time}</span>

              <div class="text">
                  <h2>${task.title}</h2>
                  <p>${task.description}</p>
              </div>
          </div>

          <div class="tag">
              <i class="${task.icon}"></i>
          </div>
      </div>
      `,
    );
  });
}

function autoResize() {
  notes.style.height = "auto";
  notes.style.height = notes.scrollHeight + "px";
}
