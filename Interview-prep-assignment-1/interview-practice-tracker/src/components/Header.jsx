import { Moon, Plus, Sun } from "lucide-react";
import { useTrackerStore } from "../store/useTrackerStore";

function Header({ onAddClick }) {
  const theme = useTrackerStore((state) => state.theme);
  const toggleTheme = useTrackerStore((state) => state.toggleTheme);
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <h1>Interview Practice Tracker</h1>
          <p className="muted header-subtitle">Keep track of the questions you are preparing.</p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn icon-btn-bordered"
            onClick={toggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
          >
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <button type="button" className="btn btn-primary" onClick={onAddClick}>
            <Plus size={18} aria-hidden="true" />
            Add question
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
