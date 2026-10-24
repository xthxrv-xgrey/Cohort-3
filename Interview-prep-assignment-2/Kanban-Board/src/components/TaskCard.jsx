import useTaskStore from "../stores/useTaskStore";
import useModalStore from "../stores/useModalStore";
import { toast } from "sonner";

// ======================================================
// PRIORITY STYLES
// ======================================================

const priorityStyles = {
  high: "bg-red-50 text-red-600 ring-red-100",
  medium: "bg-amber-50 text-amber-600 ring-amber-100",
  low: "bg-emerald-50 text-emerald-600 ring-emerald-100",
};

// ======================================================
// TASK STATUSES
// ======================================================

const statuses = [
  {
    id: "pending",
    label: "Pending",
    styles: "border-slate-200 text-slate-600 hover:bg-slate-100",
  },
  {
    id: "in-progress",
    label: "In Progress",
    styles: "border-blue-200 text-blue-600 hover:bg-blue-50",
  },
  {
    id: "completed",
    label: "Completed",
    styles: "border-emerald-200 text-emerald-600 hover:bg-emerald-50",
  },
];

const statusLabels = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
};

// ======================================================
// TASK CARD
// ======================================================

const TaskCard = ({ task }) => {
  // Zustand actions
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const moveTask = useTaskStore((state) => state.moveTask);
  const openEditModal = useModalStore((state) => state.openEditModal);

  // Only show the two statuses other than the current one.
  const availableStatuses = statuses.filter(
    (status) => status.id !== task.status,
  );

  // ================================================
  // DELETE TASK
  // ================================================

  const handleDelete = () => {
    deleteTask(task.id);

    toast.success("Task deleted successfully!", {
      description: task.title,
    });
  };

  // ================================================
  // MOVE TASK BETWEEN KANBAN COLUMNS
  // ================================================

  const handleMove = (status) => {
    if (status === task.status) return;

    moveTask(task.id, status);

    toast.success(`Task moved to ${statusLabels[status]}`, {
      description: task.title,
    });
  };

  // ================================================
  // RENDER TASK CARD
  // ================================================

  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      {/* Priority and Actions */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <span
          className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ${
            priorityStyles[task.priority] ??
            "bg-slate-50 text-slate-600 ring-slate-200"
          }`}
        >
          {task.priority || "No priority"}
        </span>

        <div className="flex items-center gap-1">
          {/* Edit Task */}
          <button
            type="button"
            onClick={() => openEditModal(task.id)}
            aria-label={`Edit ${task.title}`}
            title="Edit task"
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16 4 4 4M4 20l4-.8L19 8a2.12 2.12 0 0 0-3-3L5 16l-1 4Z"
              />
            </svg>
          </button>

          {/* Delete Task */}
          <button
            type="button"
            onClick={handleDelete}
            aria-label={`Delete ${task.title}`}
            title="Delete task"
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Task Details */}
      <h3 className="text-sm font-semibold leading-5 text-slate-900">
        {task.title}
      </h3>

      <p className="mt-2 whitespace-pre-wrap wrap-break-word text-xs leading-5 text-slate-500 wrap-anywhere">
        {task.description || "No description provided."}
      </p>

      {/* Card Footer */}
      <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
        {/* Due Date */}
        <div className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-4 w-4"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
          </svg>

          <span>{task.dueDate || "No due date"}</span>
        </div>

        {/* Move To */}
        <div className="flex min-w-0 flex-col items-end">
          <div className="flex flex-wrap justify-end gap-1.5">
            {availableStatuses.map((status) => (
              <button
                key={status.id}
                type="button"
                onClick={() => handleMove(status.id)}
                className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition ${status.styles}`}
                aria-label={`Move ${task.title} to ${status.label}`}
                title={`Move to ${status.label}`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
