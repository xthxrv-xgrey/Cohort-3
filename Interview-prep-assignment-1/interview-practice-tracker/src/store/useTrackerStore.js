import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialQuestions } from "../utils/initialQuestions";
import { emptyFilters } from "../utils/filterQuestions";
import { STORAGE_KEY, safeStorage, isValidQuestion, cleanQuestion } from "../utils/storage";

// Simple unique id. (crypto.randomUUID only works on https or localhost.)
function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getSystemTheme() {
  const prefersDark =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export const useTrackerStore = create(
  persist(
    (set) => ({
      // Saved to LocalStorage
      questions: initialQuestions, // seed data, only used if nothing is saved yet
      theme: getSystemTheme(),

      // Not saved (reset on refresh)
      filters: emptyFilters,

      addQuestion: (data) =>
        set((state) => ({
          questions: [{ id: createId(), ...data }, ...state.questions],
        })),

      updateQuestion: (id, data) =>
        set((state) => ({
          questions: state.questions.map((q) => (q.id === id ? { ...q, ...data } : q)),
        })),

      setStatus: (id, status) =>
        set((state) => ({
          questions: state.questions.map((q) => (q.id === id ? { ...q, status } : q)),
        })),

      deleteQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        })),

      setFilter: (name, value) =>
        set((state) => ({ filters: { ...state.filters, [name]: value } })),

      clearFilters: () => set({ filters: emptyFilters }),

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: safeStorage,

      // Only these two fields go to LocalStorage.
      partialize: (state) => ({ questions: state.questions, theme: state.theme }),

      // Runs when saved data is loaded. Anything invalid is dropped, and a
      // missing or broken field falls back to the default value.
      // An empty saved list stays empty, so the seed questions do not come back.
      merge: (saved, current) => {
        const data = saved && typeof saved === "object" ? saved : {};

        const questions = Array.isArray(data.questions)
          ? data.questions.filter(isValidQuestion).map(cleanQuestion)
          : current.questions;

        const theme = data.theme === "dark" || data.theme === "light" ? data.theme : current.theme;

        return { ...current, questions, theme };
      },
    }
  )
);
