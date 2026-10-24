import { useState } from "react";
import useTaskSearch from "../hooks/useTaskSearch";
import useTaskStore from "../stores/useTaskStore";
import TaskCard from "./TaskCard";

const columns = [
  {
    id: "pending",
    title: "Pending",
    dot: "bg-slate-400",
  },
  {
    id: "in-progress",
    title: "In Progress",
    dot: "bg-blue-500",
  },
  {
    id: "completed",
    title: "Completed",
    dot: "bg-emerald-500",
  },
];

const priorityFilters = ["all", "high", "medium", "low"];

const KanbanBoard = ({ searchQuery }) => {
  const tasks = useTaskStore((state) => state.tasks);

  // Keep a separate priority filter for each column.
  const [priorityByColumn, setPriorityByColumn] = useState({
    pending: "all",
    "in-progress": "all",
    completed: "all",
  });

  const taskList = Object.values(tasks);

  // Apply the existing search logic first.
  const filteredTasks = useTaskSearch(taskList, searchQuery);

  const handlePriorityFilter = (columnId, priority) => {
    setPriorityByColumn((previous) => ({
      ...previous,
      [columnId]: priority,
    }));
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      {/* Board Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Workspace / Projects
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Tasks
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Organize your work and keep things moving.
          </p>
        </div>

        {/* Total Tasks */}
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Total tasks</p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {taskList.length}
          </p>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        {columns.map((column) => {
          // Tasks matching the search and current column.
          const statusTasks = filteredTasks.filter(
            (task) => task.status === column.id,
          );

          // Apply this column's priority filter.
          const selectedPriority = priorityByColumn[column.id];

          const columnTasks =
            selectedPriority === "all"
              ? statusTasks
              : statusTasks.filter(
                  (task) => task.priority === selectedPriority,
                );

          return (
            <div
              key={column.id}
              className="min-w-0 rounded-2xl border border-slate-200/80 bg-slate-100/70 p-3 sm:p-4"
            >
              {/* Column Header */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-2.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${column.dot}`} />

                  <h2 className="text-sm font-semibold text-slate-800">
                    {column.title}
                  </h2>

                  <span className="rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                    {columnTasks.length}
                  </span>
                </div>

                {/* Priority Filter Buttons */}
                <div
                  className="flex flex-wrap items-center gap-1"
                  role="group"
                  aria-label={`Filter ${column.title} tasks by priority`}
                >
                  {priorityFilters.map((priority) => {
                    const isActive = selectedPriority === priority;

                    return (
                      <button
                        key={priority}
                        type="button"
                        onClick={() =>
                          handlePriorityFilter(column.id, priority)
                        }
                        aria-pressed={isActive}
                        className={`rounded-md px-2 py-1 text-[10px] font-semibold capitalize transition ${
                          isActive
                            ? "bg-slate-800 text-white shadow-sm"
                            : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                      >
                        {priority === "all" ? "All" : priority}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Task Cards */}
              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}

                {/* Empty State */}
                {columnTasks.length === 0 && (
                  <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 py-6 text-center">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 5v14m-7-7h14"
                        />
                      </svg>
                    </div>

                    <p className="text-xs font-medium text-slate-500">
                      {searchQuery.trim()
                        ? "No matching tasks"
                        : selectedPriority !== "all"
                          ? `No ${selectedPriority}-priority tasks`
                          : "No tasks yet"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {searchQuery.trim()
                        ? "Try another search term or priority."
                        : selectedPriority !== "all"
                          ? "Try another priority filter."
                          : "Tasks will appear here."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default KanbanBoard;
