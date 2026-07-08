import { state, saveState } from "./storage.js";

const quoteCards = document.getElementById("quoteCards");

// =====================
// Add Quote Modal
// =====================
const addQuoteModal = document.getElementById("addQuoteModal");
const addQuoteForm = document.getElementById("addQuoteForm");
const openAddQuoteModalBtn = document.getElementById("openAddQuoteModal");
const closeQuoteModalBtn = document.getElementById("closeQuoteModal");

// =====================
// Edit Quote Modal
// =====================
const editQuoteModal = document.getElementById("editQuoteModal");
const editQuoteForm = document.getElementById("editQuoteForm");
const closeEditQuoteModalBtn = document.getElementById("closeEditQuoteModal");

let editingQuoteId = null;

// =====================
// Initialize
// =====================
export const initQuotes = () => {
  renderQuotes();

  document.querySelector("#quotes").style.display = "flex";

  initQuoteEvents();
};

// =====================
// Events
// =====================
function initQuoteEvents() {
  // Open Add
  if (openAddQuoteModalBtn) {
    openAddQuoteModalBtn.addEventListener("click", () => {
      addQuoteModal.style.display = "flex";
    });
  }

  // Close Add
  if (closeQuoteModalBtn) {
    closeQuoteModalBtn.addEventListener("click", () => {
      addQuoteModal.style.display = "none";
      addQuoteForm.reset();
    });
  }

  // Close Edit
  if (closeEditQuoteModalBtn) {
    closeEditQuoteModalBtn.addEventListener("click", () => {
      editQuoteModal.style.display = "none";
    });
  }

  // Outside click
  window.addEventListener("click", (e) => {
    if (e.target === addQuoteModal) addQuoteModal.style.display = "none";

    if (e.target === editQuoteModal) editQuoteModal.style.display = "none";
  });

  // Add Quote
  addQuoteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = document.getElementById("quoteText").value.trim();

    const author = document.getElementById("quoteAuthor").value.trim();

    state.quotes.push({
      id: Date.now(),
      text,
      author,
    });

    saveState();

    addQuoteForm.reset();

    addQuoteModal.style.display = "none";

    renderQuotes();
  });

  // Edit Quote
  editQuoteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const quote = state.quotes.find((q) => q.id === editingQuoteId);

    if (!quote) return;

    quote.text = document.getElementById("editQuoteText").value.trim();

    quote.author = document.getElementById("editQuoteAuthor").value.trim();

    saveState();

    editQuoteModal.style.display = "none";

    renderQuotes();
  });
}

// =====================
// Render
// =====================
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

    // Delete
    card.querySelector(".quoteDeleteBtn").addEventListener("click", () => {
      const index = state.quotes.findIndex((q) => q.id === quote.id);

      if (index !== -1) {
        state.quotes.splice(index, 1);

        saveState();

        renderQuotes();
      }
    });

    // Edit
    card.querySelector(".quoteEditBtn").addEventListener("click", () => {
      editingQuoteId = quote.id;

      document.getElementById("editQuoteText").value = quote.text;

      document.getElementById("editQuoteAuthor").value = quote.author;

      editQuoteModal.style.display = "flex";
    });

    quoteCards.appendChild(card);
  });
}
