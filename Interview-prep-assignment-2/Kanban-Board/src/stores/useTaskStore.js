import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ======================================================
// TASK DATA STRUCTURE
// ======================================================

// Sample task = {
//   id: {
//     id: id,
//     title: "Title",
//     description: "Description",
//     priority: "Priority",
//     dueDate: "02 APRIL",
//     status: "pending"
//   }
// }

// Why this structure ->
// Because it gives us O(1) time complexity to look up a task by ID.
// Note: Immutable updates and deletions still take O(n) time
// because object spreading copies the existing properties.

// ======================================================
// SAMPLE TASK DATA
// ======================================================

// Sample data so users don't feel blank after
// opening the app. These are everyday tasks for
// students, working professionals, and simple users.

const sampleTasks = {
  "task-101": {
    id: "task-101",
    title: "Buy groceries",
    description:
      "Pick up milk, eggs, bread, fresh vegetables, fruits, and other weekly essentials.",
    priority: "high",
    dueDate: "2026-10-25",
    status: "pending",
  },

  "task-102": {
    id: "task-102",
    title: "Clean the house",
    description:
      "Vacuum the floors, dust the furniture, clean the kitchen, and organize the living room.",
    priority: "medium",
    dueDate: "2026-10-26",
    status: "pending",
  },

  "task-103": {
    id: "task-103",
    title: "Pay electricity bill",
    description:
      "Check the latest electricity bill and complete the payment before the due date.",
    priority: "high",
    dueDate: "2026-10-27",
    status: "pending",
  },

  "task-104": {
    id: "task-104",
    title: "Go for a morning walk",
    description:
      "Spend 30 minutes walking outdoors and get some fresh air before starting the day.",
    priority: "medium",
    dueDate: "2026-10-25",
    status: "in-progress",
  },

  "task-105": {
    id: "task-105",
    title: "Prepare meals for the week",
    description:
      "Plan a few simple meals, prepare ingredients, and make a grocery list for the coming week.",
    priority: "medium",
    dueDate: "2026-10-26",
    status: "in-progress",
  },

  "task-106": {
    id: "task-106",
    title: "Organize the wardrobe",
    description:
      "Fold clean clothes, arrange everyday outfits, and set aside clothes that are no longer needed.",
    priority: "low",
    dueDate: "2026-10-28",
    status: "in-progress",
  },

  "task-107": {
    id: "task-107",
    title: "Water the plants",
    description:
      "Water the indoor and balcony plants and check whether any need extra care.",
    priority: "low",
    dueDate: "2026-10-24",
    status: "completed",
  },

  "task-108": {
    id: "task-108",
    title: "Book a doctor's appointment",
    description:
      "Check available appointment times and schedule a routine checkup if needed.",
    priority: "high",
    dueDate: "2026-10-24",
    status: "completed",
  },
};

// ======================================================
// TASK STORE
// ======================================================

const useTaskStore = create(
  persist(
    (set) => ({
      // Sample data so users don't feel blank after
      // opening the app. We will change the data.
      tasks: sampleTasks,

      // ================================================
      // ADD TASK
      // ================================================

      addTask: (task) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [task.id]: task,
          },
        })),

      // ================================================
      // UPDATE TASK
      // ================================================

      updateTask: (id, updates) =>
        set((state) => {
          const existingTask = state.tasks[id];

          if (!existingTask) return state;

          return {
            tasks: {
              ...state.tasks,
              [id]: {
                ...existingTask,
                ...updates,
                id, // Keep the original ID immutable
              },
            },
          };
        }),

      // ================================================
      // DELETE TASK
      // ================================================

      deleteTask: (id) =>
        set((state) => {
          const { [id]: removed, ...remainingTasks } = state.tasks;

          if (!removed) return state;

          return {
            tasks: remainingTasks,
          };
        }),

      // ================================================
      // MOVE TASK BETWEEN KANBAN COLUMNS
      // ================================================

      moveTask: (id, status) =>
        set((state) => {
          const task = state.tasks[id];

          if (!task) return state;

          return {
            tasks: {
              ...state.tasks,
              [id]: {
                ...task,
                status,
              },
            },
          };
        }),
    }),

    // ================================================
    // PERSISTENCE CONFIGURATION
    // ================================================

    {
      name: "kanban-tasks-storage",
      storage: createJSONStorage(() => localStorage),

      // Persist only task data, not action functions.
      partialize: (state) => ({
        tasks: state.tasks,
      }),
    },
  ),
);

export default useTaskStore;
