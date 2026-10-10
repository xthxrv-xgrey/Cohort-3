import { Search } from "lucide-react";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../constants";
import { useTrackerStore } from "../store/useTrackerStore";
import { emptyFilters } from "../utils/filterQuestions";

function Filters({ statusCounts, resultCount, totalCount }) {
  const filters = useTrackerStore((state) => state.filters);
  const setFilter = useTrackerStore((state) => state.setFilter);
  const clearFilters = useTrackerStore((state) => state.clearFilters);

  const hasActiveFilters = Object.keys(emptyFilters).some((key) => filters[key] !== emptyFilters[key]);

  function handleChange(event) {
    setFilter(event.target.name, event.target.value);
  }

  return (
    <div className="filters">
      <div className="filters-row">
        <div className="field filters-search">
          <label htmlFor="search">Search by title</label>
          <div className="search-box">
            <Search size={18} aria-hidden="true" />
            <input
              id="search"
              name="search"
              type="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Search questions"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="filter-category">Category</label>
          <select id="filter-category" name="category" value={filters.category} onChange={handleChange}>
            <option value="All">All categories</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="filter-difficulty">Difficulty</label>
          <select id="filter-difficulty" name="difficulty" value={filters.difficulty} onChange={handleChange}>
            <option value="All">All difficulties</option>
            {DIFFICULTIES.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filters-row filters-status-row">
        <div className="status-filter" role="group" aria-label="Filter by status">
          {["All", ...STATUSES].map((status) => (
            <button
              key={status}
              type="button"
              className="chip"
              aria-pressed={filters.status === status}
              onClick={() => setFilter("status", status)}
            >
              {status}
              <span className="chip-count">{status === "All" ? totalCount : statusCounts[status]}</span>
            </button>
          ))}
        </div>

        <button type="button" className="btn btn-quiet" onClick={clearFilters} disabled={!hasActiveFilters}>
          Clear filters
        </button>
      </div>

      <p className="muted result-count" aria-live="polite">
        Showing {resultCount} of {totalCount}
      </p>
    </div>
  );
}

export default Filters;
