import { useMemo } from "react";

// ======================================================
// TASK SEARCH HOOK
// ======================================================

const useTaskSearch = (tasks, searchQuery) => {
  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // Return all tasks when the search input is empty.
    if (!query) return tasks;

    // Return only tasks matching the search query.
    return tasks.filter((task) => {
      const searchableFields = [
        task.title,
        task.description,
        task.priority,
        task.status,
        task.dueDate,
      ];

      return searchableFields.some((field) =>
        String(field ?? "")
          .toLowerCase()
          .includes(query),
      );
    });
  }, [tasks, searchQuery]);

  return filteredTasks;
};

export default useTaskSearch;
