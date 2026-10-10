export const emptyFilters = {
  search: "",
  category: "All",
  status: "All",
  difficulty: "All",
};

export function filterQuestions(questions, filters) {
  const search = filters.search.trim().toLowerCase();

  return questions.filter((q) => {
    if (search && !q.title.toLowerCase().includes(search)) return false;
    if (filters.category !== "All" && q.category !== filters.category) return false;
    if (filters.status !== "All" && q.status !== filters.status) return false;
    if (filters.difficulty !== "All" && q.difficulty !== filters.difficulty) return false;
    return true;
  });
}

export function getStats(questions) {
  const total = questions.length;
  const completed = questions.filter((q) => q.status === "Completed").length;
  const inProgress = questions.filter((q) => q.status === "In Progress").length;
  const pending = questions.filter((q) => q.status === "Pending").length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { total, completed, inProgress, pending, percent };
}
