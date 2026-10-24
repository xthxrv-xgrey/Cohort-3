import { useEffect } from "react";
import { useForm } from "react-hook-form";

import useModalStore from "../stores/useModalStore";
import useTaskStore from "../stores/useTaskStore";

import { toast } from "sonner";

const EditTaskModal = () => {
  const modalType = useModalStore((state) => state.modalType);
  const selectedTaskId = useModalStore((state) => state.selectedTaskId);
  const closeModal = useModalStore((state) => state.closeModal);

  const task = useTaskStore((state) => state.tasks[selectedTaskId]);
  const updateTask = useTaskStore((state) => state.updateTask);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      status: "pending",
    },
  });

  // Load the selected task into the form.
  useEffect(() => {
    if (modalType === "edit" && task) {
      reset({
        title: task.title ?? "",
        description: task.description ?? "",
        priority: task.priority ?? "medium",
        dueDate: task.dueDate ?? "",
        status: task.status ?? "pending",
      });
    }
  }, [modalType, task, reset]);

  if (modalType !== "edit" || !task) return null;

  const onSubmit = (data) => {
    updateTask(selectedTaskId, data);

    toast.success("Task updated successfully!", {
      description: data.title,
    });

    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  const inputStyles =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100";

  const labelStyles = "mb-1.5 block text-sm font-medium text-slate-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        {/* Modal Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2
              id="edit-task-title"
              className="text-xl font-bold tracking-tight text-slate-900"
            >
              Edit task
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the details of your task.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-xl leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            &times;
          </button>
        </div>

        {/* Edit Task Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="edit-title" className={labelStyles}>
              Task title <span className="text-red-500">*</span>
            </label>

            <input
              id="edit-title"
              type="text"
              className={inputStyles}
              placeholder="e.g. Build the dashboard"
              {...register("title", {
                required: "Task title is required.",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters.",
                },
                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters.",
                },
              })}
            />

            {errors.title && (
              <p className="mt-1.5 text-xs text-red-600" role="alert">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="edit-description" className={labelStyles}>
              Description
            </label>

            <textarea
              id="edit-description"
              rows={3}
              placeholder="What needs to be done?"
              className={`${inputStyles} resize-y`}
              {...register("description", {
                maxLength: {
                  value: 1000,
                  message: "Description cannot exceed 1000 characters.",
                },
              })}
            />

            {errors.description && (
              <p className="mt-1.5 text-xs text-red-600" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Priority and Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-priority" className={labelStyles}>
                Priority
              </label>

              <select
                id="edit-priority"
                className={inputStyles}
                {...register("priority")}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label htmlFor="edit-status" className={labelStyles}>
                Status
              </label>

              <select
                id="edit-status"
                className={inputStyles}
                {...register("status")}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="edit-dueDate" className={labelStyles}>
              Due date
            </label>

            <input
              id="edit-dueDate"
              type="date"
              className={inputStyles}
              {...register("dueDate")}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
