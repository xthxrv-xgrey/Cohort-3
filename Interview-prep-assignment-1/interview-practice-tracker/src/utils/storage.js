import { CATEGORIES, DIFFICULTIES, STATUSES } from "../constants";

export const STORAGE_KEY = "interview-practice-tracker:store";

// Version 1 of this app (before Zustand) saved a plain array under this key.
// We read it once so nobody loses their questions after upgrading.
const LEGACY_KEY = "interview-practice-tracker:questions";

// A stored item is only kept if it has the shape we expect.
export function isValidQuestion(item) {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    item.title.trim() !== "" &&
    CATEGORIES.includes(item.category) &&
    DIFFICULTIES.includes(item.difficulty) &&
    STATUSES.includes(item.status)
  );
}

export function cleanQuestion(item) {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    difficulty: item.difficulty,
    status: item.status,
    notes: typeof item.notes === "string" ? item.notes : "",
  };
}

// Storage adapter for Zustand's persist middleware.
// It never throws: if LocalStorage is blocked or the JSON is broken,
// the store just starts with its default state.
export const safeStorage = {
  getItem(name) {
    try {
      const raw = localStorage.getItem(name);
      if (raw !== null) return JSON.parse(raw);

      const legacyRaw = localStorage.getItem(LEGACY_KEY);
      if (legacyRaw !== null) {
        return { state: { questions: JSON.parse(legacyRaw) }, version: 1 };
      }
      return null;
    } catch {
      return null;
    }
  },
  setItem(name, value) {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch {
      // Storage full or blocked. The app keeps working, but changes
      // will not survive a refresh.
    }
  },
  removeItem(name) {
    try {
      localStorage.removeItem(name);
    } catch {
      // ignore
    }
  },
};
