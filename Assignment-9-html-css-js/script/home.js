import { initGreeting } from "./home/greet.js";
import { initHomeWidgets } from "./home/widgets.js";
import { initTaskProgress } from "./home/taskProgress.js";
import { initGoals } from "./home/goals.js";
import { initQuote } from "./home/quote.js";

export const initHome = () => {
  initGreeting();
  initHomeWidgets();
  initTaskProgress();
  initGoals();
  initQuote();

  document.querySelector("#home").style.display = "grid";
};
