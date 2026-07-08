import { state, saveState } from "./storage.js";

const page = document.querySelector("#pomodoro");

const timerText = document.querySelector("#timer");
const startPauseBtn = document.getElementById("timerStartAndPause");
const resetBtn = document.getElementById("timerReset");
const editBtn = document.getElementById("timerEdit");

let interval = null;
let initialized = false;

export function initPomodoro() {
  page.style.display = "flex";

  // Create default state
  if (!state.pomodoro) {
    state.pomodoro = {
      duration: 25 * 60,
      remaining: 25 * 60,
      isRunning: false,
    };

    saveState();
  }

  renderPomodoro();

  // Attach listeners only once
  if (!initialized) {
    startPauseBtn.onclick = toggleTimer;
    resetBtn.onclick = resetTimer;
    editBtn.onclick = editTimer;

    initialized = true;
  }

  // Resume running timer after page change
  if (state.pomodoro.isRunning && !interval) {
    startTimer();
  }
}

function renderPomodoro() {
  timerText.textContent = formatTime(state.pomodoro.remaining);

  const icon = startPauseBtn.querySelector("i");

  if (state.pomodoro.isRunning) {
    icon.className = "ri-pause-line";
  } else {
    icon.className = "ri-play-large-fill";
  }
}

function toggleTimer() {
  if (state.pomodoro.isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (interval) return;

  state.pomodoro.isRunning = true;
  saveState();
  renderPomodoro();

  interval = setInterval(() => {
    if (state.pomodoro.remaining > 0) {
      state.pomodoro.remaining--;

      renderPomodoro();
    } else {
      clearInterval(interval);
      interval = null;

      state.pomodoro.isRunning = false;

      saveState();
      renderPomodoro();

      alert("Pomodoro Completed!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;

  state.pomodoro.isRunning = false;

  saveState();
  renderPomodoro();
}

function resetTimer() {
  clearInterval(interval);
  interval = null;

  state.pomodoro.remaining = state.pomodoro.duration;
  state.pomodoro.isRunning = false;

  saveState();
  renderPomodoro();
}

function editTimer() {
  const minutes = prompt(
    "Enter focus time (minutes)",
    state.pomodoro.duration / 60,
  );

  if (minutes === null) return;

  const value = Number(minutes);

  if (isNaN(value) || value <= 0) return;

  clearInterval(interval);
  interval = null;

  state.pomodoro.duration = value * 60;
  state.pomodoro.remaining = value * 60;
  state.pomodoro.isRunning = false;

  saveState();
  renderPomodoro();
}

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return `${mins}:${secs}`;
}
