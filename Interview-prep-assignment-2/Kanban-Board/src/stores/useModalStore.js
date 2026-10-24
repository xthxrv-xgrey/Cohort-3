import { create } from "zustand";

const useModalStore = create((set) => ({
  // Modal state
  modalType: null, // "create" | "edit" | null
  selectedTaskId: null,

  // Open Create Task modal
  openCreateModal: () =>
    set({
      modalType: "create",
      selectedTaskId: null,
    }),

  // Open Edit Task modal
  openEditModal: (taskId) =>
    set({
      modalType: "edit",
      selectedTaskId: taskId,
    }),

  // Close whichever modal is open
  closeModal: () =>
    set({
      modalType: null,
      selectedTaskId: null,
    }),
}));

export default useModalStore;
