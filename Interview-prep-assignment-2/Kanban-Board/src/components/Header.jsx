import useModalStore from "../stores/useModalStore";

const Header = ({ searchQuery, setSearchQuery }) => {
  const openCreateModal = useModalStore((state) => state.openCreateModal);

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 md:px-10">
      <h1 className="shrink-0 text-lg font-semibold tracking-tight">
        Kanban<span className="text-slate-400">.</span>
      </h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="m16 16 4 4" />
        </svg>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
        />
      </div>

      {/* Add Task Button */}
      <button
        onClick={openCreateModal}
        className="shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        + Add task
      </button>
    </header>
  );
};

export default Header;
