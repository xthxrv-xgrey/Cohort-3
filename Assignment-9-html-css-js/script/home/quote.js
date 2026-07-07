import { state } from "../storage.js";

const defaultQuotes = [
  "If you are willing to do more than you are paid to do, eventually you will be paid to do more than you do.",
];

export const initQuote = () => {
  const quoteContainer = document.getElementById("homeQuote");

  if (!quoteContainer) return;

  const title = quoteContainer.querySelector("h2");
  const quoteText = quoteContainer.querySelector("p");

  title.textContent = "Quote of the Day.";

  const quotes =
    Array.isArray(state.quotes) && state.quotes.length
      ? state.quotes
      : defaultQuotes;

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].text;

  quoteText.textContent = `“${randomQuote}”`;
};
