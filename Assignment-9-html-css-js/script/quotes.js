import { state, saveState } from "./storage.js";

const quoteCards = document.getElementById("quoteCards");

export const initQuotes = () => {
  renderQuotes();

  document.querySelector("#quotes").style.display = "grid";
};

function renderQuotes() {
  quoteCards.innerHTML = "";

  if (state.quotes.length === 0) {
    quoteCards.innerHTML = `
      <div class="emptyState">
        <p>No quotes available. Add your first quote!</p>
      </div>
    `;
    return;
  }

  state.quotes.forEach((quote) => {
    const card = document.createElement("div");
    card.className = "quoteCard";

    card.innerHTML = `
      <div class="quoteInner">
        <h2>
          "${quote.text}"
          <span>${quote.author}</span>
        </h2>

        <div class="quoteButtons">
          <div class="quoteFunctions">
            <button class="quoteEditBtn">
              <i class="ri-pencil-fill"></i>
              <span class="quoteBtnText">Edit</span>
            </button>

            <button class="quoteDeleteBtn">
              <i class="ri-delete-bin-fill"></i>
              <span class="quoteBtnText">Delete</span>
            </button>
          </div>
        </div>
      </div>
    `;

    card.querySelector(".quoteDeleteBtn").addEventListener("click", () => {
      const index = state.quotes.findIndex((q) => q.id === quote.id);

      if (index !== -1) {
        state.quotes.splice(index, 1);
        saveState();
        renderQuotes();
      }
    });

    card.querySelector(".quoteEditBtn").addEventListener("click", () => {
      console.log("Edit quote:", quote);
    });

    quoteCards.appendChild(card);
  });
}
