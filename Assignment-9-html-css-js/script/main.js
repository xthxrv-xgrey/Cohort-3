import { initHome } from "./home.js";
import { initTasks } from "./tasks.js";
import { initGoals } from "./goals.js";
import { initDailyPlanner } from "./dailyPlanner.js";
import { initQuotes } from "./quotes.js";

// Nav Buttons

const homeBtn = document.querySelector("#homeBtn");
const tasksBtn = document.querySelector("#tasksBtn");
const goalsBtn = document.querySelector("#goalsBtn");
const dailyPlannerBtn = document.querySelector("#dailyPlannerBtn");
const pomodoroBtn = document.querySelector("#pomodoroBtn");
const quotesBtn = document.querySelector("#quotesBtn");

// Pages

const home = document.querySelector("#home");
const tasks = document.querySelector("#tasks");
const goals = document.querySelector("#goals");
const dailyPlanner = document.querySelector("#dailyPlanner");
const quotes = document.querySelector("#quotes");

const renderPage = (page) => {
  // clean UI buttons
  homeBtn.style.backgroundColor = "var(--secondary)";
  tasksBtn.style.backgroundColor = "var(--secondary)";
  goalsBtn.style.backgroundColor = "var(--secondary)";
  dailyPlannerBtn.style.backgroundColor = "var(--secondary)";
  pomodoroBtn.style.backgroundColor = "var(--secondary)";
  quotesBtn.style.backgroundColor = "var(--secondary)";

  // clean UI pages
  home.style.display = "none";
  tasks.style.display = "none";
  goals.style.display = "none";
  dailyPlanner.style.display = "none";
  quotes.style.display = "none";

  // Main Rendering
  if (page === "home") {
    homeBtn.style.backgroundColor = "var(--primary)";
    initHome();
  }
  if (page === "tasks") {
    tasksBtn.style.backgroundColor = "var(--primary)";
    initTasks();
  }
  if (page === "goals") {
    goalsBtn.style.backgroundColor = "var(--primary)";
    initGoals();
  }
  if (page === "dailyPlanner") {
    dailyPlannerBtn.style.backgroundColor = "var(--primary)";
    initDailyPlanner();
  }
  if (page === "quotes") {
    quotesBtn.style.backgroundColor = "var(--primary)";
    initQuotes();
  }
};

homeBtn.addEventListener("click", () => renderPage("home"));
tasksBtn.addEventListener("click", () => renderPage("tasks"));
goalsBtn.addEventListener("click", () => renderPage("goals"));
dailyPlannerBtn.addEventListener("click", () => renderPage("dailyPlanner"));
quotesBtn.addEventListener("click", () => renderPage("quotes"));

// Default Render
// renderPage("home");
renderPage("dailyPlanner");
