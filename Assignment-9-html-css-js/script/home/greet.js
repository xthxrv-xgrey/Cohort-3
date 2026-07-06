import { state } from "../storage.js";

export const initGreeting = () => {
  const greetingElement = document.getElementById("homeGreetings");

  if (!greetingElement) return;

  const hour = new Date().getHours();

  let emoji = "🌙";
  let greeting = "Good Evening";

  if (hour >= 5 && hour < 12) {
    emoji = "🌞";
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    emoji = "☀️";
    greeting = "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    emoji = "🌇";
    greeting = "Good Evening";
  } else {
    emoji = "🌙";
    greeting = "Good Night";
  }

  const username = state.username?.trim() || "User";

  greetingElement.textContent = `${emoji} ${greeting} ${username}!`;
}
