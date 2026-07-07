import { state } from "../storage.js";

const defaultQuotes = [
  "If you are willing to do more than you are paid to do, eventually you will be paid to do more than you do.",
];

export const initQuote = () => {
  const quoteContainer = document.getElementById("homeQuote");

  if (!quoteContainer) return;

  const quoteText = quoteContainer.querySelector("#homeQuoteDisplay");
  const quoteAutor = quoteContainer.querySelector("#homeQuoteAuthor");

  const quotes =
    Array.isArray(state.quotes) && state.quotes.length
      ? state.quotes
      : defaultQuotes;

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  quoteText.textContent = `“${randomQuote.text}”`;

  if (randomQuote.author !== "Unknown") {
    quoteAutor.style.display = "block";
    quoteAutor.textContent = `~ ${randomQuote.author}`;
  } else {
    quoteAutor.style.display = "none";
  }
};
