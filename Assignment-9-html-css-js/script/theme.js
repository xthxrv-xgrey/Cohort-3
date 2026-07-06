// theme.js

const themeBtn = document.getElementById("theme");
const root = document.documentElement;

// optional: remember user choice
const savedTheme = localStorage.getItem("theme");

// apply saved theme on load
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

// toggle theme on click
themeBtn.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", newTheme);

  localStorage.setItem("theme", newTheme);
});
