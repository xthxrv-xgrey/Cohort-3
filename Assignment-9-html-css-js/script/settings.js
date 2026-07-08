import { state, saveState } from "./storage.js";

export const initSettings = () => {
  changeUsernameInput.value = state.username;
  document.querySelector("#settings").style.display = "flex";
};

document.querySelector("#changeUsername").addEventListener("submit", (e) => {
  e.preventDefault();
  if (changeUsernameInput.value.trim() !== "") {
    state.username = changeUsernameInput.value.trim();
    saveState();
    alert("Username changed successfully!");
  } else {
    alert("Please enter a valid username.");
  }
});
